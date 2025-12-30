import { supabase } from "@/integrations/supabase/client";

export interface DiscordUser {
  id: string;
  username: string;
  email: string | null;
  avatar: string;
  discriminator: string;
  global_name: string | null;
}

const STORAGE_KEY = 'discord_user';
const TOKEN_KEY = 'discord_token';

export const signInWithDiscord = async () => {
  const redirectUri = `${window.location.origin}/auth/callback`;
  
  const { data, error } = await supabase.functions.invoke('discord-auth', {
    body: null,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Use GET with query params
  const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/discord-auth?action=login&redirect_uri=${encodeURIComponent(redirectUri)}`;
  
  const response = await fetch(functionUrl);
  const result = await response.json();
  
  if (result.error) {
    return { data: null, error: new Error(result.error) };
  }
  
  // Redirect to Discord OAuth
  window.location.href = result.url;
  return { data: result, error: null };
};

export const handleDiscordCallback = async (code: string) => {
  const redirectUri = `${window.location.origin}/auth/callback`;
  
  const { data, error } = await supabase.functions.invoke('discord-auth', {
    body: { code, redirect_uri: redirectUri },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add action query param
  const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/discord-auth?action=callback`;
  
  const response = await fetch(functionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code, redirect_uri: redirectUri }),
  });
  
  const result = await response.json();
  
  if (result.error) {
    return { user: null, error: new Error(result.error) };
  }
  
  // Store user in localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(result.user));
  localStorage.setItem(TOKEN_KEY, result.access_token);
  
  return { user: result.user as DiscordUser, error: null };
};

export const signOut = async () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(TOKEN_KEY);
  return { error: null };
};

export const getStoredUser = (): DiscordUser | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as DiscordUser;
    } catch {
      return null;
    }
  }
  return null;
};

export const getStoredToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};
