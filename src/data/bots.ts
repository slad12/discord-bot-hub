import { Shield, Music, BarChart3, Gamepad2, MessageCircle, Zap } from 'lucide-react';

export interface Bot {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: typeof Shield;
  features: string[];
  price: string;
  popular?: boolean;
  servers: string;
  category: string;
}

export const bots: Bot[] = [
  {
    id: 'moderation-bot',
    name: 'ModeratorX',
    description: 'Bot avançado de moderação com auto-mod, filtros de spam e logs detalhados.',
    longDescription: 'O ModeratorX é a solução completa para manter seu servidor seguro e organizado. Com recursos avançados de auto-moderação, você pode configurar filtros personalizados, banir membros problemáticos automaticamente e manter logs detalhados de todas as ações.',
    icon: Shield,
    features: ['Auto-moderação', 'Filtro de spam', 'Logs de auditoria', 'Comandos de ban/kick', 'Sistema de warns'],
    price: 'R$ 29,90/mês',
    popular: true,
    servers: '10.000+',
    category: 'Moderação',
  },
  {
    id: 'music-bot',
    name: 'MelodyBot',
    description: 'Reproduza músicas do YouTube, Spotify e SoundCloud com qualidade premium.',
    longDescription: 'Transforme seu servidor em uma festa com o MelodyBot! Suporte para múltiplas plataformas, filas de reprodução inteligentes e efeitos de áudio para uma experiência musical incomparável.',
    icon: Music,
    features: ['YouTube, Spotify, SoundCloud', 'Filas de reprodução', 'Efeitos de áudio', 'Letras de músicas', 'Playlists salvas'],
    price: 'R$ 19,90/mês',
    servers: '25.000+',
    category: 'Música',
  },
  {
    id: 'stats-bot',
    name: 'StatsHub',
    description: 'Estatísticas detalhadas do servidor com gráficos e relatórios personalizados.',
    longDescription: 'Entenda melhor seu servidor com o StatsHub. Acompanhe o crescimento de membros, atividade de canais, e receba relatórios semanais automáticos para tomar decisões informadas.',
    icon: BarChart3,
    features: ['Gráficos de crescimento', 'Atividade de membros', 'Relatórios semanais', 'Leaderboards', 'Exportação de dados'],
    price: 'R$ 24,90/mês',
    servers: '8.000+',
    category: 'Analytics',
  },
  {
    id: 'gaming-bot',
    name: 'GameMaster',
    description: 'Mini-games, sistemas de ranking e integração com plataformas de jogos.',
    longDescription: 'Mantenha sua comunidade engajada com o GameMaster! Dezenas de mini-games, sistema de economia virtual, rankings competitivos e integração com Steam e outras plataformas.',
    icon: Gamepad2,
    features: ['Mini-games variados', 'Sistema de economia', 'Rankings e XP', 'Integração Steam', 'Torneios automáticos'],
    price: 'R$ 34,90/mês',
    popular: true,
    servers: '15.000+',
    category: 'Games',
  },
  {
    id: 'welcome-bot',
    name: 'WelcomeBot',
    description: 'Mensagens de boas-vindas personalizadas e sistema de verificação.',
    longDescription: 'Cause uma ótima primeira impressão com mensagens de boas-vindas totalmente customizáveis, imagens dinâmicas, sistema de verificação por reação e roles automáticos.',
    icon: MessageCircle,
    features: ['Mensagens customizáveis', 'Imagens dinâmicas', 'Sistema de captcha', 'Roles automáticos', 'DM de boas-vindas'],
    price: 'R$ 14,90/mês',
    servers: '30.000+',
    category: 'Utilidade',
  },
  {
    id: 'automation-bot',
    name: 'AutoFlow',
    description: 'Automação de tarefas, comandos customizados e integração com APIs.',
    longDescription: 'Automatize qualquer coisa com o AutoFlow. Crie comandos personalizados sem código, integre com APIs externas, agende mensagens e muito mais.',
    icon: Zap,
    features: ['Comandos personalizados', 'Agendamento de mensagens', 'Integração com APIs', 'Triggers automáticos', 'Webhooks'],
    price: 'R$ 39,90/mês',
    servers: '5.000+',
    category: 'Automação',
  },
];