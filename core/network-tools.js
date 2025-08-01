// Refactored: core/network-tools.js — Scan & grep utilities

import { getAllHosts } from "../lib/host-utils";

/** @param {NS} ns */
export async function main(ns) {
  const [mode, pattern] = ns.args;
  const hosts = getAllHosts(ns);

  switch (mode) {
    case "scan":
      ns.tprint("📡 Network scan:");
      for (const host of hosts) {
        const info = ns.getServer(host);
        ns.tprint(`- ${host} | ${info.hasAdminRights ? "ROOT" : "NO-ROOT"} | RAM: ${info.maxRam} | Money: ${ns.nFormat(info.moneyMax, "$0.0a")}`);
      }
      break;

    case "grep":
      if (!pattern) return ns.tprint("Usage: run network-tools.js grep [pattern]");
      ns.tprint(`🔍 Grepping for \"${pattern}\"...`);
      for (const host of hosts) {
        const files = ns.ls(host);
        for (const file of files) {
          if (file.includes(pattern)) ns.tprint(`${host}: ${file}`);
        }
      }
      break;

    default:
      ns.tprint("Usage: run network-tools.js [scan|grep] [optional pattern]");
  }
}
