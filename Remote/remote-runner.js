// Unified remote script: Remote/remote-runner.js

/**
 * Generic remote executor for grow, hack, weaken, share
 * @param {NS} ns
 */
export async function main(ns) {
  const [action, target] = ns.args;
  if (!action || !target) {
    ns.tprint("Usage: run remote-runner.js [action] [target]");
    return;
  }

  switch (action) {
    case "hack":
      await ns.hack(target);
      break;
    case "grow":
      await ns.grow(target);
      break;
    case "weaken":
      await ns.weaken(target);
      break;
    case "share":
      await ns.share();
      break;
    default:
      ns.tprint(`Unknown action: ${action}`);
  }
}
