import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FeaturedBots } from '@/components/FeaturedBots';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>BotStore - Loja de Bots para Discord</title>
        <meta name="description" content="Descubra bots premium para Discord: moderação, música, estatísticas e muito mais. Transforme seu servidor em uma experiência incrível." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <FeaturedBots />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;