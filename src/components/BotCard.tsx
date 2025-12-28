import { Bot } from '@/data/bots';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Server } from 'lucide-react';

interface BotCardProps {
  bot: Bot;
}

export const BotCard = ({ bot }: BotCardProps) => {
  const IconComponent = bot.icon;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 card-hover">
      {bot.popular && (
        <Badge className="absolute right-4 top-4 bg-primary text-primary-foreground">
          Popular
        </Badge>
      )}

      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
        <IconComponent className="h-7 w-7" />
      </div>

      <div className="mb-1 flex items-center gap-2">
        <h3 className="text-xl font-bold text-foreground">{bot.name}</h3>
        <Badge variant="outline" className="text-xs text-muted-foreground">
          {bot.category}
        </Badge>
      </div>

      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
        {bot.description}
      </p>

      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Server className="h-4 w-4" />
        <span>{bot.servers} servidores</span>
      </div>

      <div className="mb-6 flex-1">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Recursos
        </p>
        <ul className="space-y-1.5">
          {bot.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-foreground">
              <Check className="h-3.5 w-3.5 text-success" />
              {feature}
            </li>
          ))}
          {bot.features.length > 3 && (
            <li className="text-xs text-muted-foreground">
              +{bot.features.length - 3} recursos
            </li>
          )}
        </ul>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="text-lg font-bold text-foreground">{bot.price}</p>
        </div>
        <Button variant="discord" size="sm">
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
};