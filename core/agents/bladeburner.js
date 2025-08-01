// Refactored: core/agents/bladeburner.js

/** @param {NS} ns */
export async function main(ns) {
  if (!ns.bladeburner.inBladeburner()) {
    ns.tprint("🛑 Not in Bladeburner division.");
    return;
  }

  const actions = ns.bladeburner.getActionNames("general");
  const contracts = ns.bladeburner.getContractNames();

  // Basic loop — prioritize contracts with lowest difficulty
  for (const name of contracts) {
    const count = ns.bladeburner.getActionCountRemaining("contract", name);
    const [successChance] = ns.bladeburner.getActionEstimatedSuccessChance("contract", name);

    if (count > 0 && successChance > 0.8) {
      ns.bladeburner.startAction("contract", name);
      ns.tprint(`🗡 Running contract: ${name}`);
      return;
    }
  }

  // Fallback: training
  ns.bladeburner.startAction("general", "Training");
  ns.tprint("📚 No suitable contract found. Training...");
}
