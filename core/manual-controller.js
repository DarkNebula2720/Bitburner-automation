// core/manual-controller.js — Manual Assist Mode

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");
  ns.tprint("🧑‍💻 Manual Assistant Online. Listening for goals...");

  const port = ns.getPortHandle(1); // Use Port 1 for commands

  while (true) {
    if (!port.empty()) {
      const command = port.read().toString().trim().toLowerCase();
      ns.tprint(`📨 Received command: "${command}"`);

      if (command.includes("money") || command === "farm") {
        ns.tprint("💰 Launching autopilot for income...");
        runIfNotRunning(ns, "core/autopilot.js");
      }

      else if (command.includes("contracts")) {
        ns.tprint("📜 Launching contract solver...");
        runIfNotRunning(ns, "Tasks/contractor.js");
      }

      else if (command.includes("faction")) {
        ns.tprint("🏛️ Launching faction manager...");
        runIfNotRunning(ns, "core/faction-manager.js");
      }

      else if (command.includes("status")) {
        runIfNotRunning(ns, "core/status.js");
      }

      else if (command.includes("gang")) {
        runIfNotRunning(ns, "core/agents/gangs.js");
      }

      else if (command.includes("sleeve")) {
        runIfNotRunning(ns, "core/agents/sleeve.js");
      }

      else {
        ns.tprint(`❓ Unknown command: "${command}"`);
      }
    }

    await ns.sleep(1000);
  }
}

function runIfNotRunning(ns, script) {
  const running = ns.ps("home").some(p => p.filename === script);
  if (!running && ns.fileExists(script)) {
    ns.run(script);
    ns.print(`🚀 Launched ${script}`);
  }
}
