"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import HomeDefault from "@/icons/icon-home-default.svg";
import HomeActive from "@/icons/icon-home-active.svg";

import CutsDefault from "@/icons/icon-cuts-default.svg";
import CutsActive from "@/icons/icon-cuts-active.svg";

import SetDefault from "@/icons/icon-setmenu-default.svg";
import SetActive from "@/icons/icon-setmenu-active.svg";

import SettingsDefault from "@/icons/icon-settings-default.svg";
import SettingsActive from "@/icons/icon-settings-active.svg";

import SearchIcon from "@/icons/icon-search.svg";
import FilterIcon from "@/icons/icon-filter.svg";

// Flags (multicolour SVGs — do NOT use currentColor)
import FlagUK from "@/icons/flags/flag-uk.svg";
import FlagJP from "@/icons/flags/flag-jp.svg";
import FlagDE from "@/icons/flags/flag-de.svg";
import FlagFR from "@/icons/flags/flag-fr.svg";
import FlagIT from "@/icons/flags/flag-it.svg";
import FlagCU from "@/icons/flags/flag-cu.svg";
import FlagHK from "@/icons/flags/flag-hk.svg";
import FlagUS from "@/icons/flags/flag-us.svg";
import FlagDK from "@/icons/flags/flag-dk.svg";

/* -----------------------------
   Motion (matches nav feel)
------------------------------ */
const EASE = [0.16, 1, 0.3, 1];
const CARD_ENTER_MS = 180;

const resultsContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.02,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: CARD_ENTER_MS / 1000, ease: EASE },
  },
};

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

const FLAG_MAP = {
  uk: FlagUK,
  jp: FlagJP,
  de: FlagDE,
  fr: FlagFR,
  it: FlagIT,
  cu: FlagCU,
  hk: FlagHK,
  us: FlagUS,
  dk: FlagDK,
};

function Poster({ src, country }) {
  const Flag = country ? FLAG_MAP[country] : null;

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

      {Flag && (
        <div
          style={{
            position: "absolute",
            right: 6,
            bottom: 6,
            width: 16,
            height: 16,
            pointerEvents: "none",
            filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.24))",
          }}
        >
          <Flag width={16} height={16} aria-hidden="true" focusable="false" />
        </div>
      )}

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
   Bottom Nav
------------------------------ */
function BottomNav({ bottomNavStyle }) {
  const pathname = usePathname();
  const [hoveredKey, setHoveredKey] = useState(null);
  const [pressedKey, setPressedKey] = useState(null);

  const NAV_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
  const NAV_DURATION = 180;

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
    {
      key: "home",
      label: "Home",
      href: "/",
      DefaultIcon: HomeDefault,
      ActiveIcon: HomeActive,
      width: 18,
      height: 16,
    },
    {
      key: "cuts",
      label: "My Cuts",
      href: "/my-cuts",
      DefaultIcon: CutsDefault,
      ActiveIcon: CutsActive,
      width: 16,
      height: 16,
    },
    {
      key: "set",
      label: "Set Menu",
      href: "/set-menu",
      DefaultIcon: SetDefault,
      ActiveIcon: SetActive,
      width: 16,
      height: 16,
    },
    {
      key: "settings",
      label: "Settings",
      href: "/settings",
      DefaultIcon: SettingsDefault,
      ActiveIcon: SettingsActive,
      width: 16,
      height: 16,
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
    height: 48,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    textDecoration: "none",
    WebkitTapHighlightColor: "transparent",
    transition: `color ${NAV_DURATION}ms ${NAV_EASE}`,
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

          const color = isActive
            ? "#FFFFFF"
            : isInteractiveHighlight
            ? "#999999"
            : "#444444";
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
                <Icon
                  width={item.width}
                  height={item.height}
                  aria-hidden="true"
                  focusable="false"
                  style={{ display: "block" }}
                />
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
   Search helpers
------------------------------ */
function normalizeForSearch(s) {
  if (!s) return "";
  try {
    return s
      .toString()
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  } catch {
    return s.toString().trim().toLowerCase();
  }
}

function matchesQuery(title, q) {
  const t = normalizeForSearch(title);
  if (!q) return false;
  if (t.startsWith(q)) return true;
  const words = t.split(/[\s\-:()]+/g).filter(Boolean);
  return words.some((w) => w.startsWith(q));
}

/* -----------------------------
   Results UI
------------------------------ */
function Section({ title, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          fontFamily: "var(--font-manrope)",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0em",
          color: "#FFFFFF",
        }}
      >
        {title}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {children}
      </div>
    </div>
  );
}

/* -----------------------------
   Chevron (CSS-only, cannot fail)
------------------------------ */
function RightChevron() {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        minWidth: 40,
        minHeight: 40,
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRight: "2px solid #999999",
          borderTop: "2px solid #999999",
          transform: "rotate(45deg)",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function FilmResultCard({ film }) {
  const Flag = film?.country ? FLAG_MAP[film.country] : null;

  const director = film?.director ? String(film.director) : "";
  const year = film?.year ? String(film.year) : "";
  const metaHasContent = Boolean(director || year);

  return (
    <div
      style={{
        height: 80,
        background: "#FFFFFF",
        borderRadius: 6,
        padding: "8px 12px 8px 8px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {/* Poster */}
      <div
        style={{
          width: 48,
          height: 64,
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          flex: "0 0 auto",
          background: "#EEEEEE",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${film.poster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Text column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          minWidth: 0,
          flex: 1,
          marginLeft: 12,
          marginRight: 12,
        }}
      >
        {/* Title row + flag */}
        <div style={{ display: "flex", alignItems: "center", height: 12, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-manrope)",
              fontSize: 16,
              fontWeight: 700,
              color: "#444444",
              lineHeight: "12px",
              height: 16,
              paddingTop: 2,
              boxSizing: "border-box",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minWidth: 0,
              flex: "0 1 auto",
            }}
            title={film.title}
          >
            {film.title}
          </div>

          {Flag && (
            <div
              style={{
                width: 12,
                height: 12,
                marginLeft: 8,
                flex: "0 0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.24))",
              }}
            >
              <Flag width={12} height={12} aria-hidden="true" focusable="false" />
            </div>
          )}
        </div>

        {/* Director • Year */}
        {metaHasContent ? (
          <div
            style={{
              fontFamily: "var(--font-manrope)",
              fontSize: 12,
              color: "#999999",
              lineHeight: "1.2em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {director ? <span style={{ fontWeight: 600 }}>{director}</span> : null}
            {director && year ? <span style={{ fontWeight: 500 }}>{" • "}</span> : null}
            {year ? <span style={{ fontWeight: 500 }}>{year}</span> : null}
          </div>
        ) : null}
      </div>

      <RightChevron />
    </div>
  );
}

function SimpleResultCard({ title, meta }) {
  return (
    <div
      style={{
        height: 80,
        background: "#FFFFFF",
        borderRadius: 6,
        padding: "8px 12px 8px 8px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <div style={{ width: 48, height: 64, flex: "0 0 auto" }} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          minWidth: 0,
          flex: 1,
          marginLeft: 12,
          marginRight: 12,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-manrope)",
            fontSize: 16,
            fontWeight: 700,
            color: "#444444",
            lineHeight: "12px",
            height: 16,
            paddingTop: 2,
            boxSizing: "border-box",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minWidth: 0,
          }}
          title={title}
        >
          {title}
        </div>

        {meta ? (
          <div
            style={{
              fontFamily: "var(--font-manrope)",
              fontSize: 12,
              color: "#999999",
              lineHeight: "1.2em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ fontWeight: 500 }}>{meta}</span>
          </div>
        ) : null}
      </div>

      <RightChevron />
    </div>
  );
}

/* -----------------------------
   Page
------------------------------ */
export default function Home() {
  const isMobile = useIsMobile(480);

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [query, setQuery] = useState("");

  const [scrollFx, setScrollFx] = useState({ stroke: 0, bg: 0 });
  const rafRef = useRef(null);

  const [films, setFilms] = useState([]);

  // Animate results ONLY when entering search mode (empty -> non-empty).
  const [resultsEnterKey, setResultsEnterKey] = useState(0);
  const prevShowResultsRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function loadFilms() {
      try {
        const indexRes = await fetch("/films/index.json", { cache: "no-store" });
        if (!indexRes.ok) throw new Error("Missing /films/index.json");
        const ids = await indexRes.json();

        const results = await Promise.allSettled(
          ids.map(async (id) => {
            const res = await fetch(`/films/${id}/film.json`, { cache: "no-store" });
            if (!res.ok) throw new Error(`Missing /films/${id}/film.json`);
            const data = await res.json();

            return {
              ...data,
              id: data?.id || id,
              title: data?.title || id,
              poster: `/films/${id}/cover.webp`,
              backdrop: `/films/${id}/backdrop.webp`,
              stamps: Number.isFinite(data?.stamps) ? data.stamps : 0,
              country: typeof data?.country === "string" ? data.country.toLowerCase() : undefined,
              director: data?.director,
              year: data?.year,
            };
          })
        );

        const ok = results.filter((r) => r.status === "fulfilled").map((r) => r.value);
        if (!cancelled) setFilms(ok);
      } catch {
        if (!cancelled) setFilms([]);
      }
    }

    loadFilms();
    return () => {
      cancelled = true;
    };
  }, []);

  const headerBackdropSrc = "/films/spirited-away/backdrop.webp";

  const NAV_BUTTON_H = 48;
  const NAV_H = NAV_BUTTON_H + 18;

  const SAFE_TOP = "env(safe-area-inset-top)";
  const SAFE_BREATH = 28;
  const LOGO_H = 48;
  const SEARCH_TOP = 24;
  const SEARCH_H = 48;

  const HEADER_TOTAL = `calc(${SAFE_TOP} + ${SAFE_BREATH + LOGO_H + SEARCH_TOP + SEARCH_H}px)`;
  const PLATE_EXTEND = 12;
  const HEADER_PLATE_H = `calc(${HEADER_TOTAL} + ${PLATE_EXTEND}px)`;

  const HERO_H = `calc(420px + ${SAFE_TOP})`;

  const HERO_POS = "center top";
  const HERO_OPACITY = 1;
  const HERO_DARKEN = "rgba(13, 13, 13, 0.20)";
  const HERO_TINT = "rgba(10, 40, 110, 0.18)";
  const HERO_GRADIENT_OPACITY = 0.9;

  const tileStyle = { display: "flex", flexDirection: "column", gap: 12 };

  const stampsRowStyle = { height: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 };

  const stampStyle = { width: 16, height: 16, borderRadius: 999, backgroundColor: "#0D0D0D", boxShadow: "inset 0 0 0 2px #FFFFFF" };

  const gridStyle = { display: "grid", marginTop: 24, gridTemplateColumns: "repeat(3, 1fr)", columnGap: 8, rowGap: 24 };

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

  function handleScroll(e) {
    const el = e.currentTarget;

    const STROKE_RANGE = 12;
    const BG_RANGE = 24;

    const stroke = Math.max(0, Math.min(1, el.scrollTop / STROKE_RANGE));
    const bg = Math.max(0, Math.min(1, el.scrollTop / BG_RANGE));

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setScrollFx({ stroke, bg }));
  }

  const strokeColor = `rgba(68, 68, 68, ${scrollFx.stroke})`;
  const backgroundHeroOpacity = 1 - scrollFx.bg;

  const recipesData = useMemo(
    () => [
      { id: "devilled-eggs", title: "Devilled Eggs", meta: "Recipe" },
      { id: "delicious", title: "Delicious", meta: "Recipe" },
    ],
    []
  );

  const ingredientsData = useMemo(
    () => [
      { id: "dill", title: "Dill", meta: "Ingredient" },
      { id: "demerara-sugar", title: "Demerara Sugar", meta: "Ingredient" },
    ],
    []
  );

  const q = normalizeForSearch(query);

  const filmResults = useMemo(() => {
    if (!q) return [];
    return films
      .filter((f) => matchesQuery(f.title, q))
      .sort((a, b) => a.title.localeCompare(b.title))
      .slice(0, 12);
  }, [films, q]);

  const recipeResults = useMemo(() => {
    if (!q) return [];
    return recipesData
      .filter((r) => matchesQuery(r.title, q))
      .sort((a, b) => a.title.localeCompare(b.title))
      .slice(0, 12);
  }, [recipesData, q]);

  const ingredientResults = useMemo(() => {
    if (!q) return [];
    return ingredientsData
      .filter((i) => matchesQuery(i.title, q))
      .sort((a, b) => a.title.localeCompare(b.title))
      .slice(0, 12);
  }, [ingredientsData, q]);

  const showResults = q.length > 0;

  useEffect(() => {
    const prev = prevShowResultsRef.current;
    if (showResults && !prev) setResultsEnterKey((k) => k + 1);
    prevShowResultsRef.current = showResults;
  }, [showResults]);

  return (
    <div style={{ width: "100vw", height: "100dvh", background: isMobile ? "#0D0D0D" : "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div style={{ width: isMobile ? "100vw" : 420, height: isMobile ? "100dvh" : 874, overflow: "hidden", margin: isMobile ? 0 : "0 auto", boxSizing: "border-box", backgroundColor: "#0D0D0D", display: "flex", flexDirection: "column", position: "relative", borderRadius: 0 }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: HERO_H, zIndex: 0, pointerEvents: "none", overflow: "hidden", opacity: backgroundHeroOpacity }}>
          <div style={{ position: "absolute", inset: 0, height: HERO_H }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${headerBackdropSrc})`, backgroundSize: "cover", backgroundPosition: HERO_POS, opacity: HERO_OPACITY }} />
            <div style={{ position: "absolute", inset: 0, background: HERO_DARKEN }} />
            <div style={{ position: "absolute", inset: 0, background: HERO_TINT }} />
            <div style={{ position: "absolute", inset: 0, opacity: HERO_GRADIENT_OPACITY, background: "linear-gradient(to top, #0D0D0D 0%, rgba(13,13,13,0) 100%)" }} />
          </div>
        </div>

        <div onScroll={handleScroll} style={{ position: "absolute", inset: 0, zIndex: 1, overflowY: "auto", overflowX: "hidden", WebkitOverflowScrolling: "touch", overscrollBehavior: "contain", paddingBottom: NAV_H + 16, boxSizing: "border-box" }}>
          <div style={{ height: HEADER_TOTAL }} />

          <div style={{ paddingLeft: 12, paddingRight: 12, boxSizing: "border-box" }}>
            {!showResults ? (
              <div style={gridStyle}>
                {films.map((film) => (
                  <div key={film.id} style={tileStyle}>
                    <Poster src={film.poster} country={film.country} />
                    <div style={stampsRowStyle}>
                      {Array.from({ length: film.stamps }).map((_, j) => (
                        <div key={j} style={stampStyle} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ marginTop: 24 }}>
                <motion.div
                  key={resultsEnterKey}
                  initial="hidden"
                  animate="show"
                  variants={resultsContainerVariants}
                  style={{ display: "flex", flexDirection: "column", gap: 40 }}
                >
                  {filmResults.length > 0 && (
                    <Section title="Films">
                      {filmResults.map((f) => (
                        <motion.div key={f.id} variants={cardVariants}>
                          <FilmResultCard film={f} />
                        </motion.div>
                      ))}
                    </Section>
                  )}

                  {recipeResults.length > 0 && (
                    <Section title="Recipes">
                      {recipeResults.map((r) => (
                        <motion.div key={r.id} variants={cardVariants}>
                          <SimpleResultCard title={r.title} meta={r.meta} />
                        </motion.div>
                      ))}
                    </Section>
                  )}

                  {ingredientResults.length > 0 && (
                    <Section title="Ingredients">
                      {ingredientResults.map((i) => (
                        <motion.div key={i.id} variants={cardVariants}>
                          <SimpleResultCard title={i.title} meta={i.meta} />
                        </motion.div>
                      ))}
                    </Section>
                  )}

                  {filmResults.length === 0 && recipeResults.length === 0 && ingredientResults.length === 0 && (
                    <motion.div variants={cardVariants}>
                      <div
                        style={{
                          borderRadius: 6,
                          background: "#FFFFFF",
                          padding: 12,
                          color: "#444444",
                          fontFamily: "var(--font-manrope)",
                          fontSize: 14,
                          lineHeight: "1.4em",
                        }}
                      >
                        No results for “{query.trim()}”.
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            )}
          </div>
        </div>

        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: HEADER_PLATE_H, zIndex: 15, pointerEvents: "none", overflow: "hidden", borderBottom: `1px solid ${strokeColor}`, boxSizing: "border-box" }}>
          <div style={{ position: "absolute", inset: 0, height: HERO_H }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${headerBackdropSrc})`, backgroundSize: "cover", backgroundPosition: HERO_POS, opacity: HERO_OPACITY }} />
            <div style={{ position: "absolute", inset: 0, background: HERO_DARKEN }} />
            <div style={{ position: "absolute", inset: 0, background: HERO_TINT }} />
            <div style={{ position: "absolute", inset: 0, opacity: HERO_GRADIENT_OPACITY, background: "linear-gradient(to top, #0D0D0D 0%, rgba(13,13,13,0) 100%)" }} />
          </div>
        </div>

        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20, paddingLeft: 12, paddingRight: 12, boxSizing: "border-box", pointerEvents: "none" }}>
          <div style={{ height: `calc(${SAFE_TOP} + ${SAFE_BREATH}px)` }} />

          <div style={{ height: LOGO_H, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/logo.svg" alt="Seconds" style={{ height: 28, width: "auto" }} />
          </div>

          <div style={{ paddingTop: SEARCH_TOP, display: "flex", alignItems: "center" }}>
            <div style={{ position: "relative", width: "100%", pointerEvents: "auto" }}>
              <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", color: "#444444" }}>
                <SearchIcon width={16} height={16} aria-hidden="true" focusable="false" style={{ display: "block" }} />
              </div>

              <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", color: "#999999" }}>
                <FilterIcon width={16} height={16} aria-hidden="true" focusable="false" style={{ display: "block" }} />
              </div>

             <input
  type="text"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Search films, dishes, ingredients"
  onFocus={() => setIsSearchFocused(true)}
  onBlur={() => {
    if (!query.trim()) setIsSearchFocused(false);
  }}
  className="secondsSearch"
  style={{
    width: "100%",
    height: SEARCH_H,
    borderRadius: 24,
    border: "0",
    backgroundColor: "white",
    outline: "none",
    boxSizing: "border-box",
    color: "#444444",
    fontWeight: 500,
    fontSize: 16,
    fontFamily: "var(--font-manrope)",
    letterSpacing: "0em",
    paddingLeft: 44,
    paddingRight: 32,

    // iOS focus stability (keep these)
    WebkitAppearance: "none",
    appearance: "none",
    boxShadow: "none",

    // Normal vertical metrics (prevents mobile jump)
    lineHeight: "20px",
    paddingTop: 14,
    paddingBottom: 14,
  }}
/>

<style jsx>{`
  .secondsSearch::placeholder {
    color: #999999;
    opacity: 1;
    transition: opacity 180ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .secondsSearch:focus::placeholder {
    opacity: 0;
  }
`}

</style>
            </div>
          </div>
        </div>

        <BottomNav bottomNavStyle={bottomNavStyle} />
      </div>
    </div>
  );
}
