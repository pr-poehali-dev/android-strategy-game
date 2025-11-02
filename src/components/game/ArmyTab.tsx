import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { TabsContent } from '@/components/ui/tabs';
import { BattleUnit, Resource } from '@/types/game';

interface ArmyTabProps {
  battleUnits: BattleUnit[];
  resources: Resource[];
  onTrainUnit: (unitType: string) => void;
}

export default function ArmyTab({ battleUnits, resources, onTrainUnit }: ArmyTabProps) {
  return (
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
              onClick={() => onTrainUnit(unit.type)}
            >
              ⚔️ Нанять воина
            </Button>
          </Card>
        ))}
      </div>
    </TabsContent>
  );
}
