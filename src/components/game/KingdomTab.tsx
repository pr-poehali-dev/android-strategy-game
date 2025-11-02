import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { TabsContent } from '@/components/ui/tabs';
import { Building, Resource } from '@/types/game';

interface KingdomTabProps {
  buildings: Building[];
  resources: Resource[];
  canAffordUpgrade: (building: Building) => boolean;
  openBuildingDialog: (building: Building) => void;
}

export default function KingdomTab({ buildings, resources, canAffordUpgrade, openBuildingDialog }: KingdomTabProps) {
  return (
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
  );
}
