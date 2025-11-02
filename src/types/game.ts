export interface Resource {
  id: string;
  name: string;
  amount: number;
  icon: string;
  color: string;
}

export interface Building {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  icon: string;
  description: string;
  productionRate?: { resource: string; amount: number };
  upgradeCost: { [key: string]: number };
}

export interface Hero {
  id: string;
  name: string;
  level: number;
  experience: number;
  maxExperience: number;
  class: string;
  avatar: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  magic: number;
  abilities: { name: string; icon: string; description: string }[];
  equipment?: { slot: string; name: string; bonus: string }[];
}

export interface Territory {
  id: string;
  name: string;
  status: 'conquered' | 'available' | 'locked';
  difficulty: number;
  rewards: { [key: string]: number };
  enemy: string;
}

export interface BattleUnit {
  type: string;
  count: number;
  icon: string;
  attack: number;
  defense: number;
  cost: { [key: string]: number };
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: 'available' | 'in_progress' | 'completed';
  progress: number;
  maxProgress: number;
  rewards: { [key: string]: number };
  experienceReward: number;
}

export interface ShopItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'artifact';
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  bonus: string;
  cost: { [key: string]: number };
  slot: string;
}
