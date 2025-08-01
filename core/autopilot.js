// Refactored: core/autopilot.js

import { getHostsWithRam, findRichestTarget, canHack } from "../lib/host-utils";

/** @param {NS} ns */
export async function main(ns) {
  const script = "/Remote/remote-runner.js";
  const action = "hack";

  const targets = ns.scan("home").filter(h => canHack(ns, h) && ns.getServerMaxMoney(h) > 0);
  const target = findRichestTarget(ns, targets);
  const rooted = getHostsWithRam(ns);
  const ramPerThread = ns.getScriptRam(script);

  for (const host of rooted) {
    const free = ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
    const threads = Math.floor(free / ramPerThread);
    if (threads > 0) {
      if (host !== ns.getHostname()) await ns.scp(script, host);
      ns.exec(script, host, threads, action, target);
      ns.tprint(`🚀 ${action} ${target} from ${host} (${threads} threads)`);
    }
  }

  ns.tprint("Autopilot execution complete.");
}
