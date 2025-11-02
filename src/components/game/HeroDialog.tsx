import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Hero } from '@/types/game';

interface HeroDialogProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  hero: Hero | null;
}

export default function HeroDialog({ isOpen, onClose, hero }: HeroDialogProps) {
  if (!hero) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card/95 backdrop-blur-xl border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-[Cinzel] text-primary flex items-center gap-3">
            <Avatar className="w-12 h-12 text-2xl border-2 border-primary/50">
              <AvatarFallback className="bg-gradient-to-br from-primary/30 to-secondary/30">{hero.avatar}</AvatarFallback>
            </Avatar>
            {hero.name}
          </DialogTitle>
          <DialogDescription className="text-base">
            {hero.class} • Уровень {hero.level}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Опыт</span>
              <span className="text-accent font-semibold">
                {hero.experience} / {hero.maxExperience}
              </span>
            </div>
            <Progress value={(hero.experience / hero.maxExperience) * 100} className="h-3 bg-primary/20" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Здоровье</span>
              <span className="text-foreground font-semibold">
                {hero.health} / {hero.maxHealth}
              </span>
            </div>
            <Progress value={(hero.health / hero.maxHealth) * 100} className="h-3" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-primary/10 rounded-lg p-3 border border-primary/30 text-center">
              <Icon name="Sword" size={20} className="mx-auto mb-1 text-accent" />
              <p className="text-xs text-muted-foreground">Атака</p>
              <p className="text-lg font-bold text-foreground">{hero.attack}</p>
            </div>
            <div className="bg-primary/10 rounded-lg p-3 border border-primary/30 text-center">
              <Icon name="Shield" size={20} className="mx-auto mb-1 text-accent" />
              <p className="text-xs text-muted-foreground">Защита</p>
              <p className="text-lg font-bold text-foreground">{hero.defense}</p>
            </div>
            <div className="bg-primary/10 rounded-lg p-3 border border-primary/30 text-center">
              <Icon name="Sparkles" size={20} className="mx-auto mb-1 text-accent" />
              <p className="text-xs text-muted-foreground">Магия</p>
              <p className="text-lg font-bold text-foreground">{hero.magic}</p>
            </div>
          </div>

          {hero.equipment && hero.equipment.length > 0 && (
            <div className="border-t border-border pt-4">
              <h4 className="font-semibold mb-3 text-foreground font-[Cinzel]">Экипировка</h4>
              <div className="space-y-2">
                {hero.equipment.map((item, idx) => (
                  <div key={idx} className="p-2 bg-accent/10 rounded border border-accent/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">{item.name}</span>
                      <span className="text-xs text-accent">{item.bonus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-border pt-4">
            <h4 className="font-semibold mb-3 text-foreground font-[Cinzel]">Способности</h4>
            <div className="space-y-3">
              {hero.abilities.map((ability) => (
                <div key={ability.name} className="p-3 bg-secondary/20 rounded-lg border border-secondary/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name={ability.icon as any} size={18} className="text-secondary" />
                    <span className="text-sm font-bold text-foreground">{ability.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6">{ability.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
