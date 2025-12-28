import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BotCard } from '@/components/BotCard';
import { bots } from '@/data/bots';
import { useAuth } from '@/hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import { Loader2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const Store = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const filteredBots = bots.filter(
    (bot) =>
      bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Loja de Bots | BotStore</title>
        <meta name="description" content="Explore nossa coleção completa de bots premium para Discord." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 pb-24 pt-24">
          <div className="mb-12">
            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Bem-vindo, {user.user_metadata?.full_name?.split(' ')[0] || 'usuário'}!
            </h1>
            <p className="text-muted-foreground">
              Explore nossa coleção completa de bots premium para Discord.
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar bots..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Bots Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBots.map((bot, index) => (
              <div
                key={bot.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <BotCard bot={bot} />
              </div>
            ))}
          </div>

          {filteredBots.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                Nenhum bot encontrado para "{searchTerm}"
              </p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Store;