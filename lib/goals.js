// lib/goals.js

const GOAL_PORT = 2;

export function queueGoal(ns, goal) {
  ns.writePort(GOAL_PORT, goal);
}

export function getGoals(ns) {
  const port = ns.getPortHandle(GOAL_PORT);
  const goals = [];
  while (!port.empty()) {
    goals.push(port.read().toString().trim().toLowerCase());
  }
  return goals;
}

export function hasGoal(ns, keyword) {
  return getGoals(ns).some(g => g.includes(keyword));
}

export function getInstallThreshold(ns) {
  const goal = getGoals(ns).find(g => g.startsWith("install after"));
  if (!goal) return null;
  const match = goal.match(/install after (\d+)/);
  return match ? parseInt(match[1]) : null;
}
