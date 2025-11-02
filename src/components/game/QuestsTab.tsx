import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Quest, Resource } from '@/types/game';

interface QuestsTabProps {
  quests: Quest[];
  resources: Resource[];
  onCompleteQuest: (questId: string) => void;
}

export default function QuestsTab({ quests, resources, onCompleteQuest }: QuestsTabProps) {
  return (
    <TabsContent value="quests">
      <div className="mb-6">
        <h2 className="text-3xl font-bold font-[Cinzel] mb-4 text-primary drop-shadow-[0_0_10px_rgba(155,135,245,0.4)]">
          Задания королевства
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quests.map((quest, index) => (
          <Card
            key={quest.id}
            className={`bg-gradient-to-br backdrop-blur-md border-border/50 p-6 transition-all duration-300 animate-fade-in ${
              quest.status === 'completed'
                ? 'from-green-900/30 to-card/40 border-green-500/50'
                : 'from-card/80 to-card/40 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center border-2 border-primary/50 shadow-lg shadow-primary/20">
                <Icon name={quest.icon as any} size={32} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold font-[Cinzel] text-foreground mb-1">{quest.title}</h3>
                {quest.status === 'completed' && <Badge className="bg-green-600">Завершён</Badge>}
                {quest.status === 'in_progress' && <Badge className="bg-accent">В процессе</Badge>}
                {quest.status === 'available' && <Badge className="bg-muted">Доступен</Badge>}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{quest.description}</p>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Прогресс</span>
                <span className="text-foreground font-semibold">
                  {quest.progress} / {quest.maxProgress}
                </span>
              </div>
              <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-2" />
            </div>

            <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/30">
              <p className="text-xs text-muted-foreground mb-2">Награды:</p>
              <div className="flex gap-3 flex-wrap items-center">
                {Object.entries(quest.rewards).map(([resourceId, amount]) => {
                  const resource = resources.find((r) => r.id === resourceId);
                  if (!resource) return null;
                  return (
                    <div key={resourceId} className="flex items-center gap-1">
                      <Icon name={resource.icon as any} size={16} style={{ color: resource.color }} />
                      <span className="text-sm font-semibold text-foreground">+{amount}</span>
                    </div>
                  );
                })}
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={16} className="text-accent" />
                  <span className="text-sm font-semibold text-foreground">+{quest.experienceReward} опыта</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-bold shadow-lg shadow-primary/30"
              disabled={quest.progress < quest.maxProgress || quest.status === 'completed'}
              onClick={() => onCompleteQuest(quest.id)}
            >
              {quest.status === 'completed'
                ? '✓ Выполнен'
                : quest.progress >= quest.maxProgress
                ? '🎁 Получить награду'
                : '⏳ В процессе'}
            </Button>
          </Card>
        ))}
      </div>
    </TabsContent>
  );
}
