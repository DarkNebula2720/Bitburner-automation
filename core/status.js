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
      ns.print(`Sleeve[${i}] Sync: ${s.sync.toFixed(1)}% | Shock: ${s.shock.toFixed(1)}%`);
    }

    const player = ns.getPlayer();
    ns.print("Factions:    " + player.factions.join(", "));
    ns.print(`Hacking:     Lv. ${player.skills.hacking}`);
    ns.print(`Karma:       ${ns.nFormat(ns.heart.break(), "0.0")}`);

    await ns.sleep(2000);
  }
}
