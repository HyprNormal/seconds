// page v2.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import HomeDefault from "@/icons/icon-home-default.svg";
import HomeActive from "@/icons/icon-home-active.svg";

import CutsDefault from "@/icons/icon-cuts-default.svg";
import CutsActive from "@/icons/icon-cuts-active.svg";

import SetDefault from "@/icons/icon-setmenu-default.svg";
import SetActive from "@/icons/icon-setmenu-active.svg";

import SettingsDefault from "@/icons/icon-settings-default.svg";
import SettingsActive from "@/icons/icon-settings-active.svg";

/* -----------------------------
   Responsive helper
------------------------------ */
function useIsMobile(breakpoint = 480) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= breakpoint);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoint]);

  return isMobile;
}

function Poster({ src }) {
  return (
    <div
      style={{
        width: "100%",
        height: 180,
        borderRadius: 6,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transformOrigin: "center",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.05 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 6,
          border: "1px solid #444444",
          boxSizing: "border-box",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* -----------------------------
   Bottom Nav (SVGR ICONS)
------------------------------ */
function BottomNav({ bottomNavStyle }) {
  const pathname = usePathname();
  const [hoveredKey, setHoveredKey] = useState(null);
  const [pressedKey, setPressedKey] = useState(null);

  const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
  const DURATION = 180;

  const activeKey =
    pathname === "/"
      ? "home"
      : pathname.startsWith("/my-cuts")
      ? "cuts"
      : pathname.startsWith("/set-menu")
      ? "set"
      : pathname.startsWith("/settings")
      ? "settings"
      : null;

  const NAV_ITEMS = [
    { key: "home", label: "Home", href: "/", DefaultIcon: HomeDefault, ActiveIcon: HomeActive, width: 18, height: 16 },
    { key: "cuts", label: "My Cuts", href: "/my-cuts", DefaultIcon: CutsDefault, ActiveIcon: CutsActive, width: 16, height: 16 },
    { key: "set", label: "Set Menu", href: "/set-menu", DefaultIcon: SetDefault, ActiveIcon: SetActive, width: 16, height: 16 },
    { key: "settings", label: "Settings", href: "/settings", DefaultIcon: SettingsDefault, ActiveIcon: SettingsActive, width: 16, height: 16 },
  ];

  const navInnerStyle = {
    height: "100%",
    width: "100%",
    display: "flex",
    boxSizing: "border-box",
  };

  const navItemStyle = {
    flex: 1,
    height: 48, // button container height
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    textDecoration: "none",
    WebkitTapHighlightColor: "transparent",
    transition: `color ${DURATION}ms ${EASE}`,
  };

  const iconWrapStyle = {
    width: 18,
    height: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const navLabelStyle = {
    fontWeight: 700,
    fontSize: 10,
    fontFamily: "var(--font-manrope)",
    lineHeight: "10px",
    letterSpacing: "0.01em",
    userSelect: "none",
  };

  return (
    <nav style={bottomNavStyle}>
      <div style={navInnerStyle}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === activeKey;
          const isHovering = item.key === hoveredKey;
          const isPressed = item.key === pressedKey;
          const isInteractiveHighlight = !isActive && (isHovering || isPressed);

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
              <div style={iconWrapStyle}>
                <Icon width={item.width} height={item.height} aria-hidden="true" focusable="false" style={{ display: "block" }} />
              </div>
              <div style={navLabelStyle}>{item.label}</div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/* -----------------------------
   Page
------------------------------ */
export default function Home() {
  const isMobile = useIsMobile(480);
  const headerBackdropSrc = "/films/spirited-away/backdrop.webp";

  // ✅ keep nav sizing: 48 button + (6 top + 12 bottom) = 66
  const NAV_BUTTON_H = 48;
  const NAV_H = NAV_BUTTON_H + 18; // 66

  // Header geometry (safe-area aware)
  const SAFE_TOP = "env(safe-area-inset-top)";
  const SAFE_BREATH = 28; // replaces your old “62px” guess
  const LOGO_H = 48;
  const SEARCH_TOP = 24;
  const SEARCH_H = 48;

  const HEADER_TOTAL = `calc(${SAFE_TOP} + ${SAFE_BREATH + LOGO_H + SEARCH_TOP + SEARCH_H}px)`;

  // Plate extension + fade (your request)
  const PLATE_EXTEND = 24; // extend plate 24px below search
  const PLATE_FADE = 12; // last 12px fades to transparent
  const HEADER_PLATE_H = `calc(${HEADER_TOTAL} + ${PLATE_EXTEND}px)`;

  // Canonical hero render height (so crop stays seamless between layers)
  const HERO_H = `calc(420px + ${SAFE_TOP})`;

  // HERO treatment (opaque image + overlays)
  const HERO_POS = "center top";
  const HERO_OPACITY = 1; // fully opaque so grid can’t bleed through
  const HERO_DARKEN = "rgba(13, 13, 13, 0.20)";
  const HERO_TINT = "rgba(10, 40, 110, 0.18)";
  const HERO_GRADIENT_OPACITY = 0.9;

  const films = [
    { id: "tampopo", poster: "/films/tampopo/cover.webp", stamps: 5 },
    { id: "delicetessen", poster: "/films/delicetessen/cover.webp", stamps: 3 },
    { id: "boiling-point", poster: "/films/boiling-point/cover.webp", stamps: 4 },
    { id: "chunking-express", poster: "/films/chunking-express/cover.webp", stamps: 5 },
    { id: "ponyo", poster: "/films/ponyo/cover.webp", stamps: 2 },
    { id: "ratatouille", poster: "/films/ratatouille/cover.webp", stamps: 3 },
    { id: "delicious", poster: "/films/delicious/cover.webp", stamps: 4 },
    { id: "the-menu", poster: "/films/the-menu/cover.webp", stamps: 2 },
    { id: "babettes-feast", poster: "/films/babettes-feast/cover.webp", stamps: 4 },
    { id: "chef", poster: "/films/chef/cover.webp", stamps: 3 },
    { id: "burnt", poster: "/films/burnt/cover.webp", stamps: 2 },
    { id: "big-night", poster: "/films/big-night/cover.webp", stamps: 4 },
    { id: "chef", poster: "/films/the-taste-of-things/cover.webp", stamps: 5 },
    { id: "burnt", poster: "/films/sideways/cover.webp", stamps: 2 },
    { id: "big-night", poster: "/films/the-cook-the-thief/cover.webp", stamps: 3 },
    { id: "big-night", poster: "/films/spirited-away/cover.webp", stamps: 3 },

  ];

  const tileStyle = { display: "flex", flexDirection: "column", gap: 12 };

  const stampsRowStyle = {
    height: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  };

  const stampStyle = {
    width: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: "#0D0D0D",
    boxShadow: "inset 0 0 0 2px #FFFFFF",
  };

  const gridStyle = {
    display: "grid",
    marginTop: 24,
    gridTemplateColumns: "repeat(3, 1fr)",
    columnGap: 8,
    rowGap: 24,
  };

  const bottomNavStyle = {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: NAV_H,
    background: "#0D0D0D",
    borderTop: "1px solid #444444",
    zIndex: 50,
    boxSizing: "border-box",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 6,
    paddingBottom: 12,
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        background: isMobile ? "#0D0D0D" : "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: isMobile ? "100vw" : 420,
          height: isMobile ? "100dvh" : 874,
          overflow: "hidden",
          margin: isMobile ? 0 : "0 auto",
          boxSizing: "border-box",
          backgroundColor: "#0D0D0D",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          borderRadius: 0,
        }}
      >
        {/* Backdrop layer (canonical hero render) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: HERO_H,
            zIndex: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", inset: 0, height: HERO_H }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${headerBackdropSrc})`,
                backgroundSize: "cover",
                backgroundPosition: HERO_POS,
                opacity: HERO_OPACITY,
              }}
            />
            <div style={{ position: "absolute", inset: 0, background: HERO_DARKEN }} />
            <div style={{ position: "absolute", inset: 0, background: HERO_TINT }} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: HERO_GRADIENT_OPACITY,
                background: "linear-gradient(to top, #0D0D0D 0%, rgba(13,13,13,0) 100%)",
              }}
            />
          </div>
        </div>

        {/* Full-height native scroller */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
            paddingBottom: NAV_H + 16,
            boxSizing: "border-box",
          }}
        >
          {/* Spacer below header */}
          <div style={{ height: HEADER_TOTAL }} />

          <div style={{ paddingLeft: 12, paddingRight: 12, boxSizing: "border-box" }}>
            <div style={gridStyle}>
              {films.map((film) => (
                <div key={film.id} style={tileStyle}>
                  <Poster src={film.poster} />
                  <div style={stampsRowStyle}>
                    {Array.from({ length: film.stamps }).map((_, j) => (
                      <div key={j} style={stampStyle} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Header plate: window onto SAME hero render + soft fade at bottom */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: HEADER_PLATE_H, // extended by 24px
            zIndex: 15,
            pointerEvents: "none",
            overflow: "hidden",

            // Fade only the plate (alpha) over its last 12px
            WebkitMaskImage: `linear-gradient(
              to bottom,
              black 0px,
              black calc(100% - ${PLATE_FADE}px),
              transparent 100%
            )`,
            maskImage: `linear-gradient(
              to bottom,
              black 0px,
              black calc(100% - ${PLATE_FADE}px),
              transparent 100%
            )`,
          }}
        >
          <div style={{ position: "absolute", inset: 0, height: HERO_H }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${headerBackdropSrc})`,
                backgroundSize: "cover",
                backgroundPosition: HERO_POS,
                opacity: HERO_OPACITY,
              }}
            />
            <div style={{ position: "absolute", inset: 0, background: HERO_DARKEN }} />
            <div style={{ position: "absolute", inset: 0, background: HERO_TINT }} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: HERO_GRADIENT_OPACITY,
                background: "linear-gradient(to top, #0D0D0D 0%, rgba(13,13,13,0) 100%)",
              }}
            />
          </div>
        </div>

        {/* Header overlay (unchanged look) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            paddingLeft: 12,
            paddingRight: 12,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          <div style={{ height: `calc(${SAFE_TOP} + ${SAFE_BREATH}px)` }} />

          <div
            style={{
              height: LOGO_H,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="/logo.svg" alt="Seconds" style={{ height: 28, width: "auto" }} />
          </div>

          <div style={{ paddingTop: SEARCH_TOP, display: "flex", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search films, dishes, ingredients"
              style={{
                pointerEvents: "auto",
                width: "100%",
                color: "#999999",
                paddingLeft: 16,
                paddingRight: 16,
                height: SEARCH_H,
                borderRadius: 24,
                fontWeight: 500,
                fontSize: 14,
                fontFamily: "var(--font-manrope)",
                lineHeight: "1.4em",
                letterSpacing: "0em",
                userSelect: "none",
                border: "0",
                backgroundColor: "white",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        <BottomNav bottomNavStyle={bottomNavStyle} />
      </div>
    </div>
  );
}
