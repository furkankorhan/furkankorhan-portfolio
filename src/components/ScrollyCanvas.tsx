"use client";

import { useEffect, useRef, useState } from "react";
import sequenceFiles from "../lib/sequenceFiles.json";

const FRAME_COUNT = sequenceFiles.length;

export function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const blobUrls: string[] = new Array(FRAME_COUNT).fill("");
    let loadedCount = 0;
    let lastFrame = 0;
    let rafId: number;

    // Fetch each image → convert to Blob URL → store in memory
    // This eliminates ALL network requests during scroll (works on mobile/WiFi)
    const loadFrame = (index: number): Promise<void> =>
      fetch(`/sequence/${sequenceFiles[index]}`)
        .then((r) => r.blob())
        .then((blob) => {
          blobUrls[index] = URL.createObjectURL(blob);
          loadedCount++;

          const pct = Math.round((loadedCount / FRAME_COUNT) * 100);
          setLoadProgress(pct);

          // Show first frame as soon as it's available
          if (index === 0 && imgRef.current) {
            imgRef.current.src = blobUrls[0];
            setIsReady(true);
          }
        })
        .catch(() => {
          // Fallback: use original URL if fetch fails
          blobUrls[index] = `/sequence/${sequenceFiles[index]}`;
          loadedCount++;
          if (index === 0 && imgRef.current) {
            imgRef.current.src = `/sequence/${sequenceFiles[0]}`;
            setIsReady(true);
          }
        });

    // Load frame 0 first, then the rest in parallel
    loadFrame(0).then(() => {
      for (let i = 1; i < FRAME_COUNT; i++) loadFrame(i);
    });

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const totalScrollable = container.offsetHeight - window.innerHeight;
        if (totalScrollable <= 0) return;

        const scrolled = Math.max(0, -rect.top);
        const progress = Math.min(1, scrolled / totalScrollable);
        const frame = Math.round(progress * (FRAME_COUNT - 1));

        if (frame !== lastFrame && blobUrls[frame] && imgRef.current) {
          lastFrame = frame;
          imgRef.current.src = blobUrls[frame];
        }

        // Update overlay
        updateOverlay(progress);
      });
    };

    // iOS Safari: also listen to touchmove for momentum scroll
    const onTouch = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const totalScrollable = container.offsetHeight - window.innerHeight;
        if (totalScrollable <= 0) return;
        const scrolled = Math.max(0, -rect.top);
        const progress = Math.min(1, scrolled / totalScrollable);
        const frame = Math.round(progress * (FRAME_COUNT - 1));
        if (frame !== lastFrame && blobUrls[frame] && imgRef.current) {
          lastFrame = frame;
          imgRef.current.src = blobUrls[frame];
        }
        updateOverlay(progress);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onTouch);
      cancelAnimationFrame(rafId);
      blobUrls.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Animasyonlu hero bölümü"
      style={{ position: "relative", height: "500vh", width: "100%", background: "#000" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {/* Loading bar */}
        {!isReady && (
          <div style={{
            position: "absolute", bottom: 0, left: 0,
            height: "2px", background: "rgba(255,255,255,0.15)", width: "100%", zIndex: 20,
          }}>
            <div style={{
              height: "100%", background: "rgba(255,255,255,0.6)",
              width: `${loadProgress}%`, transition: "width 0.3s ease",
            }} />
          </div>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={`/sequence/${sequenceFiles[0]}`}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", display: "block",
            opacity: isReady ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />

        <NativeOverlay />
      </div>
    </section>
  );
}

// Refs exposed globally within component tree for overlay updates
let h1El: HTMLDivElement | null = null;
let t1El: HTMLParagraphElement | null = null;
let t2El: HTMLParagraphElement | null = null;

function updateOverlay(p: number) {
  // H1: visible 0–0.12, fade out by 0.22
  const op1 = p < 0.12 ? 1 : p < 0.22 ? 1 - (p - 0.12) / 0.10 : 0;
  const y1 = -p * 60;

  // Text 1: 0.28–0.52
  const op2 =
    p < 0.28 ? 0 : p < 0.33 ? (p - 0.28) / 0.05
    : p < 0.43 ? 1 : p < 0.52 ? 1 - (p - 0.43) / 0.09 : 0;
  const y2 = p < 0.28 ? 50 : p > 0.52 ? -50 : 50 - ((p - 0.28) / 0.24) * 100;

  // Text 2: 0.58–0.82
  const op3 =
    p < 0.58 ? 0 : p < 0.63 ? (p - 0.58) / 0.05
    : p < 0.73 ? 1 : p < 0.82 ? 1 - (p - 0.73) / 0.09 : 0;
  const y3 = p < 0.58 ? 50 : p > 0.82 ? -50 : 50 - ((p - 0.58) / 0.24) * 100;

  if (h1El) { h1El.style.opacity = String(Math.max(0, op1)); h1El.style.transform = `translateY(${y1}px)`; }
  if (t1El) { t1El.style.opacity = String(Math.max(0, op2)); t1El.style.transform = `translateY(${y2}px)`; }
  if (t2El) { t2El.style.opacity = String(Math.max(0, op3)); t2El.style.transform = `translateY(${y3}px)`; }
}

function NativeOverlay() {
  const h1Ref = useRef<HTMLDivElement>(null);
  const t1Ref = useRef<HTMLParagraphElement>(null);
  const t2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    h1El = h1Ref.current;
    t1El = t1Ref.current;
    t2El = t2Ref.current;
    return () => { h1El = null; t1El = null; t2El = null; };
  }, []);

  const base: React.CSSProperties = {
    position: "absolute", inset: 0,
    pointerEvents: "none", userSelect: "none",
    willChange: "opacity, transform", display: "flex",
  };

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }}>
      {/* H1 identity */}
      <div ref={h1Ref} style={{ ...base, alignItems: "center", justifyContent: "center", padding: "2rem", opacity: 1 }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{
            fontSize: "clamp(2rem, 8vw, 5rem)", fontWeight: 700,
            color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15,
            textShadow: "0 2px 20px rgba(0,0,0,0.7)", margin: 0,
          }}>
            Furkan Korhan
          </h1>
          <p style={{
            marginTop: "0.75rem",
            fontSize: "clamp(0.85rem, 2.2vw, 1.3rem)",
            color: "rgba(255,255,255,0.6)", fontWeight: 500,
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          }}>
            Technik verstehen.&nbsp; Probleme lösen.&nbsp; Weiterlernen.
          </p>
        </div>
      </div>

      {/* Transition 1 */}
      <p ref={t1Ref} aria-hidden="true" style={{
        ...base, alignItems: "center", justifyContent: "flex-start",
        padding: "clamp(1.5rem, 6vw, 6rem)",
        fontSize: "clamp(1.8rem, 6vw, 3.5rem)", fontWeight: 700,
        color: "#fff", lineHeight: 1.2,
        textShadow: "0 2px 16px rgba(0,0,0,0.7)", opacity: 0,
      }}>
        Software entwickeln.
      </p>

      {/* Transition 2 */}
      <p ref={t2Ref} aria-hidden="true" style={{
        ...base, alignItems: "center", justifyContent: "flex-end",
        padding: "clamp(1.5rem, 6vw, 6rem)",
        fontSize: "clamp(1.8rem, 6vw, 3.5rem)", fontWeight: 700,
        color: "#fff", textAlign: "right", lineHeight: 1.2,
        textShadow: "0 2px 16px rgba(0,0,0,0.7)", opacity: 0,
      }}>
        Systeme verstehen.
      </p>
    </div>
  );
}
