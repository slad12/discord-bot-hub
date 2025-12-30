import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleDiscordCallback } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      const code = searchParams.get('code');
      const errorParam = searchParams.get('error');

      if (errorParam) {
        setError('Login cancelado ou falhou');
        setTimeout(() => navigate('/'), 3000);
        return;
      }

      if (!code) {
        setError('Código de autorização não encontrado');
        setTimeout(() => navigate('/'), 3000);
        return;
      }

      try {
        const { user, error } = await handleDiscordCallback(code);

        if (error) {
          setError(error.message);
          setTimeout(() => navigate('/'), 3000);
          return;
        }

        if (user) {
          // Redirect to store after successful login
          navigate('/store');
        }
      } catch (err) {
        setError('Erro ao processar login');
        setTimeout(() => navigate('/'), 3000);
      }
    };

    processCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <div className="text-destructive">
            <p className="text-xl font-semibold mb-2">Erro no login</p>
            <p className="text-muted-foreground">{error}</p>
            <p className="text-sm text-muted-foreground mt-4">Redirecionando...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-xl font-semibold text-foreground">Conectando com Discord...</p>
            <p className="text-muted-foreground">Aguarde enquanto processamos seu login</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
