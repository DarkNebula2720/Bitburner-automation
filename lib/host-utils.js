/**
 * Host-related utility functions
 * Used for scanning, analyzing, and managing servers
 * @param {NS} ns
 */
export function getAllHosts(ns, root = "home") {
  const seen = new Set();
  const stack = [root];
  while (stack.length) {
    const current = stack.pop();
    if (seen.has(current)) continue;
    seen.add(current);
    for (const neighbor of ns.scan(current)) {
      if (!seen.has(neighbor)) stack.push(neighbor);
    }
  }
  return [...seen];
}

export function getRootedHosts(ns) {
  return getAllHosts(ns).filter(h => ns.hasRootAccess(h));
}

export function getHostsWithRam(ns, minRam = 2) {
  return getRootedHosts(ns).filter(h => ns.getServerMaxRam(h) >= minRam);
}

export function findWeakestTarget(ns, targets) {
  return targets.reduce((a, b) =>
    ns.getServerSecurityLevel(a) < ns.getServerSecurityLevel(b) ? a : b
  );
}

export function findRichestTarget(ns, targets) {
  return targets.reduce((a, b) =>
    ns.getServerMaxMoney(a) > ns.getServerMaxMoney(b) ? a : b
  );
}

export function canHack(ns, host) {
  return ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(host);
}

export function formatMoney(ns, n) {
  return ns.nFormat(n, "$0.00a");
}

export function formatTime(ns, ms) {
  return ns.tFormat(ms);
}
