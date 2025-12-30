import { useState, useEffect } from 'react';
import { getStoredUser, signOut as authSignOut, DiscordUser } from '@/lib/auth';

export const useAuth = () => {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = getStoredUser();
    setUser(storedUser);
    setLoading(false);

    // Listen for storage changes (for multi-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'discord_user') {
        const newUser = e.newValue ? JSON.parse(e.newValue) : null;
        setUser(newUser);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const signOut = async () => {
    await authSignOut();
    setUser(null);
  };

  const refreshUser = () => {
    const storedUser = getStoredUser();
    setUser(storedUser);
  };

  return { user, loading, signOut, refreshUser };
};
