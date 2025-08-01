// main.js — Compatible orchestrator (no dynamic imports)

/** @param {NS} ns */
export async function main(ns) {
  const modules = [
    "core/host-manager.js",
    "core/autopilot.js",
    "core/faction-manager.js",
    "core/agents/sleeve.js",
    "core/agents/gangs.js",
    "core/agents/bladeburner.js",
    "core/hacknet.js"
  ];

  for (const mod of modules) {
    if (!ns.fileExists(mod, "home")) {
      ns.tprint(`⚠️  Skipping ${mod}: file not found.`);
      continue;
    }

    try {
      ns.tprint(`🚀 Launching ${mod}`);
      ns.run(mod);
    } catch (e) {
      ns.tprint(`❌ Failed to run ${mod}: ${e}`);
    }
  }

  ns.tprint("✅ All available automation modules launched.");
}
