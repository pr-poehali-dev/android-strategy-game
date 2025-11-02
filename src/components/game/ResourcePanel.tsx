import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Resource } from '@/types/game';

interface ResourcePanelProps {
  resources: Resource[];
}

export default function ResourcePanel({ resources }: ResourcePanelProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {resources.map((resource) => (
        <Card
          key={resource.id}
          className="bg-card/60 backdrop-blur-sm border-border/50 p-4 hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-primary/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${resource.color}20` }}>
              <Icon name={resource.icon as any} size={24} style={{ color: resource.color }} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{resource.name}</p>
              <p className="text-2xl font-bold" style={{ color: resource.color }}>
                {resource.amount}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
