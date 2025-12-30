import { Button } from '@/components/ui/button';
import { DiscordIcon } from '@/components/icons/DiscordIcon';
import { LogOut, Bot } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { signInWithDiscord } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const Header = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await signInWithDiscord();
    if (error) {
      toast.error('Erro ao fazer login com Discord');
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast.success('Logout realizado com sucesso');
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">BotStore</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Início
          </a>
          {user && (
            <a href="/store" className="text-muted-foreground hover:text-foreground transition-colors">
              Loja
            </a>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {loading ? (
            <div className="h-10 w-24 animate-pulse rounded-lg bg-secondary" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="h-8 w-8 rounded-full border-2 border-primary/50"
                />
                <span className="hidden sm:block text-sm font-medium text-foreground">
                  {user.global_name || user.username}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="discord"
              onClick={handleLogin}
              className="gap-2"
            >
              <DiscordIcon className="h-5 w-5" />
              Entrar com Discord
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};