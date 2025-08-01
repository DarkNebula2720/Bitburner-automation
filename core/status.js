// Live metrics dashboard: core/status.js

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");
  while (true) {
    ns.clearLog();

    ns.print("=== 🧠 System Dashboard ===");
    ns.print(`Money:       ${ns.nFormat(ns.getServerMoneyAvailable("home"), "$0.0a")}`);
    ns.print(`Hacknet:     ${ns.nFormat(ns.hacknet.numNodes(), "0")} nodes`);
    ns.print(`Income/sec:  ${ns.nFormat(ns.getTotalScriptIncome()[0], "$0.0a")}`);

    const sleeves = ns.sleeve.getNumSleeves();
    for (let i = 0; i < sleeves; i++) {
      const s = ns.sleeve.getSleeve(i);
      ns.print(`Sleeve[${i}] Sync: ${s.sync}% | Shock: ${s.shock}`);
    }

    ns.print("Factions:    " + ns.getPlayer().factions.join(", "));

    await ns.sleep(2000);
  }
}
