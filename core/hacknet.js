// Refactored: core/hacknet.js

/** @param {NS} ns */
export async function main(ns) {
  upgradeNodes(ns);
  spendHashes(ns);
  ns.tprint("🧠 Hacknet optimization complete.");
}

function upgradeNodes(ns) {
  const nodes = ns.hacknet.numNodes();
  for (let i = 0; i < nodes; i++) {
    while (ns.hacknet.getLevelUpgradeCost(i) < 1e6) ns.hacknet.upgradeLevel(i);
    while (ns.hacknet.getRamUpgradeCost(i) < 1e6) ns.hacknet.upgradeRam(i);
    while (ns.hacknet.getCoreUpgradeCost(i) < 1e6) ns.hacknet.upgradeCore(i);
  }
}

function spendHashes(ns) {
  const options = [
    "Sell for Money",
    "Reduce Minimum Security",
    "Increase Max Money"
  ];

  for (const option of options) {
    while (ns.hacknet.spendHashes(option)) {
      ns.tprint(`💰 Used hash: ${option}`);
    }
  }
}
