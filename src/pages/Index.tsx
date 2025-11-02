import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Resource, Building, Hero, Territory, BattleUnit, Quest, ShopItem } from '@/types/game';
import {
  initialResources,
  initialBuildings,
  initialHeroes,
  initialTerritories,
  initialBattleUnits,
  initialQuests,
  initialShopItems,
} from '@/data/gameData';
import { useGameLogic } from '@/hooks/useGameLogic';
import GameHeader from '@/components/game/GameHeader';
import ResourcePanel from '@/components/game/ResourcePanel';
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
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [buildings, setBuildings] = useState<Building[]>(initialBuildings);
  const [heroes, setHeroes] = useState<Hero[]>(initialHeroes);
  const [territories, setTerritories] = useState<Territory[]>(initialTerritories);
  const [battleUnits, setBattleUnits] = useState<BattleUnit[]>(initialBattleUnits);
  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const [shopItems] = useState<ShopItem[]>(initialShopItems);

  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [isHeroDialogOpen, setIsHeroDialogOpen] = useState(false);
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const [isBattleDialogOpen, setIsBattleDialogOpen] = useState(false);
  const [selectedShopItem, setSelectedShopItem] = useState<ShopItem | null>(null);
  const [isShopDialogOpen, setIsShopDialogOpen] = useState(false);

  const { canAffordUpgrade, upgradeBuilding, trainUnit, conquerTerritory, completeQuest, buyItem } = useGameLogic({
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
  });

  const openBuildingDialog = (building: Building) => {
    setSelectedBuilding(building);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0a1f] via-[#1a1035] to-[#0f0a1f] text-foreground font-[Cormorant] overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzljODdmNTIwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <GameHeader />

        <ResourcePanel resources={resources} />

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
