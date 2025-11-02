import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Resource {
  id: string;
  name: string;
  amount: number;
  icon: string;
  color: string;
}

interface Building {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  icon: string;
  description: string;
  productionRate?: { resource: string; amount: number };
  upgradeCost: { [key: string]: number };
}

interface Hero {
  id: string;
  name: string;
  level: number;
  class: string;
  avatar: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  magic: number;
  abilities: { name: string; icon: string; description: string }[];
}

interface Territory {
  id: string;
  name: string;
  status: 'conquered' | 'available' | 'locked';
  difficulty: number;
  rewards: { [key: string]: number };
  enemy: string;
}

interface BattleUnit {
  type: string;
  count: number;
  icon: string;
  attack: number;
  defense: number;
  cost: { [key: string]: number };
}

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
    },
    {
      id: 'mage',
      name: 'Элара Звёздная',
      level: 4,
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
    },
    {
      id: 'ranger',
      name: 'Торин Меткий',
      level: 3,
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

  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [isHeroDialogOpen, setIsHeroDialogOpen] = useState(false);
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const [isBattleDialogOpen, setIsBattleDialogOpen] = useState(false);

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

    setBuildings((prev) =>
      prev.map((b) => (b.id === buildingId ? { ...b, level: b.level + 1 } : b))
    );

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
    }

    setIsBattleDialogOpen(false);
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
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-card/40 backdrop-blur-md">
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
          </TabsList>

          <TabsContent value="kingdom">
            <div className="mb-6">
              <h2 className="text-3xl font-bold font-[Cinzel] mb-4 text-primary drop-shadow-[0_0_10px_rgba(155,135,245,0.4)]">
                Здания королевства
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildings.map((building, index) => (
            <Card
              key={building.id}
              className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md border-border/50 p-6 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => openBuildingDialog(building)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center border-2 border-primary/50 shadow-lg shadow-primary/20">
                  <Icon name={building.icon as any} size={32} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold font-[Cinzel] text-foreground mb-1">{building.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-accent font-bold">Уровень {building.level}</span>
                    <span className="text-xs text-muted-foreground">/ {building.maxLevel}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{building.description}</p>

              {building.productionRate && (
                <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/30">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="TrendingUp" size={16} className="text-accent" />
                    <span className="text-foreground font-semibold">
                      +{building.productionRate.amount * building.level}{' '}
                      {resources.find((r) => r.id === building.productionRate?.resource)?.name} / час
                    </span>
                  </div>
                </div>
              )}

              <Progress value={(building.level / building.maxLevel) * 100} className="mb-4 h-2" />

              <Button
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-bold shadow-lg shadow-primary/30"
                disabled={building.level >= building.maxLevel || !canAffordUpgrade(building)}
              >
                {building.level >= building.maxLevel ? '✓ Максимум' : '⬆ Улучшить'}
              </Button>
            </Card>
          ))}
            </div>
          </TabsContent>

          <TabsContent value="heroes">
            <div className="mb-6">
              <h2 className="text-3xl font-bold font-[Cinzel] mb-4 text-primary drop-shadow-[0_0_10px_rgba(155,135,245,0.4)]">
                Легендарные герои
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {heroes.map((hero, index) => (
                <Card
                  key={hero.id}
                  className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md border-border/50 p-6 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => {
                    setSelectedHero(hero);
                    setIsHeroDialogOpen(true);
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-20 h-20 text-4xl border-2 border-primary/50 shadow-lg">
                      <AvatarFallback className="bg-gradient-to-br from-primary/30 to-secondary/30">
                        {hero.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold font-[Cinzel] text-foreground mb-1">{hero.name}</h3>
                      <Badge className="bg-accent">{hero.class}</Badge>
                      <p className="text-sm text-muted-foreground mt-1">Уровень {hero.level}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Здоровье</span>
                        <span className="text-foreground font-semibold">{hero.health} / {hero.maxHealth}</span>
                      </div>
                      <Progress value={(hero.health / hero.maxHealth) * 100} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-primary/10 rounded p-2 border border-primary/30">
                        <Icon name="Sword" size={16} className="mx-auto mb-1 text-accent" />
                        <p className="text-xs text-muted-foreground">Атака</p>
                        <p className="text-sm font-bold text-foreground">{hero.attack}</p>
                      </div>
                      <div className="bg-primary/10 rounded p-2 border border-primary/30">
                        <Icon name="Shield" size={16} className="mx-auto mb-1 text-accent" />
                        <p className="text-xs text-muted-foreground">Защита</p>
                        <p className="text-sm font-bold text-foreground">{hero.defense}</p>
                      </div>
                      <div className="bg-primary/10 rounded p-2 border border-primary/30">
                        <Icon name="Sparkles" size={16} className="mx-auto mb-1 text-accent" />
                        <p className="text-xs text-muted-foreground">Магия</p>
                        <p className="text-sm font-bold text-foreground">{hero.magic}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {hero.abilities.map((ability) => (
                      <div key={ability.name} className="flex items-center gap-2 p-2 bg-secondary/20 rounded border border-secondary/30">
                        <Icon name={ability.icon as any} size={16} className="text-secondary" />
                        <span className="text-sm text-foreground font-semibold">{ability.name}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="army">
            <div className="mb-6">
              <h2 className="text-3xl font-bold font-[Cinzel] mb-4 text-primary drop-shadow-[0_0_10px_rgba(155,135,245,0.4)]">
                Управление армией
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {battleUnits.map((unit, index) => (
                <Card
                  key={unit.type}
                  className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md border-border/50 p-6 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center border-2 border-primary/50 shadow-lg shadow-primary/20">
                      <Icon name={unit.icon as any} size={32} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold font-[Cinzel] text-foreground mb-1">{unit.type}</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Icon name="Sword" size={14} className="text-accent" />
                          <span className="text-sm text-muted-foreground">{unit.attack}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Shield" size={14} className="text-accent" />
                          <span className="text-sm text-muted-foreground">{unit.defense}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-accent">{unit.count}</p>
                      <p className="text-xs text-muted-foreground">в армии</p>
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/30">
                    <p className="text-xs text-muted-foreground mb-2">Стоимость найма:</p>
                    <div className="flex gap-3">
                      {Object.entries(unit.cost).map(([resourceId, cost]) => {
                        const resource = resources.find((r) => r.id === resourceId);
                        if (!resource) return null;
                        return (
                          <div key={resourceId} className="flex items-center gap-1">
                            <Icon name={resource.icon as any} size={14} style={{ color: resource.color }} />
                            <span className="text-sm font-semibold text-foreground">{cost}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-bold shadow-lg shadow-primary/30"
                    onClick={() => trainUnit(unit.type)}
                  >
                    ⚔️ Нанять воина
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map">
            <div className="mb-6">
              <h2 className="text-3xl font-bold font-[Cinzel] mb-4 text-primary drop-shadow-[0_0_10px_rgba(155,135,245,0.4)]">
                Карта завоеваний
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {territories.map((territory, index) => (
                <Card
                  key={territory.id}
                  className={`bg-gradient-to-br backdrop-blur-md border-border/50 p-6 transition-all duration-300 animate-fade-in ${
                    territory.status === 'conquered'
                      ? 'from-green-900/30 to-card/40 border-green-500/50'
                      : territory.status === 'available'
                      ? 'from-card/80 to-card/40 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 cursor-pointer'
                      : 'from-card/40 to-card/20 opacity-50'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => {
                    if (territory.status === 'available') {
                      setSelectedTerritory(territory);
                      setIsBattleDialogOpen(true);
                    }
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center border-2 border-primary/50 shadow-lg shadow-primary/20">
                      <Icon name="MapPin" size={32} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold font-[Cinzel] text-foreground mb-1">{territory.name}</h3>
                      <div className="flex items-center gap-2">
                        {territory.status === 'conquered' && <Badge className="bg-green-600">Захвачено</Badge>}
                        {territory.status === 'available' && <Badge className="bg-accent">Доступно</Badge>}
                        {territory.status === 'locked' && <Badge className="bg-muted">Закрыто</Badge>}
                        <div className="flex gap-1">
                          {Array.from({ length: territory.difficulty }).map((_, i) => (
                            <Icon key={i} name="Flame" size={12} className="text-destructive" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    <Icon name="Skull" size={14} className="inline mr-1 text-destructive" />
                    Враг: <span className="text-foreground font-semibold">{territory.enemy}</span>
                  </p>

                  <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/30">
                    <p className="text-xs text-muted-foreground mb-2">Награды за победу:</p>
                    <div className="flex gap-3 flex-wrap">
                      {Object.entries(territory.rewards).map(([resourceId, amount]) => {
                        const resource = resources.find((r) => r.id === resourceId);
                        if (!resource) return null;
                        return (
                          <div key={resourceId} className="flex items-center gap-1">
                            <Icon name={resource.icon as any} size={16} style={{ color: resource.color }} />
                            <span className="text-sm font-semibold text-foreground">+{amount}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {territory.status === 'available' && (
                    <Button className="w-full bg-gradient-to-r from-destructive to-destructive/80 hover:from-destructive/80 hover:to-destructive/60 text-white font-bold shadow-lg shadow-destructive/30">
                      ⚔️ В бой!
                    </Button>
                  )}
                  {territory.status === 'conquered' && (
                    <Button disabled className="w-full bg-green-600/50 text-white font-bold">
                      ✓ Захвачено
                    </Button>
                  )}
                  {territory.status === 'locked' && (
                    <Button disabled className="w-full bg-muted text-muted-foreground font-bold">
                      🔒 Недоступно
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card/95 backdrop-blur-xl border-border">
          {selectedBuilding && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-[Cinzel] text-primary flex items-center gap-3">
                  <Icon name={selectedBuilding.icon as any} size={32} />
                  {selectedBuilding.name}
                </DialogTitle>
                <DialogDescription className="text-base">{selectedBuilding.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Текущий уровень:</span>
                  <span className="text-2xl font-bold text-accent">
                    {selectedBuilding.level} / {selectedBuilding.maxLevel}
                  </span>
                </div>

                {selectedBuilding.level < selectedBuilding.maxLevel && (
                  <>
                    <div className="border-t border-border pt-4">
                      <h4 className="font-semibold mb-3 text-foreground">Стоимость улучшения:</h4>
                      <div className="space-y-2">
                        {Object.entries(selectedBuilding.upgradeCost).map(([resourceId, cost]) => {
                          const resource = resources.find((r) => r.id === resourceId);
                          if (!resource) return null;
                          const canAfford = resource.amount >= cost;
                          return (
                            <div key={resourceId} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Icon name={resource.icon as any} size={20} style={{ color: resource.color }} />
                                <span className={canAfford ? 'text-foreground' : 'text-destructive'}>{resource.name}</span>
                              </div>
                              <span className={`font-bold ${canAfford ? 'text-foreground' : 'text-destructive'}`}>
                                {cost} ({resource.amount})
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-bold shadow-lg mt-4"
                      onClick={() => upgradeBuilding(selectedBuilding.id)}
                      disabled={!canAffordUpgrade(selectedBuilding)}
                    >
                      {canAffordUpgrade(selectedBuilding) ? '⬆ Улучшить здание' : '❌ Недостаточно ресурсов'}
                    </Button>
                  </>
                )}

                {selectedBuilding.level >= selectedBuilding.maxLevel && (
                  <div className="text-center py-4">
                    <p className="text-accent font-bold text-lg">✨ Здание достигло максимального уровня!</p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isHeroDialogOpen} onOpenChange={setIsHeroDialogOpen}>
        <DialogContent className="bg-card/95 backdrop-blur-xl border-border max-w-md">
          {selectedHero && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-[Cinzel] text-primary flex items-center gap-3">
                  <Avatar className="w-12 h-12 text-2xl border-2 border-primary/50">
                    <AvatarFallback className="bg-gradient-to-br from-primary/30 to-secondary/30">
                      {selectedHero.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {selectedHero.name}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {selectedHero.class} • Уровень {selectedHero.level}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Здоровье</span>
                    <span className="text-foreground font-semibold">{selectedHero.health} / {selectedHero.maxHealth}</span>
                  </div>
                  <Progress value={(selectedHero.health / selectedHero.maxHealth) * 100} className="h-3" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-primary/10 rounded-lg p-3 border border-primary/30 text-center">
                    <Icon name="Sword" size={20} className="mx-auto mb-1 text-accent" />
                    <p className="text-xs text-muted-foreground">Атака</p>
                    <p className="text-lg font-bold text-foreground">{selectedHero.attack}</p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3 border border-primary/30 text-center">
                    <Icon name="Shield" size={20} className="mx-auto mb-1 text-accent" />
                    <p className="text-xs text-muted-foreground">Защита</p>
                    <p className="text-lg font-bold text-foreground">{selectedHero.defense}</p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3 border border-primary/30 text-center">
                    <Icon name="Sparkles" size={20} className="mx-auto mb-1 text-accent" />
                    <p className="text-xs text-muted-foreground">Магия</p>
                    <p className="text-lg font-bold text-foreground">{selectedHero.magic}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-semibold mb-3 text-foreground font-[Cinzel]">Способности</h4>
                  <div className="space-y-3">
                    {selectedHero.abilities.map((ability) => (
                      <div key={ability.name} className="p-3 bg-secondary/20 rounded-lg border border-secondary/30">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon name={ability.icon as any} size={18} className="text-secondary" />
                          <span className="text-sm font-bold text-foreground">{ability.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground pl-6">{ability.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isBattleDialogOpen} onOpenChange={setIsBattleDialogOpen}>
        <DialogContent className="bg-card/95 backdrop-blur-xl border-border max-w-md">
          {selectedTerritory && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-[Cinzel] text-primary flex items-center gap-3">
                  <Icon name="Swords" size={32} className="text-destructive" />
                  Битва за {selectedTerritory.name}
                </DialogTitle>
                <DialogDescription className="text-base">
                  Сложность: {Array.from({ length: selectedTerritory.difficulty }).map((_, i) => '🔥').join('')}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Skull" size={20} className="text-destructive" />
                    <span className="font-bold text-foreground">Противник: {selectedTerritory.enemy}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Победите врага, чтобы захватить территорию и получить награды
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-semibold mb-3 text-foreground font-[Cinzel]">Ваша армия</h4>
                  <div className="space-y-2">
                    {battleUnits.map((unit) => (
                      <div key={unit.type} className="flex items-center justify-between p-2 bg-card/40 rounded border border-border/50">
                        <div className="flex items-center gap-2">
                          <Icon name={unit.icon as any} size={18} className="text-primary" />
                          <span className="text-sm text-foreground">{unit.type}</span>
                        </div>
                        <span className="text-sm font-bold text-accent">{unit.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-semibold mb-3 text-foreground font-[Cinzel]">Награды за победу</h4>
                  <div className="flex gap-3 flex-wrap">
                    {Object.entries(selectedTerritory.rewards).map(([resourceId, amount]) => {
                      const resource = resources.find((r) => r.id === resourceId);
                      if (!resource) return null;
                      return (
                        <div key={resourceId} className="flex items-center gap-2 p-2 bg-primary/10 rounded border border-primary/30">
                          <Icon name={resource.icon as any} size={18} style={{ color: resource.color }} />
                          <span className="text-sm font-semibold text-foreground">+{amount}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-destructive to-destructive/80 hover:from-destructive/80 hover:to-destructive/60 text-white font-bold shadow-lg shadow-destructive/30 text-lg py-6"
                  onClick={() => conquerTerritory(selectedTerritory.id)}
                >
                  ⚔️ Атаковать!
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;