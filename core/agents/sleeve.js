// core/agents/sleeve.js

/** @param {NS} ns */
export async function main(ns) {
  try {
    const count = ns.sleeve.getNumSleeves(); // Throws if not in BitNode-10 or no SF10
    for (let i = 0; i < count; i++) {
      const sleeve = ns.sleeve.getSleeve(i);
      const task = decideSleeveTask(ns, i, sleeve);
      if (task) assignSleeveTask(ns, i, task);
    }
    ns.tprint("🧬 Sleeves optimized.");
  } catch {
    ns.tprint("🛑 Sleeve API unavailable (BitNode-10 or no SF10). Skipping sleeve logic.");
  }
}

function decideSleeveTask(ns, index, sleeve) {
  if (sleeve.shock > 50) return { type: "recovery" };
  if (sleeve.sync < 100) return { type: "synchronize" };
  if (sleeve.crimeStats && sleeve.crimeStats.money > 0.5) return { type: "crime", name: "Mug" };
  return { type: "none" };
}

function assignSleeveTask(ns, i, task) {
  switch (task.type) {
    case "recovery": ns.sleeve.setToShockRecovery(i); break;
    case "synchronize": ns.sleeve.setToSynchronize(i); break;
    case "crime": ns.sleeve.setToCommitCrime(i, task.name); break;
  }
}
