// start.js — Unified Entry Point for Mode Selection

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");

  const args = ns.args;
  let mode = args[0];

  if (!mode) {
    const response = await ns.prompt("Choose a startup mode", {
      type: "select",
      choices: ["auto", "manual"]
    });
    mode = response;
  }

  if (mode === "auto") {
    ns.tprint("🚀 Starting Autonomous Mode");
    ns.run("core/auto-controller.js");
  } else if (mode === "manual") {
    ns.tprint("🧑‍💻 Starting Manual Assist Mode");
    ns.run("core/manual-controller.js");
  } else {
    ns.tprint(`❌ Unknown mode: ${mode}`);
  }

  // Save for restarts
  ns.write("data/mode.txt", mode, "w");
}
