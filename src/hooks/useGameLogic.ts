import { useState, Dispatch, SetStateAction } from 'react';
import { Resource, Building, Hero, Territory, BattleUnit, Quest, ShopItem } from '@/types/game';

export interface GameLogicHandlers {
  canAffordUpgrade: (building: Building) => boolean;
  upgradeBuilding: (buildingId: string) => void;
  trainUnit: (unitType: string) => void;
  conquerTerritory: (territoryId: string) => void;
  completeQuest: (questId: string) => void;
  buyItem: (itemId: string, heroId: string) => void;
}

interface UseGameLogicProps {
  resources: Resource[];
  setResources: Dispatch<SetStateAction<Resource[]>>;
  buildings: Building[];
  setBuildings: Dispatch<SetStateAction<Building[]>>;
  heroes: Hero[];
  setHeroes: Dispatch<SetStateAction<Hero[]>>;
  territories: Territory[];
  setTerritories: Dispatch<SetStateAction<Territory[]>>;
  battleUnits: BattleUnit[];
  setBattleUnits: Dispatch<SetStateAction<BattleUnit[]>>;
  quests: Quest[];
  setQuests: Dispatch<SetStateAction<Quest[]>>;
  shopItems: ShopItem[];
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  setIsBattleDialogOpen: Dispatch<SetStateAction<boolean>>;
  setIsShopDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export function useGameLogic({
  resources,
  setResources,
  buildings,
  setBuildings,
  heroes,
  setHeroes,
  territories,
  setTerritories,
  battleUnits,
  setBattleUnits,
  quests,
  setQuests,
  shopItems,
  setIsDialogOpen,
  setIsBattleDialogOpen,
  setIsShopDialogOpen,
}: UseGameLogicProps): GameLogicHandlers {
  const canAffordUpgrade = (building: Building): boolean => {
    return Object.entries(building.upgradeCost).every(([resourceId, cost]) => {
      const resource = resources.find((r) => r.id === resourceId);
      return resource && resource.amount >= cost;
    });
  };

  const upgradeBuilding = (buildingId: string) => {
    const building = buildings.find((b) => b.id === buildingId);
    if (!building || building.level >= building.maxLevel || !canAffordUpgrade(building)) return;

    setResources((prev) =>
      prev.map((resource) => {
        const cost = building.upgradeCost[resource.id] || 0;
        return { ...resource, amount: resource.amount - cost };
      })
    );

    setBuildings((prev) => prev.map((b) => (b.id === buildingId ? { ...b, level: b.level + 1 } : b)));

    setIsDialogOpen(false);
  };

  const trainUnit = (unitType: string) => {
    const unit = battleUnits.find((u) => u.type === unitType);
    if (!unit) return;

    const canAfford = Object.entries(unit.cost).every(([resourceId, cost]) => {
      const resource = resources.find((r) => r.id === resourceId);
      return resource && resource.amount >= cost;
    });

    if (canAfford) {
      setResources((prev) =>
        prev.map((resource) => {
          const cost = unit.cost[resource.id] || 0;
          return { ...resource, amount: resource.amount - cost };
        })
      );
      setBattleUnits((prev) => prev.map((u) => (u.type === unitType ? { ...u, count: u.count + 1 } : u)));
    }
  };

  const conquerTerritory = (territoryId: string) => {
    setTerritories((prev) =>
      prev.map((t) => (t.id === territoryId && t.status === 'available' ? { ...t, status: 'conquered' as const } : t))
    );

    const territory = territories.find((t) => t.id === territoryId);
    if (territory) {
      setResources((prev) =>
        prev.map((resource) => {
          const reward = territory.rewards[resource.id] || 0;
          return { ...resource, amount: resource.amount + reward };
        })
      );

      setHeroes((prev) =>
        prev.map((hero) => {
          const newExp = hero.experience + 100;
          if (newExp >= hero.maxExperience) {
            return {
              ...hero,
              level: hero.level + 1,
              experience: newExp - hero.maxExperience,
              maxExperience: hero.maxExperience + 100,
              attack: hero.attack + 5,
              defense: hero.defense + 3,
              magic: hero.magic + 4,
            };
          }
          return { ...hero, experience: newExp };
        })
      );

      setQuests((prev) => prev.map((q) => (q.id === '1' ? { ...q, progress: Math.min(q.progress + 1, q.maxProgress) } : q)));
    }

    setIsBattleDialogOpen(false);
  };

  const completeQuest = (questId: string) => {
    const quest = quests.find((q) => q.id === questId);
    if (!quest || quest.progress < quest.maxProgress) return;

    setResources((prev) =>
      prev.map((resource) => {
        const reward = quest.rewards[resource.id] || 0;
        return { ...resource, amount: resource.amount + reward };
      })
    );

    setHeroes((prev) =>
      prev.map((hero) => {
        const newExp = hero.experience + quest.experienceReward;
        if (newExp >= hero.maxExperience) {
          return {
            ...hero,
            level: hero.level + 1,
            experience: newExp - hero.maxExperience,
            maxExperience: hero.maxExperience + 100,
            attack: hero.attack + 5,
            defense: hero.defense + 3,
            magic: hero.magic + 4,
          };
        }
        return { ...hero, experience: newExp };
      })
    );

    setQuests((prev) => prev.map((q) => (q.id === questId ? { ...q, status: 'completed' as const } : q)));
  };

  const buyItem = (itemId: string, heroId: string) => {
    const item = shopItems.find((i) => i.id === itemId);
    if (!item) return;

    const canAfford = Object.entries(item.cost).every(([resourceId, cost]) => {
      const resource = resources.find((r) => r.id === resourceId);
      return resource && resource.amount >= cost;
    });

    if (canAfford) {
      setResources((prev) =>
        prev.map((resource) => {
          const cost = item.cost[resource.id] || 0;
          return { ...resource, amount: resource.amount - cost };
        })
      );

      setHeroes((prev) =>
        prev.map((hero) =>
          hero.id === heroId
            ? {
                ...hero,
                equipment: [...(hero.equipment || []), { slot: item.slot, name: item.name, bonus: item.bonus }],
              }
            : hero
        )
      );

      setIsShopDialogOpen(false);
    }
  };

  return {
    canAffordUpgrade,
    upgradeBuilding,
    trainUnit,
    conquerTerritory,
    completeQuest,
    buyItem,
  };
}
