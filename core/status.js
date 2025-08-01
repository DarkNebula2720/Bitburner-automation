// core/status.js — Real-Time Status Dashboard (Full Upgrade)

import { getGoals, getInstallThreshold } from "/lib/goals.js";

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");
  const history = [];

  while (true) {
    ns.clearLog();
    ns.print("📊 Bitburner AI — Status Panel");
    ns.print("────────────────────────────────");

    const money = ns.getServerMoneyAvailable("home");
    const stage = getGameStage(ns);
    ns.print(`🧭 Stage: ${stage}`);
    ns.print(`💰 Money: ${ns.nFormat(money, "$0.00a")}`);

    // 🔁 Track money to estimate income
    history.push({ time: Date.now(), money });
    while (history.length > 10) history.shift();
    const eta = estimateIncomeETA(history, ns);
    if (eta) ns.print(`⏱️  ETA to target: ${eta}`);

    // 🧬 Augments
    const augInfo = getAugmentStatus(ns);
    ns.print(`🧬 Augments Ready: ${augInfo.ready} | Owned: ${augInfo.owned}`);

    const installGoal = getInstallThreshold(ns);
    if (installGoal !== null) {
      ns.print(`🎯 Install After: ${installGoal} augments`);
    }

    // 📌 Goals
    const goals = getGoals(ns);
    if (goals.length > 0) {
      ns.print("📌 Active Goals:");
      for (const g of goals) ns.print(`- ${g}`);
    } else {
      ns.print("📌 No queued goals.");
    }

    // ⚙️ Running Modules
    ns.print("📦 Running Modules:");
    const running = ns.ps("home").map(p => p.filename);
    for (const script of running.sort()) {
      ns.print(`- ${script}`);
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
    const owned = ns.singularity.getOwnedAugmentations(true);
    const factions = ns.getPlayer().factions;
    const pending = factions.flatMap(f =>
      ns.singularity.getAugmentationsFromFaction(f).filter(a => !owned.includes(a))
    );
    return { ready: pending.length, owned: owned.length };
  } catch {
    return { ready: 0, owned: 0 };
  }
}

function estimateIncomeETA(history, ns) {
  if (history.length < 2) return null;
  const deltaTime = (history.at(-1).time - history[0].time) / 1000;
  const deltaMoney = history.at(-1).money - history[0].money;
  const rate = deltaMoney / deltaTime;

  if (rate < 1e4) return null;

  const goalMoney = 5e9;
  const current = history.at(-1).money;
  const remaining = goalMoney - current;
  const etaSec = remaining / rate;
  if (etaSec < 0) return "✅ Already funded";
  return `${ns.tFormat(etaSec * 1000)} @ ${ns.nFormat(rate, "$0.00a/s")}`;
}
