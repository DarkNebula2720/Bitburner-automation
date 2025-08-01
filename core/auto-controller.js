// core/auto-controller.js — Autonomous AI Strategy Engine (enhanced)

import {
  SUCCESS_THRESHOLD,
  RAM_BUFFER,
  CORE_AUGMENTS,
  FACTION_PRIORITY
} from "/lib/config.js";

import {
  getGoals,
  hasGoal,
  getInstallThreshold
} from "/lib/goals.js";

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");
  ns.tprint("🤖 Auto-controller initialized...");

  while (true) {
    const stage = getGameStage(ns);
    const money = ns.getServerMoneyAvailable("home");
    ns.tprint(`🧭 Stage: ${stage} | Money: ${format(money, ns)}`);

    if (shouldInstall(ns)) {
      ns.tprint("🧬 Install threshold reached. Triggering augmentation install...");
      if (ns.fileExists("Tasks/reserve.js")) {
        ns.run("Tasks/reserve.js");
        await ns.sleep(1000);
      }
      ns.installAugmentations("main.js");
      return;
    }

    // 🎯 Goals-driven execution
    const goals = getGoals(ns);
    if (goals.includes("karma") || goals.includes("gang")) {
      runIfNotRunning(ns, "core/agents/gangs.js");
    }
    if (goals.includes("money") || goals.includes("income")) {
      runIfNotRunning(ns, "core/autopilot.js");
    }
    if (goals.includes("factions")) {
      runIfNotRunning(ns, "core/faction-manager.js");
    }
    if (goals.includes("contracts")) {
      runIfNotRunning(ns, "Tasks/contractor.js");
    }

    // 📈 Stage-based modules
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

    runIfNotRunning(ns, "core/status.js");
    await ns.sleep(30000);
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

function shouldInstall(ns) {
  try {
    const owned = ns.singularity.getOwnedAugmentations(true);
    const playerFactions = ns.getPlayer().factions || [];
    const pending = playerFactions.flatMap(fac =>
      ns.singularity.getAugmentationsFromFaction(fac).filter(a => !owned.includes(a))
    );

    const numReady = pending.length;
    const installGoal = getInstallThreshold(ns);
    if (installGoal !== null) {
      return numReady >= installGoal;
    }

    const hasCore = CORE_AUGMENTS.some(a => owned.includes(a));
    const hasMultiple = numReady >= 2;
    const moneyReady = ns.getServerMoneyAvailable("home") >= 5e9;
    return hasCore && hasMultiple && moneyReady;
  } catch {
    return false;
  }
}

function runIfNotRunning(ns, script) {
  const running = ns.ps("home").some(p => p.filename === script);
  if (!running && ns.fileExists(script)) {
    ns.run(script);
    ns.print(`🚀 Launched ${script}`);
  }
}

function format(n, ns) {
  return ns.nFormat(n, "$0.00a");
}
