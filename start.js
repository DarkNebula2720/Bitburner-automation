// start.js — Unified Startup with RAM & Cleanup Protection

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");

  const args = ns.args;
  let mode = args[0];

  // Prompt if not passed
  if (!mode) {
    const response = await ns.prompt("Choose a startup mode", {
      type: "select",
      choices: ["auto", "manual"]
    });
    mode = response;
  }

  // 💣 Kill all user scripts except this one
  ns.tprint("🧹 Cleaning up old scripts...");
  for (const proc of ns.ps("home")) {
    if (proc.pid !== ns.pid) {
      ns.kill(proc.pid);
    }
  }

  // 🚨 RAM check
  const ramTotal = ns.getServerMaxRam("home");
  const ramUsed = ns.getServerUsedRam("home");
  const ramFree = ramTotal - ramUsed;

  const reserve = 16;
  if (ramFree < reserve) {
    ns.tprint(`🛑 Not enough free RAM (${ns.nFormat(ramFree, "0.00")}GB). Need at least ${reserve}GB.`);
    return;
  }

  // 🧠 Start controller
  if (mode === "auto") {
    ns.tprint("🚀 Starting Autonomous Mode");
    ns.run("core/auto-controller.js");
  } else if (mode === "manual") {
    ns.tprint("🧑‍💻 Starting Manual Assist Mode");
    ns.run("core/manual-controller.js");
  } else {
    ns.tprint(`❌ Unknown mode: ${mode}`);
  }

  // Save selection for future restarts
  ns.write("data/mode.txt", mode, "w");
}
