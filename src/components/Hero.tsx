import { Button } from '@/components/ui/button';
import { DiscordIcon } from '@/components/icons/DiscordIcon';
import { signInWithDiscord } from '@/lib/auth';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Bot } from 'lucide-react';

export const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await signInWithDiscord();
    if (error) {
      toast.error('Erro ao fazer login com Discord');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-primary/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(235 86% 65% / 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(235 86% 65% / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>A melhor loja de bots do Discord</span>
          </div>
        </div>

        <h1 className="animate-slide-up mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Potencialize seu servidor
          <br />
          <span className="text-gradient">com nossos bots</span>
        </h1>

        <p className="animate-slide-up mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl" style={{ animationDelay: '0.1s' }}>
          Descubra bots premium para moderação, música, estatísticas e muito mais. 
          Transforme seu servidor Discord em uma experiência incrível.
        </p>

        <div className="animate-slide-up flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '0.2s' }}>
          {user ? (
            <Button
              variant="discord"
              size="xl"
              onClick={() => navigate('/store')}
              className="group gap-2"
            >
              Acessar Loja
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          ) : (
            <Button
              variant="discord"
              size="xl"
              onClick={handleLogin}
              className="gap-3"
            >
              <DiscordIcon className="h-6 w-6" />
              Entrar com Discord
            </Button>
          )}
          
          <Button
            variant="outline"
            size="xl"
            onClick={() => document.getElementById('featured-bots')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver Bots
          </Button>
        </div>

        {/* Stats */}
        <div className="animate-slide-up mt-20 grid grid-cols-2 gap-8 md:grid-cols-4" style={{ animationDelay: '0.3s' }}>
          {[
            { value: '50+', label: 'Bots Disponíveis' },
            { value: '100K+', label: 'Servidores Ativos' },
            { value: '99.9%', label: 'Uptime' },
            { value: '24/7', label: 'Suporte' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-bold text-foreground md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating bot icons */}
      <div className="absolute left-10 top-1/3 hidden lg:block animate-float">
        <div className="rounded-2xl border border-border bg-card/50 p-4 backdrop-blur-sm">
          <Bot className="h-8 w-8 text-primary" />
        </div>
      </div>
      <div className="absolute right-10 top-2/3 hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
        <div className="rounded-2xl border border-border bg-card/50 p-4 backdrop-blur-sm">
          <Bot className="h-8 w-8 text-primary" />
        </div>
      </div>
    </section>
  );
};