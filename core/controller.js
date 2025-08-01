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

// core/auto-controller.js — Autonomous AI Strategy Engine

import { SUCCESS_THRESHOLD, RAM_BUFFER } from "/lib/config.js";

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");
  ns.tprint("🤖 Auto-controller initialized...");

  while (true) {
    const stage = getGameStage(ns);
    ns.tprint(`🧭 Current stage: ${stage}`);

    if (stage === "early") {
      runIfNotRunning(ns, "core/host-manager.js");
      runIfNotRunning(ns, "core/autopilot.js");
      runIfNotRunning(ns, "Tasks/contractor.js");
    }

    if (stage === "mid") {
      runIfNotRunning(ns, "core/faction-manager.js");
      runIfNotRunning(ns, "core/hacknet.js");
      runIfNotRunning(ns, "core/agents/sleeve.js");
      runIfNotRunning(ns, "core/agents/gangs.js");
    }

    if (stage === "late") {
      runIfNotRunning(ns, "core/agents/bladeburner.js");
    }

    // Always-on
    runIfNotRunning(ns, "core/status.js");

    await ns.sleep(30 * 1000);
  }
}

function getGameStage(ns) {
  const level = ns.getHackingLevel();
  const hasGangAPI = ns.gang && typeof ns.gang.inGang === "function";
  const hasSleeves = (() => {
    try {
      return ns.sleeve.getNumSleeves() > 0;
    } catch {
      return false;
    }
  })();

  if (level < 250) return "early";
  if (hasGangAPI || hasSleeves || level < 800) return "mid";
  return "late";
}

function runIfNotRunning(ns, script) {
  const running = ns.ps("home").some(p => p.filename === script);
  if (!running && ns.fileExists(script, "home")) {
    ns.run(script);
    ns.print(`🚀 Launched ${script}`);
  }
}
