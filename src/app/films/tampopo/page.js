"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import HomeDefault from "@/icons/icon-home-default.svg";
import HomeActive from "@/icons/icon-home-active.svg";

import CutsDefault from "@/icons/icon-cuts-default.svg";
import CutsActive from "@/icons/icon-cuts-active.svg";

import SetDefault from "@/icons/icon-setmenu-default.svg";
import SetActive from "@/icons/icon-setmenu-active.svg";

import SettingsDefault from "@/icons/icon-settings-default.svg";
import SettingsActive from "@/icons/icon-settings-active.svg";

const EASE = [0.16, 1, 0.3, 1];

/* -----------------------------
   Bottom Nav (same as Home)
------------------------------ */
function BottomNav({ bottomNavStyle }) {
  const pathname = usePathname();
  const [hoveredKey, setHoveredKey] = useState(null);
  const [pressedKey, setPressedKey] = useState(null);

  const NAV_ITEMS = useMemo(
    () => [
      { key: "home", href: "/", ActiveIcon: HomeActive, DefaultIcon: HomeDefault },
      { key: "cuts", href: "/cuts", ActiveIcon: CutsActive, DefaultIcon: CutsDefault },
      { key: "setmenu", href: "/setmenu", ActiveIcon: SetActive, DefaultIcon: SetDefault },
      { key: "settings", href: "/settings", ActiveIcon: SettingsActive, DefaultIcon: SettingsDefault },
    ],
    []
  );

  const navItemStyle = {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
  };

  return (
    <nav style={bottomNavStyle} aria-label="Bottom Navigation">
      <div
        style={{
          height: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#999999",
          fontSize: 12,
          letterSpacing: "0.01em",
        }}
      >
        Film
      </div>

      <div style={{ display: "flex", justifyContent: "space-around", padding: "0 12px" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const isInteractiveHighlight = hoveredKey === item.key || pressedKey === item.key;
          const color = isActive ? "#FFFFFF" : isInteractiveHighlight ? "#999999" : "#444444";
          const Icon = isActive ? item.ActiveIcon : item.DefaultIcon;

          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              style={{ ...navItemStyle, color }}
              onMouseEnter={() => setHoveredKey(item.key)}
              onMouseLeave={() => setHoveredKey(null)}
              onPointerDown={() => setPressedKey(item.key)}
              onPointerUp={() => setPressedKey(null)}
              onPointerCancel={() => setPressedKey(null)}
            >
              <Icon width={24} height={24} aria-hidden="true" focusable="false" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default function FilmPage() {
  const params = useParams();
  const filmId = params?.id || "tampopo";

  const [title, setTitle] = useState("Film title");

  // Keep the same header backdrop as Home for now.
  const headerBackdropSrc = "/films/spirited-away/backdrop.webp";

  useEffect(() => {
    let cancelled = false;

    fetch(`/films/${filmId}/film.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        setTitle(data?.title || "Film title");
      })
      .catch(() => {
        if (!cancelled) setTitle("Film title");
      });

    return () => {
      cancelled = true;
    };
  }, [filmId]);

  const NAV_BUTTON_H = 48;
  const NAV_H = NAV_BUTTON_H + 18;

  const SAFE_TOP = "env(safe-area-inset-top)";
  const SAFE_BREATH = 28;
  const LOGO_H = 48;

  const bottomNavStyle = {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: NAV_H,
    background: "#0D0D0D",
    borderTop: "1px solid #444444",
    zIndex: 50,
    paddingBottom: "env(safe-area-inset-bottom)",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: 420,
          height: 874,
          background: "#0D0D0D",
          borderRadius: 28,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Layer A — Backdrop */}
        <div
          style={{
            position: "absolute",
            inset: "0 0 auto 0",
            width: "100%",
            height: 386,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <Image
            src={headerBackdropSrc}
            alt=""
            fill
            priority
            sizes="420px"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, #0D0D0D 0%, rgba(13,13,13,0) 70%)",
            }}
          />
        </div>

        {/* Layer B — Foreground */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            paddingLeft: 12,
            paddingRight: 12,
            boxSizing: "border-box",
          }}
        >
          {/* Logo stays in the same place */}
          <div
            style={{
              paddingTop: `calc(${SAFE_TOP} + ${SAFE_BREATH}px)`,
              height: LOGO_H,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/logo.svg"
              alt="Seconds"
              width={120}
              height={28}
              priority
              style={{ height: 28, width: "auto" }}
            />
          </div>

          {/* Placeholder film title */}
          <motion.div
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.32, ease: EASE }}
            style={{
              paddingTop: 24,
              textAlign: "center",
              color: "#FFFFFF",
              fontSize: 20,
              lineHeight: "24px",
              letterSpacing: "0.01em",
            }}
          >
            {title}
          </motion.div>

          {/* Reserved space for your timeline + expanding recipe cards */}
          <div style={{ flex: 1, minHeight: 0 }} />
        </div>

        {/* Layer C — Bottom nav */}
        <BottomNav bottomNavStyle={bottomNavStyle} />
      </div>
    </div>
  );
}
