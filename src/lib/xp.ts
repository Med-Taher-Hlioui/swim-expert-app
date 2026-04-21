// THE XP ECONOMY CONFIGURATION
export const XP_REWARDS = {
  WATCH_VIDEO: 10,
  GENERATE_STRATEGY: 20,
  LOG_MANUAL: 100,
  COMPLETE_AI_SESSION: 250,
  WEEKLY_STREAK: 500,
  FUN_MODE: 50 // This was likely the missing piece!
};

export const BADGES = [
  { 
    id: 'splash', 
    name: 'Splash', 
    xpRequired: 100, 
    icon: '💧', 
    desc: 'The journey begins with one splash.' 
  },
  { 
    id: 'current', 
    name: 'Current', 
    xpRequired: 1000, 
    icon: '🌊', 
    desc: 'You are starting to move the water.' 
  },
  { 
    id: 'torpedo', 
    name: 'Torpedo', 
    xpRequired: 5000, 
    icon: '🚀', 
    desc: 'Unmatched speed in the sprint lanes.' 
  },
  { 
    id: 'submarine', 
    name: 'SUBMARINE', 
    xpRequired: 15000, 
    icon: '🔱', 
    desc: 'Ultimate Elite. Michael Phelps status achieved.' 
  }
];

// Helper to calculate level based on 500XP increments
export const calculateLevel = (totalXp: number): number => {
  return Math.floor(totalXp / 500) + 1;
};

// Helper to find which badges are unlocked
export const getUnlockedBadges = (totalXp: number) => {
  return BADGES.filter(badge => totalXp >= badge.xpRequired);
};