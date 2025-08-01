// Central orchestrator: main.js

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
    try {
      ns.tprint(`🚀 Launching ${mod}`);
      ns.run(mod);
    } catch (e) {
      ns.tprint(`❌ Failed to run ${mod}: ${e}`);
    }
  }

  ns.tprint("✅ All automation modules launched.");
}
