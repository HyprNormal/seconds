"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

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
   Bottom Nav (IMG ICONS ONLY)
   - No SVG imports
   - No IconComponent
   - Active swaps icon to *-active.svg
   - Hover swaps icon to *-active.svg and label color to #999999
   - Active label color: #FFFFFF
   - Inactive label color: #444444
   - Transition: 180ms cubic-bezier(0.16, 1, 0.3, 1)
------------------------------ */
function BottomNav({ bottomNavStyle }) {
  const pathname = usePathname();
  const [hoveredKey, setHoveredKey] = useState(null);

  const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
  const DURATION = 180;

  const activeKey =
    pathname === "/" ? "home" :
    pathname.startsWith("/my-cuts") ? "cuts" :
    pathname.startsWith("/set-menu") ? "set" :
    pathname.startsWith("/settings") ? "settings" :
    null;

  // IMPORTANT: These paths assume icons live in /public/icons/
  // e.g. public/icons/icon-home-default.svg
  const NAV_ITEMS = [
    {
      key: "home",
      label: "Home",
      href: "/",
      defaultSrc: "/icons/icon-home-default.svg",
      activeSrc: "/icons/icon-home-active.svg",
    },
    {
      key: "cuts",
      label: "My Cuts",
      href: "/my-cuts",
      defaultSrc: "/icons/icon-cuts-default.svg",
      activeSrc: "/icons/icon-cuts-active.svg",
    },
    {
      key: "set",
      label: "Set Menu",
      href: "/set-menu",
      defaultSrc: "/icons/icon-setmenu-default.svg",
      activeSrc: "/icons/icon-setmenu-active.svg",
    },
    {
      key: "settings",
      label: "Settings",
      href: "/settings",
      defaultSrc: "/icons/icon-settings-default.svg",
      activeSrc: "/icons/icon-settings-active.svg",
    },
  ];

  const navInnerStyle = {
    height: "100%",
    width: "100%",
    display: "flex",
    boxSizing: "border-box",
  };

  const navItemStyle = {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 6,
    textDecoration: "none",
    WebkitTapHighlightColor: "transparent",
    paddingTop: 12,
  };

  const iconWrapStyle = {
    width: 16,
    height: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const navLabelStyle = {
    fontWeight: 700,
    fontSize: 10,
    lineHeight: "10px",
    userSelect: "none",
  };

  return (
    <nav style={bottomNavStyle}>
      <div style={navInnerStyle}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === activeKey;
          const isHovered = item.key === hoveredKey;

          const labelColor = isActive ? "#FFFFFF" : isHovered ? "#999999" : "#444444";
          const src = isActive || isHovered ? item.activeSrc : item.defaultSrc;

          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              onMouseEnter={() => setHoveredKey(item.key)}
              onMouseLeave={() => setHoveredKey(null)}
              style={navItemStyle}
            >
              <div style={iconWrapStyle}>
                <img
                  src={src}
                  alt=""
                  width={16}
                  height={16}
                  style={{ display: "block", width: 16, height: 16 }}
                />
              </div>

              <div
                style={{
                  ...navLabelStyle,
                  color: labelColor,
                  transition: `color ${DURATION}ms ${EASE}`,
                }}
              >
                {item.label}
              </div>
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
  const headerBackdropSrc = "/films/spirited-away/backdrop.webp";

  const films = [
    { id: "tampopo", poster: "/films/tampopo/cover.webp", stamps: 5 },
    { id: "delicetessen", poster: "/films/delicetessen/cover.webp", stamps: 3 },
    { id: "boiling-point", poster: "/films/boiling-point/cover.webp", stamps: 4 },
    { id: "no", poster: "/films/tampopo/cover.jpg", stamps: 4 },
    { id: "blade-runner", poster: "/films/tampopo/cover.jpg", stamps: 1 },
    { id: "chungking-express", poster: "/films/tampopo/cover.jpg", stamps: 5 },
    { id: "before-sunrise", poster: "/films/tampopo/cover.jpg", stamps: 2 },
    { id: "disco-elysium", poster: "/films/tampopo/cover.jpg", stamps: 3 },
    { id: "remains-of-the-day", poster: "/posters/remains-of-the-day.jpg", stamps: 4 },
  ];

  const tileStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  };

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
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 6,
    height: 88,
    background: "#0D0D0D",
    borderTop: "1px solid #444444",
    zIndex: 50,
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        width: 420,
        height: 874,
        overflow: "hidden",
        margin: "0 auto",
        boxSizing: "border-box",
        backgroundColor: "#0D0D0D",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Backdrop layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 386,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${headerBackdropSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            opacity: 0.9,
            inset: 0,
            background:
              "linear-gradient(to top, #0D0D0D 0%, rgba(13,13,13,0) 100%)",
          }}
        />
      </div>

      {/* Foreground wrapper (padded content only) */}
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
        {/* iOS safe zone */}
        <div style={{ height: 62 }} />

        {/* Header */}
        <div
          style={{
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src="/logo.svg" alt="Seconds" style={{ height: 28, width: "auto" }} />
        </div>

        {/* Search bar */}
        <div style={{ paddingTop: 24, display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search films, dishes, ingredients"
            style={{
              width: "100%",
              paddingLeft: 16,
              paddingRight: 16,
              height: 48,
              borderRadius: 24,
              border: "1px solid #666",
              backgroundColor: "#0D0D0D",
              color: "#FFFFFF",
              fontSize: 14,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Scroll container */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            WebkitOverflowScrolling: "touch",
            paddingBottom: 104,
            boxSizing: "border-box",
            maskImage: "linear-gradient(to bottom, transparent 0px, black 24px)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, black 24px)",
          }}
        >
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

          {/* debug overflow */}
          <div style={{ height: 400 }} />
        </div>
      </div>

      {/* Bottom nav overlays content */}
      <BottomNav bottomNavStyle={bottomNavStyle} />
    </div>
  );
}
