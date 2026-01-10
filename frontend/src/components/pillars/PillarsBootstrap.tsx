"use client";

import { useEffect } from "react";
import { getPillarsCached } from "@/utils/pillars";

export default function PillarsBootstrap() {
  useEffect(() => {
    getPillarsCached().catch(() => {
      // Ignore preload failures; consumers can handle errors explicitly.
    });
  }, []);

  return null;
}
