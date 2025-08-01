// main.js — Resume Last Selected Mode or Prompt Again

/** @param {NS} ns */
export async function main(ns) {
  let mode = "auto";
  if (ns.fileExists("data/mode.txt")) {
    mode = ns.read("data/mode.txt").trim();
  }

  ns.run("start.js", 1, mode);
}
