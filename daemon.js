// Refactored daemon.js: modular orchestrator with scheduling logic

import {
  getHostsWithRam,
  getRootedHosts,
  getAllHosts,
  findRichestTarget,
  canHack
} from "./lib/host-utils";

/** @param {NS} ns */
export async function main(ns) {
  const scriptName = "/Remote/hack-target.js";
  const ramPerThread = ns.getScriptRam(scriptName);
  const rootedHosts = getHostsWithRam(ns);
  const targets = getAllHosts(ns).filter(h => canHack(ns, h) && ns.getServerMaxMoney(h) > 0);
  const target = findRichestTarget(ns, targets);

  for (const host of rootedHosts) {
    const maxRam = ns.getServerMaxRam(host);
    const usedRam = ns.getServerUsedRam(host);
    const freeRam = maxRam - usedRam;
    const threads = Math.floor(freeRam / ramPerThread);

    if (threads > 0 && target) {
      if (host !== ns.getHostname()) await ns.scp(scriptName, host);
      ns.exec(scriptName, host, threads, target);
      ns.tprint(`Executing ${scriptName} on ${host} targeting ${target} (${threads} threads)`);
    }
  }

  ns.tprint("Daemon orchestration complete.");
}
