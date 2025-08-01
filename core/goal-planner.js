// core/goal-planner.js — Full Goal & Mode Planner with Auto-Launch + Conflict Handling

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");

  const goalPath = "data/goals.txt";
  const modePath = "data/mode.txt";

  // ⏪ Load current
  const currentGoals = ns.fileExists(goalPath)
    ? ns.read(goalPath).trim().split("\n").filter(Boolean)
    : [];

  const currentMode = ns.fileExists(modePath)
    ? ns.read(modePath).trim()
    : "auto";

  // Display current
  ns.tprint("📌 Current Goals: " + (currentGoals.length ? currentGoals.join(", ") : "(none)"));
  ns.tprint("🧭 Current Mode: " + currentMode);

  // 🎯 Choose new goals
  const goalOptions = [
    "install-3",
    "install-5",
    "money-1b",
    "money-5b",
    "karma",
    "gang",
    "factions",
    "contracts",
    "daedalus",
    "bitrunners",
    "bladeburner",
    "none"
  ];

  const goals = await ns.prompt("🧠 Select active goals (multi-select):", {
    type: "multiselect",
    choices: goalOptions
  });

  const installGoals = goals.filter(g => g.startsWith("install-"));
  if (installGoals.length > 1) {
    ns.tprint("❌ Conflict: Cannot use multiple install goals (e.g. 'install-3' and 'install-5').");
    return;
  }

  if (!goals || goals.includes("none") || goals.length === 0) {
    ns.write(goalPath, "", "w");
    ns.tprint("🗑️ Cleared all active goals.");
  } else {
    ns.write(goalPath, goals.join("\n"), "w");
    ns.tprint(`✅ Goals saved: [${goals.join(", ")}]`);
  }

  // 🧭 Select mode
  const mode = await ns.prompt("Choose automation mode:", {
    type: "select",
    choices: ["auto", "manual"]
  });

  ns.write(modePath, mode, "w");
  ns.tprint(`✅ Mode set: ${mode}`);

  // 🚀 Launch system
  ns.toast(`🚀 Starting in ${mode} mode...`, "info");
  ns.run("start.js", 1, mode);
}
