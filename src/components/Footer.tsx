import { Bot } from 'lucide-react';
import { DiscordIcon } from '@/components/icons/DiscordIcon';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">BotStore</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <DiscordIcon className="h-5 w-5" />
              <span>Discord</span>
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 BotStore. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};