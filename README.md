Bitburner Modular Script Suite (v2.8.1)

A fully modular, refactored automation framework for Bitburner.

📁 Folder Structure

core/
  ├── main.js               # Central orchestrator
  ├── autopilot.js          # Hacking target launcher
  ├── faction-manager.js    # Joins and works for factions
  ├── host-manager.js       # Gains root access on servers
  ├── hacknet.js            # Upgrades and spends hashes
  ├── network-tools.js      # Scan/grep utilities
  ├── status.js             # Real-time dashboard
  └── agents/
       ├── bladeburner.js   # Bladeburner automation
       ├── gangs.js         # Gang logic and upgrades
       └── sleeve.js        # Sync/recovery/crime AI

lib/
  ├── config.js             # Global thresholds and preferences
  └── host-utils.js         # Shared host/network helpers

Remote/
  └── remote-runner.js      # Reusable hacking/share/grow script

Tasks/
  ├── backdoor.js           # Auto backdoor known servers
  └── contractor.js         # Solves contracts

🚀 Quickstart

Upload all files to your home server in Bitburner.

Run the orchestrator:

run main.js

Optional utilities:

run network-tools.js scan

run network-tools.js grep contracts

run contractor.js

⚙️ Configuration

Edit lib/config.js to change:

RAM buffer reserves

Success thresholds

Preferred factions, crime type, etc.

✅ Features

Modular architecture

Parallel hacking, faction, sleeve, gang, and hacknet management

Auto-rooting, backdooring, contract solving

Live dashboard

Centralized config file

🧠 Learning Goals

This project is built to:

Understand JS modularity

Practice automation in Bitburner

Develop code that's maintainable and expandable

Happy automating!
