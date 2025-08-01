// Shared configuration: lib/config.js

export const config = {
  ramBuffer: 8, // GB to reserve on each host
  hack: {
    minSuccessChance: 0.8
  },
  sleeves: {
    shockThreshold: 50,
    syncThreshold: 100,
    preferredCrime: "Mug"
  },
  gang: {
    equipmentCostLimit: 10_000_000
  },
  bladeburner: {
    minSuccessChance: 0.8
  },
  factions: {
    preferred: ["NiteSec", "Netburners", "Tian Di Hui", "CyberSec"]
  }
};
