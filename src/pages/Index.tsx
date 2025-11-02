import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

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

  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    </div>
  );
};

export default Index;