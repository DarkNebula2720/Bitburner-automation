// main.js — Central orchestrator

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
      const module = await import(mod);
      if (typeof module.shouldRun === "function" && !module.shouldRun(ns)) {
        ns.tprint(`⚠️ Skipped ${mod}: conditions not met.`);
        continue;
      }

      ns.tprint(`🚀 Launching ${mod}`);
      ns.run(mod);
    } catch (e) {
      ns.tprint(`❌ Failed to launch ${mod}: ${e}`);
    }
  }

  ns.tprint("✅ All eligible automation modules launched.");
}
