// core/controller.js — Master Mode Switcher

import { MODE } from "/lib/config.js";

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");
  ns.tprint(`🧠 Controller starting in '${MODE}' mode...`);

  if (MODE === "auto") {
    if (ns.fileExists("/core/auto-controller.js", "home")) {
      await ns.run("/core/auto-controller.js");
    } else {
      ns.tprint("❌ auto-controller.js not found.");
    }
  } else if (MODE === "manual") {
    if (ns.fileExists("/core/manual-controller.js", "home")) {
      await ns.run("/core/manual-controller.js");
    } else {
      ns.tprint("❌ manual-controller.js not found.");
    }
  } else {
    ns.tprint("⚠️ Invalid MODE in config. Use 'auto' or 'manual'.");
  }
}


