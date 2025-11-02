import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Building, Resource } from '@/types/game';

interface BuildingDialogProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  building: Building | null;
  resources: Resource[];
  canAffordUpgrade: (building: Building) => boolean;
  onUpgrade: (buildingId: string) => void;
}

export default function BuildingDialog({
  isOpen,
  onClose,
  building,
  resources,
  canAffordUpgrade,
  onUpgrade,
}: BuildingDialogProps) {
  if (!building) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card/95 backdrop-blur-xl border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-[Cinzel] text-primary flex items-center gap-3">
            <Icon name={building.icon as any} size={32} />
            {building.name}
          </DialogTitle>
          <DialogDescription className="text-base">{building.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Текущий уровень:</span>
            <span className="text-2xl font-bold text-accent">
              {building.level} / {building.maxLevel}
            </span>
          </div>

          {building.level < building.maxLevel && (
            <>
              <div className="border-t border-border pt-4">
                <h4 className="font-semibold mb-3 text-foreground">Стоимость улучшения:</h4>
                <div className="space-y-2">
                  {Object.entries(building.upgradeCost).map(([resourceId, cost]) => {
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
                onClick={() => onUpgrade(building.id)}
                disabled={!canAffordUpgrade(building)}
              >
                {canAffordUpgrade(building) ? '⬆ Улучшить здание' : '❌ Недостаточно ресурсов'}
              </Button>
            </>
          )}

          {building.level >= building.maxLevel && (
            <div className="text-center py-4">
              <p className="text-accent font-bold text-lg">✨ Здание достигло максимального уровня!</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
