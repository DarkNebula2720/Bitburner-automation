// Refactored: core/host-manager.js

import { getAllHosts } from "../lib/host-utils";

/** @param {NS} ns */
export async function main(ns) {
  const hackingLevel = ns.getHackingLevel();
  const portsAvailable = getOpenPortCount(ns);
  const programs = getAvailablePrograms(ns);
  const hosts = getAllHosts(ns);

  for (const host of hosts) {
    if (host === "home" || ns.hasRootAccess(host)) continue;

    const requiredPorts = ns.getServerNumPortsRequired(host);
    const requiredLevel = ns.getServerRequiredHackingLevel(host);

    if (requiredPorts > portsAvailable || requiredLevel > hackingLevel) continue;

    try {
      for (const prog of programs) prog(host);
      ns.nuke(host);
      ns.tprint(`✅ Rooted ${host}`);
    } catch (err) {
      ns.tprint(`❌ Failed to root ${host}: ${err}`);
    }
  }
}

function getAvailablePrograms(ns) {
  const progs = [];
  if (ns.fileExists("BruteSSH.exe")) progs.push(ns.brutessh);
  if (ns.fileExists("FTPCrack.exe")) progs.push(ns.ftpcrack);
  if (ns.fileExists("relaySMTP.exe")) progs.push(ns.relaysmtp);
  if (ns.fileExists("HTTPWorm.exe")) progs.push(ns.httpworm);
  if (ns.fileExists("SQLInject.exe")) progs.push(ns.sqlinject);
  return progs;
}

function getOpenPortCount(ns) {
  return ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"]
    .map(p => ns.fileExists(p)).filter(Boolean).length;
}
