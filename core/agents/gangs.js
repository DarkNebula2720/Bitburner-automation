// core/agents/gangs.js

/** @param {NS} ns */
export async function main(ns) {
  if (!canUseGangs(ns)) {
    ns.tprint("🛑 Gang API unavailable or not in gang.");
    return;
  }

  if (!ns.gang.inGang()) {
    const factions = ns.getPlayer().factions;
    for (const faction of factions) {
      if (ns.gang.createGang(faction)) {
        ns.tprint(`✅ Created gang under ${faction}`);
        break;
      }
    }
  }

  if (!ns.gang.inGang()) return;

  const members = ns.gang.getMemberNames();
  for (const name of members) {
    const task = selectGangTask(ns, name);
    ns.gang.setMemberTask(name, task);
    ns.tprint(`👥 ${name} → ${task}`);
  }

  const equipment = ns.gang.getEquipmentNames();
  for (const name of members) {
    for (const item of equipment) {
      if (ns.gang.getEquipmentCost(item) < 10_000_000) {
        ns.gang.purchaseEquipment(name, item);
      }
    }
  }
}

function canUseGangs(ns) {
  return ns.gang && typeof ns.gang.inGang === "function";
}

function selectGangTask(ns, member) {
  const info = ns.gang.getMemberInformation(member);
  if (info.wantedLevel > 50) return "Vigilante Justice";
  if (info.str > 100 && info.def > 100) return "Territory Warfare";
  return "Train Combat";
}

/** Optional: used by main.js to check if script is allowed to run */
export function shouldRun(ns) {
  return canUseGangs(ns);
}
