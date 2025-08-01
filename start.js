// start.js — Unified Startup with RAM & Cleanup Protection

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");

  const args = ns.args;
  let mode = args[0];

  // Prompt mode if not passed
  if (!mode || (mode !== "auto" && mode !== "manual")) {
    const selection = await ns.prompt("Choose a startup mode", {
      type: "select",
      choices: ["auto", "manual"]
    });
    mode = selection;
  }

  // 🧹 Kill all scripts except this one
  ns.tprint("🧹 Cleaning up running scripts...");
  for (const proc of ns.ps("home")) {
    if (proc.pid !== ns.pid) {
      ns.kill(proc.pid);
    }
  }

  // 🚨 RAM safety check
  const ramTotal = ns.getServerMaxRam("home");
  const ramUsed = ns.getServerUsedRam("home");
  const ramFree = ramTotal - ramUsed;
  const reserve = 16;

  if (ramFree < reserve) {
    ns.tprint(`🛑 Not enough free RAM (${ns.nFormat(ramFree, "0.00")}GB). Minimum required: ${reserve}GB.`);
    return;
  }

  // 🧠 Start controller or watchdog
  if (mode === "auto") {
    ns.tprint("🚀 Launching Autonomous Watchdog...");
    ns.run("core/watchdog.js");
  } else if (mode === "manual") {
    ns.tprint("🧑‍💻 Launching Manual Assistant...");
    ns.run("core/manual-controller.js");
  } else {
    ns.tprint(`❌ Unknown mode: "${mode}"`);
    return;
  }

  // Save mode to disk
  try {
    ns.write("data/mode.txt", mode, "w");
  } catch {
    ns.write("mode.txt", mode, "w"); // fallback
  }
}
