// Refactored: Tasks/contractor.js — Contract Finder and Solver

import { getAllHosts } from "../lib/host-utils";

/** @param {NS} ns */
export async function main(ns) {
  const servers = getAllHosts(ns);
  let contracts = [];

  for (const server of servers) {
    const files = ns.ls(server, ".cct");
    for (const file of files) {
      const type = ns.codingcontract.getContractType(file, server);
      const data = ns.codingcontract.getData(file, server);
      contracts.push({ server, file, type, data });
    }
  }

  for (const contract of contracts) {
    ns.tprint(`📄 ${contract.file} (${contract.type}) @ ${contract.server}`);
    const answer = solve(contract.type, contract.data, ns);
    if (answer != null) {
      const result = ns.codingcontract.attempt(answer, contract.file, contract.server);
      if (result) {
        ns.tprint(`✅ Solved ${contract.type} on ${contract.server}: ${result}`);
      } else {
        ns.tprint(`❌ Failed to solve ${contract.type} on ${contract.server}`);
      }
    } else {
      ns.tprint(`⚠️ No solver for ${contract.type}`);
    }
  }
}

// Extend this map with more solver functions
function solve(type, data, ns) {
  switch (type) {
    case "Find Largest Prime Factor":
      return largestPrimeFactor(data);
    case "Subarray with Maximum Sum":
      return maxSubarraySum(data);
    default:
      return null;
  }
}

function largestPrimeFactor(n) {
  let factor = 2;
  while (n > 1) {
    if (n % factor === 0) {
      n /= factor;
    } else {
      factor++;
    }
  }
  return factor;
}

function maxSubarraySum(arr) {
  let max = -Infinity, current = 0;
  for (let i = 0; i < arr.length; i++) {
    current = Math.max(arr[i], current + arr[i]);
    max = Math.max(max, current);
  }
  return max;
}
