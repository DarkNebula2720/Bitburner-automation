// git-pull.js — pulls fresh modules and deletes outdated ones

/** @param {NS} ns */
export async function main(ns) {
  const repo = "https://raw.githubusercontent.com/DarkNebula2720/Bitburner-automation/main/";

  const files = [
    // core
    "main.js",
    "core/autopilot.js",
    "core/faction-manager.js",
    "core/host-manager.js",
    "core/hacknet.js",
    "core/network-tools.js",
    "core/status.js",
    // agents
    "core/agents/bladeburner.js",
    "core/agents/gangs.js",
    "core/agents/sleeve.js",
    // lib
    "lib/config.js",
    "lib/host-utils.js",
    // remote
    "Remote/remote-runner.js",
    // tasks
    "Tasks/backdoor.js",
    "Tasks/contractor.js"
  ];

  ns.tprint("🧹 Deleting stale files...");
  for (const file of files) {
    if (ns.fileExists(file)) {
      ns.rm(file);
      ns.tprint(`🗑️ Removed ${file}`);
    }
  }

  ns.tprint("⬇️ Downloading fresh files...");
  for (const file of files) {
    const url = repo + file;
    const success = await ns.wget(url, file);
    ns.tprint(`${success ? "✅" : "❌"} ${file}`);
  }

  ns.tprint("🎉 Git pull complete. All modules synced.");
}
