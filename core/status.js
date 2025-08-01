// core/status.js — Full Game-Aware Status Panel

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

    history.push({ time: Date.now(), money });
    while (history.length > 10) history.shift();
    const eta = estimateIncomeETA(history, ns);
    if (eta) ns.print(`⏱️ ETA to 5b: ${eta}`);

    const augInfo = getAugmentStatus(ns);
    ns.print(`🧬 Augments Ready: ${augInfo.ready} | Owned: ${augInfo.owned}`);

    const installGoal = getInstallThreshold(ns);
    if (installGoal !== null) {
      ns.print(`🎯 Install After: ${installGoal} augments`);
    }

    const goals = getGoals(ns);
    if (goals.length > 0) {
      ns.print("📌 Active Goals:");
      for (const g of goals) ns.print(`- ${g}`);
    } else {
      ns.print("📌 No queued goals.");
    }

    ns.print("📦 Running Modules:");
    const running = ns.ps("home").map(p => p.filename);
    for (const script of running.sort()) {
      ns.print(`- ${script}`);
    }

    // 🏛️ Faction Info
    ns.print("🏛️ Joined Factions:");
    const factions = ns.getPlayer().factions || [];
    for (const f of factions) {
      const favor = ns.singularity.getFactionFavor(f);
      const rep = ns.singularity.getFactionRep(f);
      const highlight = rep >= 25000 ? "✅" : "";
      ns.print(`- ${f.padEnd(18)} Rep: ${ns.nFormat(rep, "0.00a")} | Favor: ${Math.floor(favor)} ${highlight}`);
    }

    // 🛒 Augment Costs
    ns.print("🛒 Augments (next 5):");
    const owned = ns.singularity.getOwnedAugmentations(true);
    const augList = factions.flatMap(f =>
      ns.singularity.getAugmentationsFromFaction(f)
        .filter(a => !owned.includes(a))
    );

    const unique = [...new Set(augList)];
    const prices = unique.map(a => ({
      name: a,
      cost: ns.singularity.getAugmentationPrice(a)
    }));

    prices.sort((a, b) => b.cost - a.cost);
    for (const { name, cost } of prices.slice(0, 5)) {
      const affordable = cost <= money ? "✅" : "❌";
      ns.print(`- ${name.padEnd(25)} ${ns.nFormat(cost, "$0.00a")} ${affordable}`);
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
    const factions = ns.getPlayer().factions || [];
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
  const goal = 5e9;
  const remaining = goal - history.at(-1).money;
  const etaSec = remaining / rate;
  return etaSec < 0 ? "✅ Already funded" : `${ns.tFormat(etaSec * 1000)} @ ${ns.nFormat(rate, "$0.00a/s")}`;
}
