# Bitburner Automation Suite (v2.8.1)

A modular, maintainable, and performance-optimized automation framework for Bitburner.

---

## 📁 Directory Layout

```
core/
├── main.js                # Launches all automation modules
├── autopilot.js           # Launches hacking targets
├── faction-manager.js     # Manages factions and work
├── host-manager.js        # Root access to all servers
├── hacknet.js             # Upgrades nodes and spends hashes
├── network-tools.js       # Scan + grep
├── status.js              # Live dashboard monitor
└── agents/
    ├── bladeburner.js     # Bladeburner ops manager
    ├── gangs.js           # Gang tasking & equipping
    └── sleeve.js          # Sleeve AI manager

lib/
├── config.js              # Configurable thresholds and preferences
└── host-utils.js          # Host scanning and RAM helpers

Remote/
└── remote-runner.js       # Single script to hack/grow/weaken/share

Tasks/
├── backdoor.js            # Backdoors eligible rooted hosts
└── contractor.js          # Auto solves contracts (with built-in logic)
```

---

## 🚀 Quickstart

1. Pull the repo files using:
```js
run git-pull.js
```

2. Launch the orchestrator:
```js
run main.js
```

3. Optional tools:
```js
run network-tools.js scan
run contractor.js
run status.js
```

---

## ⚙️ Configuration

Edit `lib/config.js` to control:
- RAM buffer per host
- Preferred factions & crime types
- Bladeburner/gang/sleeve thresholds
- Hack success chance requirements

---

## ✅ Features

- Central orchestrator
- Modular subsystem automation
- Smart RAM/thread usage
- Fully configurable via `lib/config.js`
- Live dashboard
- Extensible contract solvers
- Remote runner script abstraction

---

## 🧠 Learning-Focused Design

This repo demonstrates:
- Clean modular JavaScript structure
- Bitburner API best practices
- Progressive automation layering
- Maintainability and clarity

---

Made for manual or GitHub workflows.

Happy automating!
