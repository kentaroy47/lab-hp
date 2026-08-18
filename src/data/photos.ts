/**
 * Member portraits scraped from the previous Google Sites page.
 * Keyed by member name so `members.ts` stays free of import plumbing.
 * Members without a portrait fall back to a generated initial avatar.
 */
import type { ImageMetadata } from "astro";

import pi from "../assets/members/pi.jpg";
import wenlunZhang from "../assets/members/wenlun-zhang.jpg";
import kazumaIkeda from "../assets/members/kazuma-ikeda.jpg";
import shimpeiAndo from "../assets/members/shimpei-ando.jpg";
import ozoraSako from "../assets/members/ozora-sako.jpg";
import masahiroHatano from "../assets/members/masahiro-hatano.jpg";
import risaNonaka from "../assets/members/risa-nonaka.jpg";
import ryunosukeHayashi from "../assets/members/ryunosuke-hayashi.png";
import ryoyaMatsuno from "../assets/members/ryoya-matsuno.jpg";
import xuZhen from "../assets/members/xu-zhen.jpg";
import zihaoDing from "../assets/members/zihao-ding.jpg";
import shionHorie from "../assets/members/shion-horie.jpg";
import ryuSugawara from "../assets/members/ryu-sugawara.jpg";
import marinoWatanabe from "../assets/members/marino-watanabe.jpg";
import masayukiMurakami from "../assets/members/masayuki-murakami.jpg";
import ryoTokizaki from "../assets/members/ryo-tokizaki.jpg";
import ittokuIshii from "../assets/members/ittoku-ishii.jpg";
import takumiYusa from "../assets/members/takumi-yusa.jpg";
import kentoMatsukawa from "../assets/members/kento-matsukawa.jpg";

import group1 from "../assets/members/group-1.jpg";
import group2 from "../assets/members/group-2.jpg";
import group3 from "../assets/members/group-3.jpg";

export const piPhoto = pi;

export const memberPhotos: Record<string, ImageMetadata> = {
  "Wenlun Zhang": wenlunZhang,
  "Kazuma Ikeda": kazumaIkeda,
  "Shimpei Ando": shimpeiAndo,
  "Ozora Sako": ozoraSako,
  "Masahiro Hatano": masahiroHatano,
  "Risa Nonaka": risaNonaka,
  "Ryunosuke Hayashi": ryunosukeHayashi,
  "Ryoya Matsuno": ryoyaMatsuno,
  "Xu Zhen": xuZhen,
  "Zihao Ding": zihaoDing,
  "Shion Horie": shionHorie,
  "Ryu Sugawara": ryuSugawara,
  "Marino Watanabe": marinoWatanabe,
  "Masayuki Murakami": masayukiMurakami,
  "Ryo Tokizaki": ryoTokizaki,
  "Ittoku Ishii": ittokuIshii,
  "Takumi Yusa": takumiYusa,
  "Kento Matsukawa": kentoMatsukawa,
};

export const groupPhotos = [
  { src: group1, caption: { ja: "卒業パーティーにて 2026/3", en: "Graduation party, March 2026" } },
  { src: group2, caption: { ja: "卒業パーティーにて 2025/3", en: "Graduation party, March 2025" } },
  { src: group3, caption: { ja: "2024年度 集合写真", en: "Group photo, 2024" } },
];
