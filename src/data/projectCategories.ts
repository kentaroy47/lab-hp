import type { CollectionEntry } from "astro:content";

/**
 * Projects carry many fine-grained tags (CIM, Transformer, Sports, …), which made
 * for a filter bar of 14 buttons. These four categories mirror the three research
 * themes plus a highlights view, so Research and Projects stay consistent and a
 * visitor has a small number of meaningful choices.
 *
 * Every project belongs to exactly one category; `highlight` cuts across them.
 */
export type ProjectCategory = "computing" | "security" | "sensing";

export const categoryOf = (p: CollectionEntry<"projects">): ProjectCategory => {
  if (p.data.section === "Circuit") return "computing";
  return p.data.tags.includes("Security") ? "security" : "sensing";
};

export const categoryLabels: Record<ProjectCategory, { ja: string; en: string }> = {
  computing: { ja: "AIチップ・回路", en: "AI chips & circuits" },
  security: { ja: "自動運転セキュリティ", en: "Autonomous driving security" },
  sensing: { ja: "LiDAR応用", en: "LiDAR applications" },
};

/** Maps a research theme to the project category that backs it. */
export const themeCategory: Record<string, ProjectCategory> = {
  "edge-computing": "computing",
  "autonomous-driving-security": "security",
  "lidar-3d-sensing": "sensing",
};
