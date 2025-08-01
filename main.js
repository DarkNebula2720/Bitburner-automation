// main.js — Always resume last known mode

/** @param {NS} ns */
export async function main(ns) {
  let mode = "auto";
  if (ns.fileExists("data/mode.txt")) {
    mode = ns.read("data/mode.txt").trim();
  }
  ns.run("start.js", 1, mode);
}
