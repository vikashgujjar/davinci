import type { StaticImageData } from "next/image";
import aiNetwork from "../../public/images/ai-network.gif";
import aiProcessing from "../../public/images/ai-processing.jpg";
import droneSunset from "../../public/images/drone-sunset.jpg";
import gnssRover from "../../public/images/gnss-rover.jpg";
import laptopDrawing from "../../public/images/laptop-drawing.jpg";
import surveyField from "../../public/images/survey-field.gif";
import surveyMap from "../../public/images/survey-map.jpg";
import topoMap from "../../public/images/topo-map.jpg";
import topoRiver from "../../public/images/topo-river.jpg";
import totalStation from "../../public/images/total-station.jpg";

export type SiteImage = { src: StaticImageData; alt: string; source: string };

/**
 * Photography used across the site, chosen to match DaVinci's services and
 * technologies: field capture (GNSS, total station, drone), AI processing,
 * CAD drafting and topographic deliverables.
 *
 * All are free photos under the Unsplash License (commercial use allowed, no
 * attribution required). `source` keeps the original page for reference.
 * To swap a photo, replace the file in public/images/ with one of the same name.
 */

export const images = {
  /** AI — data flowing through neural-network layers. */
  aiNetwork: {
    src: aiNetwork,
    alt: "Abstract visualization of data passing through layers of a neural network.",
    source: "https://unsplash.com/photos/4QVqSh4VvP4",
  },
  /** AI — abstract visualization (Google DeepMind, Visualising AI). */
  aiProcessing: {
    src: aiProcessing,
    alt: "Abstract blue visualization of how a neural network processes data.",
    source: "https://unsplash.com/photos/jVZ_BKzDOJg",
  },
  /** Drone mapping. */
  droneSunset: {
    src: droneSunset,
    alt: "A mapping drone in flight against a sunset sky.",
    source: "https://unsplash.com/photos/Iz9u6T3VMIk",
  },
  /** GNSS field capture. */
  gnssRover: {
    src: gnssRover,
    alt: "A surveyor in a hard hat collecting points with a GNSS rover on a construction site.",
    source: "https://unsplash.com/photos/PDjpA1yeonw",
  },
  /** CAD drafting. */
  laptopDrawing: {
    src: laptopDrawing,
    alt: "A drafter working on a laptop showing a technical CAD drawing.",
    source: "https://unsplash.com/photos/SkP5Ppijj7I",
  },
  /** Survey instrument set up in the field. */
  surveyField: {
    src: surveyField,
    alt: "A surveying instrument on a tripod in a green field.",
    source: "https://unsplash.com/photos/zSrksQgp4W0",
  },
  /** Topographic survey map (deliverable). */
  surveyMap: {
    src: surveyMap,
    alt: "Close-up of a printed topographic survey map with contour lines and boundaries.",
    source: "https://unsplash.com/photos/r9mw4_XkUwY",
  },
  /** Topographic contour map (deliverable). */
  topoMap: {
    src: topoMap,
    alt: "A topographic map with dense contour lines and spot elevations.",
    source: "https://unsplash.com/photos/PtpRmtsh6A0",
  },
  /** Topographic map with river (texture). */
  topoRiver: {
    src: topoRiver,
    alt: "A topographic map showing a winding river and contour lines.",
    source: "https://unsplash.com/photos/h8Q5YTQs_k4",
  },
  /** Total station. */
  totalStation: {
    src: totalStation,
    alt: "A total station surveying instrument set up outdoors.",
    source: "https://unsplash.com/photos/MK2ZSaI0W2k",
  },
} satisfies Record<string, SiteImage>;
