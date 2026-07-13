"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

const SWIPE_THRESHOLD = 40;

export function useImageSlider(total: number, intervalMs = 3800) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const swiped = useRef(false);
  const pauseUntil = useRef(0);

  useEffect(() => {
    setIndex(0);
  }, [total]);

  useEffect(() => {
    if (total <= 1) return;
    const timer = window.setInterval(() => {
      if (Date.now() < pauseUntil.current) return;
      setIndex((current) => (current + 1) % total);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [total, intervalMs]);

  const goTo = useCallback(
    (next: number) => {
      if (total <= 0) return;
      setIndex(((next % total) + total) % total);
      pauseUntil.current = Date.now() + intervalMs;
    },
    [total, intervalMs],
  );

  const goBy = useCallback(
    (delta: number) => {
      setIndex((current) => {
        if (total <= 0) return 0;
        return (current + delta + total) % total;
      });
      pauseUntil.current = Date.now() + intervalMs;
    },
    [total, intervalMs],
  );

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (total <= 1) return;
      startX.current = e.clientX;
      startY.current = e.clientY;
      swiped.current = false;
      e.currentTarget.setPointerCapture?.(e.pointerId);
    },
    [total],
  );

  const onPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (startX.current == null || startY.current == null) return;
      const dx = e.clientX - startX.current;
      const dy = e.clientY - startY.current;
      startX.current = null;
      startY.current = null;

      if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;

      swiped.current = true;
      // Track is forced LTR: swipe left = next, swipe right = previous
      goBy(dx < 0 ? 1 : -1);
    },
    [goBy],
  );

  const onPointerCancel = useCallback(() => {
    startX.current = null;
    startY.current = null;
  }, []);

  const consumeSwipe = useCallback(() => {
    if (!swiped.current) return false;
    swiped.current = false;
    return true;
  }, []);

  return {
    index,
    setIndex: goTo,
    swipeHandlers: {
      onPointerDown,
      onPointerUp,
      onPointerCancel,
    },
    consumeSwipe,
  };
}
