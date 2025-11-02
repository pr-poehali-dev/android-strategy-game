import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Territory, Resource } from '@/types/game';

interface MapTabProps {
  territories: Territory[];
  resources: Resource[];
  onTerritoryClick: (territory: Territory) => void;
}

export default function MapTab({ territories, resources, onTerritoryClick }: MapTabProps) {
  return (
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
                onTerritoryClick(territory);
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
  );
}
