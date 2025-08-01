// core/status.js — Real-Time Status Dashboard

import { getGoals, getInstallThreshold } from "/lib/goals.js";

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");

  while (true) {
    ns.clearLog();
    ns.print("📊 Bitburner AI — Status Panel");
    ns.print("──────────────────────────────");

    const money = ns.getServerMoneyAvailable("home");
    const stage = getGameStage(ns);
    ns.print(`🧭 Stage: ${stage}`);
    ns.print(`💰 Money: ${ns.nFormat(money, "$0.00a")}`);

    const augInfo = getAugmentStatus(ns);
    ns.print(`🧬 Augments Ready: ${augInfo.ready} | Owned: ${augInfo.owned}`);
    
    const installGoal = getInstallThreshold(ns);
    if (installGoal !== null) {
      ns.print(`🎯 Goal: Install after ${installGoal}`);
    }

    const goals = getGoals(ns);
    if (goals.length > 0) {
      ns.print("📌 Active Goals:");
      for (const g of goals) ns.print(`- ${g}`);
    } else {
      ns.print("📌 No queued goals.");
    }

    await ns.sleep(3000);
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

function getAugmentStatus(ns) {
  try {
    const owned = ns.singularity.getOwnedAugmentations(true).length;
    const factions = ns.getPlayer().factions;
    const pending = factions.flatMap(f =>
      ns.singularity.getAugmentationsFromFaction(f).filter(a =>
        !ns.singularity.getOwnedAugmentations(true).includes(a)
      )
    );
    return { ready: pending.length, owned };
  } catch {
    return { ready: 0, owned: 0 };
  }
}
