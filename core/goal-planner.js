// core/goal-planner.js — Interactive Goal Configuration Tool

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");
  const path = "data/goals.txt";

  const allOptions = [
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

  const selected = await ns.prompt("🧠 Select active goals (multi-select):", {
    type: "multiselect",
    choices: allOptions
  });

  if (!selected || selected.length === 0 || selected.includes("none")) {
    ns.write(path, "", "w");
    ns.tprint("🗑️ Cleared all active goals.");
  } else {
    ns.write(path, selected.join("\n"), "w");
    ns.tprint(`✅ Goals updated: [${selected.join(", ")}]`);
  }
}
