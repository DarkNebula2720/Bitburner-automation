// core/watchdog.js — Auto-Restart & RAM Alert Daemon

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");

  const reserve = 16; // GB required minimum RAM
  let failures = 0;
  const maxFailures = 3;
  let pid = 0;

  while (true) {
    const procs = ns.ps("home");
    const alive = procs.find(p => p.filename === "core/auto-controller.js");

    // 🧠 Monitor RAM
    const ramFree = ns.getServerMaxRam("home") - ns.getServerUsedRam("home");
    if (ramFree < reserve) {
      ns.toast(`⚠️ Low RAM: ${ns.nFormat(ramFree, "0.00")}GB`, "warning", 5000);
      ns.tprint("⚠️ ALERT: Available RAM too low");
    }

    // 🧬 If auto-controller exited...
    if (!alive && pid !== 0) {
      failures++;
      ns.tprint(`💥 Auto mode crashed. Failures: ${failures}`);

      if (failures >= maxFailures) {
        ns.tprint("🧑‍💻 Switching to manual controller...");
        ns.run("core/manual-controller.js");
        ns.exit();
      }

      ns.tprint("🔁 Restarting auto-controller...");
      pid = ns.run("core/auto-controller.js");
    }

    // First run only
    if (!pid) {
      pid = ns.run("core/auto-controller.js");
    }

    await ns.sleep(10000);
  }
}
