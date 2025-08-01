// Refactored: core/faction-manager.js

/** @param {NS} ns */
export async function main(ns) {
  const factions = ns.getPlayer().factions;
  const preferredFactions = ["NiteSec", "Netburners", "Tian Di Hui", "CyberSec"];
  const workTypes = ["hacking", "security", "field"];

  for (const faction of factions) {
    if (!ns.singularity.checkFactionInvitations().includes(faction)) continue;

    ns.tprint(`🎖 Working for ${faction}`);
    for (const type of workTypes) {
      if (ns.singularity.workForFaction(faction, type, false)) {
        ns.tprint(`🛠 Started ${type} work for ${faction}`);
        return;
      }
    }
  }

  // Fallback: apply to preferred factions
  for (const invite of ns.singularity.checkFactionInvitations()) {
    if (preferredFactions.includes(invite)) {
      ns.singularity.joinFaction(invite);
      ns.tprint(`✅ Joined faction: ${invite}`);
    }
  }

  ns.tprint("Faction management complete.");
}
