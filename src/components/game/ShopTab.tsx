import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ShopItem, Resource } from '@/types/game';

interface ShopTabProps {
  shopItems: ShopItem[];
  resources: Resource[];
  onItemClick: (item: ShopItem) => void;
}

export default function ShopTab({ shopItems, resources, onItemClick }: ShopTabProps) {
  const rarityColors = {
    common: 'from-gray-600/30 to-card/40 border-gray-500/50',
    rare: 'from-blue-600/30 to-card/40 border-blue-500/50',
    epic: 'from-purple-600/30 to-card/40 border-purple-500/50',
    legendary: 'from-amber-600/30 to-card/40 border-amber-500/50',
  };

  return (
    <TabsContent value="shop">
      <div className="mb-6">
        <h2 className="text-3xl font-bold font-[Cinzel] mb-4 text-primary drop-shadow-[0_0_10px_rgba(155,135,245,0.4)]">
          Торговая лавка
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shopItems.map((item, index) => (
          <Card
            key={item.id}
            className={`bg-gradient-to-br backdrop-blur-md p-6 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 cursor-pointer animate-fade-in ${
              rarityColors[item.rarity]
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => onItemClick(item)}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center border-2 border-primary/50 shadow-lg shadow-primary/20">
                <Icon name={item.icon as any} size={32} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold font-[Cinzel] text-foreground mb-1">{item.name}</h3>
                <Badge
                  className={`${
                    item.rarity === 'legendary'
                      ? 'bg-amber-600'
                      : item.rarity === 'epic'
                      ? 'bg-purple-600'
                      : item.rarity === 'rare'
                      ? 'bg-blue-600'
                      : 'bg-gray-600'
                  }`}
                >
                  {item.rarity === 'legendary'
                    ? 'Легендарный'
                    : item.rarity === 'epic'
                    ? 'Эпический'
                    : item.rarity === 'rare'
                    ? 'Редкий'
                    : 'Обычный'}
                </Badge>
              </div>
            </div>

            <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/30">
              <p className="text-sm text-accent font-semibold">{item.bonus}</p>
            </div>

            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Стоимость:</p>
              <div className="flex gap-3">
                {Object.entries(item.cost).map(([resourceId, cost]) => {
                  const resource = resources.find((r) => r.id === resourceId);
                  if (!resource) return null;
                  const canAfford = resource.amount >= cost;
                  return (
                    <div key={resourceId} className="flex items-center gap-1">
                      <Icon name={resource.icon as any} size={16} style={{ color: resource.color }} />
                      <span className={`text-sm font-semibold ${canAfford ? 'text-foreground' : 'text-destructive'}`}>
                        {cost}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-bold shadow-lg shadow-primary/30">
              💰 Купить
            </Button>
          </Card>
        ))}
      </div>
    </TabsContent>
  );
}
