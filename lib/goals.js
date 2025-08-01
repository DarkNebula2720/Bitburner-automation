// lib/goals.js — Persistent goals manager

const GOAL_PORT = 2;

/** Queue a goal string */
export function queueGoal(ns, goal) {
  ns.writePort(GOAL_PORT, goal);
}

/** Read and return all queued goals */
export function getGoals(ns) {
  const port = ns.getPortHandle(GOAL_PORT);
  const goals = [];
  while (!port.empty()) goals.push(port.read().toString().trim().toLowerCase());
  return goals;
}

/** Check if a goal exists */
export function hasGoal(ns, keyword) {
  return getGoals(ns).some(g => g.includes(keyword));
}
