import { bots } from '@/data/bots';
import { BotCard } from '@/components/BotCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { signInWithDiscord } from '@/lib/auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import { DiscordIcon } from '@/components/icons/DiscordIcon';

export const FeaturedBots = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const featuredBots = bots.slice(0, 3);

  const handleLogin = async () => {
    const { error } = await signInWithDiscord();
    if (error) {
      toast.error('Erro ao fazer login com Discord');
    }
  };

  return (
    <section id="featured-bots" className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Bots em Destaque
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Conheça alguns dos nossos bots mais populares. Faça login para acessar 
            a loja completa e ver todos os recursos disponíveis.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredBots.map((bot, index) => (
            <div
              key={bot.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BotCard bot={bot} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          {user ? (
            <Button
              variant="discord"
              size="lg"
              onClick={() => navigate('/store')}
              className="group gap-2"
            >
              Ver Todos os Bots
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Faça login para acessar a loja completa</span>
              </div>
              <Button
                variant="discord"
                size="lg"
                onClick={handleLogin}
                className="gap-2"
              >
                <DiscordIcon className="h-5 w-5" />
                Entrar com Discord
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};