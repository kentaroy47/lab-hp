/**
 * Figure 1 lifted from each paper's arXiv PDF, keyed by project slug.
 * Shown large on project detail pages, where the detail is legible; listing
 * cards keep the generated teaser so they stay consistent and readable.
 *
 * Regenerate with scripts/fetch-figures.py after adding an arXiv-linked project.
 */
import type { ImageMetadata } from "astro";

import bitrom from "../assets/figures/bitrom-fig1.png";
import dSlamspoof from "../assets/figures/d-slamspoof-fig1.png";
import detas from "../assets/figures/detas-fig1.png";
import flareChromaguard from "../assets/figures/flare-chromaguard-fig1.png";
import ghostFwl from "../assets/figures/ghost-fwl-fig1.png";
import osaHcim from "../assets/figures/osa-hcim-fig1.png";
import pulsarNet from "../assets/figures/pulsar-net-fig1.png";
import slamspoof from "../assets/figures/slamspoof-fig1.png";

export const paperFigures: Record<string, ImageMetadata> = {
  bitrom,
  "d-slamspoof": dSlamspoof,
  detas,
  "flare-chromaguard": flareChromaguard,
  "ghost-fwl": ghostFwl,
  "osa-hcim": osaHcim,
  "pulsar-net": pulsarNet,
  slamspoof,
};
