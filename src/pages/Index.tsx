import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Resource, Building, Hero, Territory, BattleUnit, Quest, ShopItem } from '@/types/game';
import KingdomTab from '@/components/game/KingdomTab';
import HeroesTab from '@/components/game/HeroesTab';
import ArmyTab from '@/components/game/ArmyTab';
import MapTab from '@/components/game/MapTab';
import QuestsTab from '@/components/game/QuestsTab';
import ShopTab from '@/components/game/ShopTab';
import BuildingDialog from '@/components/game/BuildingDialog';
import HeroDialog from '@/components/game/HeroDialog';
import BattleDialog from '@/components/game/BattleDialog';
import ShopDialog from '@/components/game/ShopDialog';

const Index = () => {
  const [resources, setResources] = useState<Resource[]>([
    { id: 'gold', name: 'Золото', amount: 1000, icon: 'Coins', color: '#F59E0B' },
    { id: 'wood', name: 'Древесина', amount: 500, icon: 'Trees', color: '#84CC16' },
    { id: 'stone', name: 'Камень', amount: 300, icon: 'Mountain', color: '#6B7280' },
    { id: 'mana', name: 'Кристаллы маны', amount: 150, icon: 'Sparkles', color: '#9b87f5' },
  ]);

  const [buildings, setBuildings] = useState<Building[]>([
    {
      id: 'castle',
      name: 'Главный замок',
      level: 1,
      maxLevel: 5,
      icon: 'Castle',
      description: 'Сердце вашего королевства. Повышает лимит ресурсов и открывает новые здания.',
      upgradeCost: { gold: 500, wood: 200, stone: 300 },
    },
    {
      id: 'goldmine',
      name: 'Золотая шахта',
      level: 1,
      maxLevel: 5,
      icon: 'Pickaxe',
      description: 'Добывает золото для вашей казны.',
      productionRate: { resource: 'gold', amount: 50 },
      upgradeCost: { gold: 200, wood: 100, stone: 150 },
    },
    {
      id: 'sawmill',
      name: 'Лесопилка',
      level: 1,
      maxLevel: 5,
      icon: 'Axe',
      description: 'Производит древесину для строительства.',
      productionRate: { resource: 'wood', amount: 30 },
      upgradeCost: { gold: 150, wood: 50, stone: 100 },
    },
    {
      id: 'quarry',
      name: 'Каменоломня',
      level: 1,
      maxLevel: 5,
      icon: 'Hammer',
      description: 'Добывает камень для укрепления зданий.',
      productionRate: { resource: 'stone', amount: 20 },
      upgradeCost: { gold: 150, wood: 75, stone: 50 },
    },
    {
      id: 'tower',
      name: 'Башня магов',
      level: 1,
      maxLevel: 5,
      icon: 'Wand',
      description: 'Собирает магическую энергию из окружающего мира.',
      productionRate: { resource: 'mana', amount: 10 },
      upgradeCost: { gold: 300, wood: 100, stone: 200, mana: 50 },
    },
    {
      id: 'barracks',
      name: 'Казармы',
      level: 1,
      maxLevel: 5,
      icon: 'Swords',
      description: 'Тренирует воинов для вашей армии.',
      upgradeCost: { gold: 250, wood: 150, stone: 200 },
    },
  ]);

  const [heroes, setHeroes] = useState<Hero[]>([
    {
      id: 'warrior',
      name: 'Аларик Драконоборец',
      level: 5,
      experience: 350,
      maxExperience: 500,
      class: 'Воин',
      avatar: '⚔️',
      health: 850,
      maxHealth: 1000,
      attack: 85,
      defense: 70,
      magic: 20,
      abilities: [
        { name: 'Удар щитом', icon: 'Shield', description: 'Оглушает врага на 2 секунды' },
        { name: 'Берсерк', icon: 'Flame', description: '+50% к атаке на 10 секунд' },
      ],
      equipment: [{ slot: 'weapon', name: 'Меч драконов', bonus: '+15 атака' }],
    },
    {
      id: 'mage',
      name: 'Элара Звёздная',
      level: 4,
      experience: 280,
      maxExperience: 400,
      class: 'Маг',
      avatar: '🔮',
      health: 450,
      maxHealth: 600,
      attack: 120,
      defense: 30,
      magic: 95,
      abilities: [
        { name: 'Огненный шар', icon: 'Flame', description: 'Наносит 200 урона по области' },
        { name: 'Телепорт', icon: 'Zap', description: 'Мгновенное перемещение' },
      ],
      equipment: [],
    },
    {
      id: 'ranger',
      name: 'Торин Меткий',
      level: 3,
      experience: 150,
      maxExperience: 300,
      class: 'Следопыт',
      avatar: '🏹',
      health: 550,
      maxHealth: 700,
      attack: 95,
      defense: 50,
      magic: 40,
      abilities: [
        { name: 'Залп стрел', icon: 'Target', description: 'Стреляет по 3 целям' },
        { name: 'Ловушка', icon: 'Bug', description: 'Замедляет врагов в области' },
      ],
      equipment: [],
    },
  ]);

  const [territories, setTerritories] = useState<Territory[]>([
    { id: '1', name: 'Тёмный лес', status: 'conquered', difficulty: 1, rewards: { gold: 200, wood: 150 }, enemy: 'Гоблины' },
    { id: '2', name: 'Горный перевал', status: 'available', difficulty: 2, rewards: { gold: 350, stone: 200, mana: 50 }, enemy: 'Орки' },
    { id: '3', name: 'Руины древних', status: 'available', difficulty: 3, rewards: { gold: 500, mana: 150 }, enemy: 'Нежить' },
    { id: '4', name: 'Драконье логово', status: 'locked', difficulty: 5, rewards: { gold: 1000, mana: 500 }, enemy: 'Дракон' },
  ]);

  const [battleUnits, setBattleUnits] = useState<BattleUnit[]>([
    { type: 'Мечники', count: 20, icon: 'Sword', attack: 15, defense: 10, cost: { gold: 50, wood: 20 } },
    { type: 'Лучники', count: 15, icon: 'Crosshair', attack: 20, defense: 5, cost: { gold: 60, wood: 30 } },
    { type: 'Рыцари', count: 5, icon: 'ShieldCheck', attack: 30, defense: 25, cost: { gold: 150, stone: 50 } },
    { type: 'Маги', count: 8, icon: 'Sparkle', attack: 40, defense: 8, cost: { gold: 100, mana: 50 } },
  ]);

  const [quests, setQuests] = useState<Quest[]>([
    {
      id: '1',
      title: 'Победить 10 врагов',
      description: 'Сразитесь с врагами на карте и одержите 10 побед',
      icon: 'Swords',
      status: 'in_progress',
      progress: 3,
      maxProgress: 10,
      rewards: { gold: 500, mana: 100 },
      experienceReward: 200,
    },
    {
      id: '2',
      title: 'Улучшить 5 зданий',
      description: 'Повысьте уровень любых зданий в королевстве',
      icon: 'ArrowUp',
      status: 'in_progress',
      progress: 2,
      maxProgress: 5,
      rewards: { gold: 300, wood: 200 },
      experienceReward: 150,
    },
    {
      id: '3',
      title: 'Собрать 1000 маны',
      description: 'Накопите магическую энергию для великих заклинаний',
      icon: 'Sparkles',
      status: 'available',
      progress: 0,
      maxProgress: 1000,
      rewards: { gold: 800 },
      experienceReward: 300,
    },
  ]);

  const [shopItems, setShopItems] = useState<ShopItem[]>([
    {
      id: '1',
      name: 'Легендарный меч',
      type: 'weapon',
      icon: 'Sword',
      rarity: 'legendary',
      bonus: '+50 атака',
      cost: { gold: 1000, mana: 200 },
      slot: 'weapon',
    },
    {
      id: '2',
      name: 'Драконий щит',
      type: 'armor',
      icon: 'Shield',
      rarity: 'epic',
      bonus: '+40 защита',
      cost: { gold: 800, stone: 300 },
      slot: 'armor',
    },
    {
      id: '3',
      name: 'Кольцо силы',
      type: 'artifact',
      icon: 'Gem',
      rarity: 'rare',
      bonus: '+20 ко всем характеристикам',
      cost: { gold: 600, mana: 150 },
      slot: 'ring',
    },
    {
      id: '4',
      name: 'Магический посох',
      type: 'weapon',
      icon: 'Wand',
      rarity: 'epic',
      bonus: '+60 магия',
      cost: { gold: 900, mana: 250 },
      slot: 'weapon',
    },
    {
      id: '5',
      name: 'Амулет здоровья',
      type: 'artifact',
      icon: 'Heart',
      rarity: 'rare',
      bonus: '+200 здоровье',
      cost: { gold: 500, mana: 100 },
      slot: 'amulet',
    },
  ]);

  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [isHeroDialogOpen, setIsHeroDialogOpen] = useState(false);
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const [isBattleDialogOpen, setIsBattleDialogOpen] = useState(false);
  const [selectedShopItem, setSelectedShopItem] = useState<ShopItem | null>(null);
  const [isShopDialogOpen, setIsShopDialogOpen] = useState(false);

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

  const openBuildingDialog = (building: Building) => {
    setSelectedBuilding(building);
    setIsDialogOpen(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0a1f] via-[#1a1035] to-[#0f0a1f] text-foreground font-[Cormorant] overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzljODdmNTIwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold font-[Cinzel] bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2 drop-shadow-[0_0_20px_rgba(155,135,245,0.5)]">
            🏰 Королевство Драконов
          </h1>
          <p className="text-muted-foreground text-xl">Постройте величайшую империю</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {resources.map((resource) => (
            <Card
              key={resource.id}
              className="bg-card/60 backdrop-blur-sm border-border/50 p-4 hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${resource.color}20` }}>
                  <Icon name={resource.icon as any} size={24} style={{ color: resource.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{resource.name}</p>
                  <p className="text-2xl font-bold" style={{ color: resource.color }}>
                    {resource.amount}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="kingdom" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 bg-card/40 backdrop-blur-md">
            <TabsTrigger value="kingdom" className="data-[state=active]:bg-primary/80">
              <Icon name="Castle" size={18} className="mr-2" />
              Замок
            </TabsTrigger>
            <TabsTrigger value="heroes" className="data-[state=active]:bg-primary/80">
              <Icon name="Swords" size={18} className="mr-2" />
              Герои
            </TabsTrigger>
            <TabsTrigger value="army" className="data-[state=active]:bg-primary/80">
              <Icon name="Shield" size={18} className="mr-2" />
              Армия
            </TabsTrigger>
            <TabsTrigger value="map" className="data-[state=active]:bg-primary/80">
              <Icon name="Map" size={18} className="mr-2" />
              Карта
            </TabsTrigger>
            <TabsTrigger value="quests" className="data-[state=active]:bg-primary/80">
              <Icon name="Scroll" size={18} className="mr-2" />
              Квесты
            </TabsTrigger>
            <TabsTrigger value="shop" className="data-[state=active]:bg-primary/80">
              <Icon name="ShoppingBag" size={18} className="mr-2" />
              Магазин
            </TabsTrigger>
          </TabsList>

          <KingdomTab
            buildings={buildings}
            resources={resources}
            canAffordUpgrade={canAffordUpgrade}
            openBuildingDialog={openBuildingDialog}
          />

          <HeroesTab
            heroes={heroes}
            onHeroClick={(hero) => {
              setSelectedHero(hero);
              setIsHeroDialogOpen(true);
            }}
          />

          <ArmyTab battleUnits={battleUnits} resources={resources} onTrainUnit={trainUnit} />

          <MapTab
            territories={territories}
            resources={resources}
            onTerritoryClick={(territory) => {
              setSelectedTerritory(territory);
              setIsBattleDialogOpen(true);
            }}
          />

          <QuestsTab quests={quests} resources={resources} onCompleteQuest={completeQuest} />

          <ShopTab
            shopItems={shopItems}
            resources={resources}
            onItemClick={(item) => {
              setSelectedShopItem(item);
              setIsShopDialogOpen(true);
            }}
          />
        </Tabs>
      </div>

      <BuildingDialog
        isOpen={isDialogOpen}
        onClose={setIsDialogOpen}
        building={selectedBuilding}
        resources={resources}
        canAffordUpgrade={canAffordUpgrade}
        onUpgrade={upgradeBuilding}
      />

      <HeroDialog isOpen={isHeroDialogOpen} onClose={setIsHeroDialogOpen} hero={selectedHero} />

      <BattleDialog
        isOpen={isBattleDialogOpen}
        onClose={setIsBattleDialogOpen}
        territory={selectedTerritory}
        battleUnits={battleUnits}
        resources={resources}
        onConquer={conquerTerritory}
      />

      <ShopDialog
        isOpen={isShopDialogOpen}
        onClose={setIsShopDialogOpen}
        item={selectedShopItem}
        heroes={heroes}
        resources={resources}
        onBuyItem={buyItem}
      />
    </div>
  );
};

export default Index;
