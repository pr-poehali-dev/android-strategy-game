import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ShopItem, Hero, Resource } from '@/types/game';

interface ShopDialogProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  item: ShopItem | null;
  heroes: Hero[];
  resources: Resource[];
  onBuyItem: (itemId: string, heroId: string) => void;
}

export default function ShopDialog({ isOpen, onClose, item, heroes, resources, onBuyItem }: ShopDialogProps) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card/95 backdrop-blur-xl border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-[Cinzel] text-primary flex items-center gap-3">
            <Icon name={item.icon as any} size={32} />
            {item.name}
          </DialogTitle>
          <DialogDescription className="text-base">
            {item.type === 'weapon' ? 'Оружие' : item.type === 'armor' ? 'Броня' : 'Артефакт'} •{' '}
            {item.rarity === 'legendary'
              ? 'Легендарный'
              : item.rarity === 'epic'
              ? 'Эпический'
              : item.rarity === 'rare'
              ? 'Редкий'
              : 'Обычный'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
            <p className="text-sm font-semibold text-accent">{item.bonus}</p>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="font-semibold mb-3 text-foreground">Стоимость:</h4>
            <div className="space-y-2">
              {Object.entries(item.cost).map(([resourceId, cost]) => {
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

          <div className="border-t border-border pt-4">
            <h4 className="font-semibold mb-3 text-foreground">Выберите героя:</h4>
            <div className="space-y-2">
              {heroes.map((hero) => (
                <Button
                  key={hero.id}
                  className="w-full justify-start bg-card/60 hover:bg-primary/20 text-foreground border border-border/50"
                  onClick={() => onBuyItem(item.id, hero.id)}
                >
                  <Avatar className="w-8 h-8 text-lg mr-2 border border-primary/50">
                    <AvatarFallback className="bg-gradient-to-br from-primary/30 to-secondary/30">{hero.avatar}</AvatarFallback>
                  </Avatar>
                  <span>
                    {hero.name} • Ур.{hero.level}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
