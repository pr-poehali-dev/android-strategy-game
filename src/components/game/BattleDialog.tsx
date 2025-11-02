import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Territory, BattleUnit, Resource } from '@/types/game';

interface BattleDialogProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  territory: Territory | null;
  battleUnits: BattleUnit[];
  resources: Resource[];
  onConquer: (territoryId: string) => void;
}

export default function BattleDialog({ isOpen, onClose, territory, battleUnits, resources, onConquer }: BattleDialogProps) {
  if (!territory) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card/95 backdrop-blur-xl border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-[Cinzel] text-primary flex items-center gap-3">
            <Icon name="Swords" size={32} className="text-destructive" />
            Битва за {territory.name}
          </DialogTitle>
          <DialogDescription className="text-base">
            Сложность: {Array.from({ length: territory.difficulty }).map(() => '🔥').join('')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/30">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Skull" size={20} className="text-destructive" />
              <span className="font-bold text-foreground">Противник: {territory.enemy}</span>
            </div>
            <p className="text-sm text-muted-foreground">Победите врага, чтобы захватить территорию и получить награды</p>
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
              {Object.entries(territory.rewards).map(([resourceId, amount]) => {
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
            onClick={() => onConquer(territory.id)}
          >
            ⚔️ Атаковать!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
