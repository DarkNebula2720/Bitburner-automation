// lib/config.js

/** Mode selector: "auto" = full automation, "manual" = assistant */
export const MODE = "auto";

/** RAM reserve in GB (leave buffer for manual commands or player scripts) */
export const RAM_BUFFER = 32;

/** Hack success threshold (used by targeting logic) */
export const SUCCESS_THRESHOLD = 0.8;

/** Target crime for sleeves in manual or auto mode */
export const PREFERRED_CRIME = "Mug";

/** Faction priority order */
export const FACTION_PRIORITY = [
  "CyberSec", "NiteSec", "Tian Di Hui", "Netburners", "BitRunners", "Daedalus"
];

/** Augmentations you want to rush first */
export const CORE_AUGMENTS = [
  "NeuroFlux Governor", "The Red Pill", "Hacknet Node CPU Architecture Neural-Upload"
];
