// core/goal-planner.js — Goal + Mode Selector GUI Tool

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");

  const goalPath = "data/goals.txt";
  const modePath = "data/mode.txt";

  // ⏪ Load existing goals
  let currentGoals = [];
  if (ns.fileExists(goalPath)) {
    currentGoals = ns.read(goalPath).trim().split("\n").filter(Boolean);
  }

  let currentMode = "auto";
  if (ns.fileExists(modePath)) {
    currentMode = ns.read(modePath).trim();
  }

  // 🧠 Show current state
  ns.tprint("📌 Current Goals: " + (currentGoals.length ? currentGoals.join(", ") : "(none)"));
  ns.tprint("🧭 Current Mode: " + currentMode);

  // 🎯 Select goals
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

  const selectedGoals = await ns.prompt("🧠 Select active goals (multi-select):", {
    type: "multiselect",
    choices: goalOptions
  });

  if (!selectedGoals || selectedGoals.includes("none") || selectedGoals.length === 0) {
    ns.write(goalPath, "", "w");
    ns.tprint("🗑️ Cleared all goals.");
  } else {
    ns.write(goalPath, selectedGoals.join("\n"), "w");
    ns.tprint(`✅ Goals updated: [${selectedGoals.join(", ")}]`);
  }

  // ⚙️ Select mode
  const newMode = await ns.prompt("🧭 Choose operational mode:", {
    type: "select",
    choices: ["auto", "manual"]
  });

  ns.write(modePath, newMode, "w");
  ns.tprint(`✅ Mode updated: ${newMode}`);
}
