import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Hero } from '@/types/game';

interface HeroesTabProps {
  heroes: Hero[];
  onHeroClick: (hero: Hero) => void;
}

export default function HeroesTab({ heroes, onHeroClick }: HeroesTabProps) {
  return (
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
            onClick={() => onHeroClick(hero)}
          >
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="w-20 h-20 text-4xl border-2 border-primary/50 shadow-lg">
                <AvatarFallback className="bg-gradient-to-br from-primary/30 to-secondary/30">{hero.avatar}</AvatarFallback>
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
                  <span className="text-muted-foreground">Опыт</span>
                  <span className="text-accent font-semibold">
                    {hero.experience} / {hero.maxExperience}
                  </span>
                </div>
                <Progress value={(hero.experience / hero.maxExperience) * 100} className="h-2 bg-primary/20" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Здоровье</span>
                  <span className="text-foreground font-semibold">
                    {hero.health} / {hero.maxHealth}
                  </span>
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
  );
}
