// Refactored: Tasks/backdoor.js

import { getAllHosts } from "../lib/host-utils";

/** @param {NS} ns */
export async function main(ns) {
  const allHosts = getAllHosts(ns);
  const backdoorable = allHosts.filter(host => {
    const server = ns.getServer(host);
    return (
      !server.purchasedByPlayer &&
      server.backdoorInstalled === false &&
      ns.hasRootAccess(host) &&
      ns.getServerRequiredHackingLevel(host) <= ns.getHackingLevel()
    );
  });

  for (const host of backdoorable) {
    try {
      ns.tprint(`Attempting backdoor on ${host}...`);
      await ns.singularity.connect(host);
      await ns.singularity.installBackdoor();
      ns.tprint(`✅ Backdoor installed: ${host}`);
      await ns.singularity.connect("home");
    } catch (err) {
      ns.tprint(`❌ Failed on ${host}: ${err}`);
      await ns.singularity.connect("home");
    }
  }

  ns.tprint("All reachable backdoor targets processed.");
}
