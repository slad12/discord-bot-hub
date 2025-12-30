import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DISCORD_CLIENT_ID = Deno.env.get('DISCORD_CLIENT_ID')!;
const DISCORD_CLIENT_SECRET = Deno.env.get('DISCORD_CLIENT_SECRET')!;
const DISCORD_API_URL = 'https://discord.com/api/v10';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action');
    
    console.log('Discord auth action:', action);

    // Step 1: Generate OAuth URL
    if (action === 'login') {
      const redirectUri = url.searchParams.get('redirect_uri');
      
      if (!redirectUri) {
        throw new Error('redirect_uri is required');
      }

      const params = new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'identify email',
      });

      const discordAuthUrl = `https://discord.com/oauth2/authorize?${params.toString()}`;
      
      console.log('Generated Discord auth URL');
      
      return new Response(JSON.stringify({ url: discordAuthUrl }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Step 2: Exchange code for token and get user info
    if (action === 'callback') {
      const { code, redirect_uri } = await req.json();
      
      if (!code || !redirect_uri) {
        throw new Error('code and redirect_uri are required');
      }

      console.log('Exchanging code for token...');

      // Exchange code for access token
      const tokenResponse = await fetch(`${DISCORD_API_URL}/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: DISCORD_CLIENT_ID,
          client_secret: DISCORD_CLIENT_SECRET,
          grant_type: 'authorization_code',
          code,
          redirect_uri,
        }),
      });

      if (!tokenResponse.ok) {
        const error = await tokenResponse.text();
        console.error('Token exchange error:', error);
        throw new Error(`Failed to exchange code: ${error}`);
      }

      const tokenData = await tokenResponse.json();
      console.log('Token obtained successfully');

      // Get user info from Discord
      const userResponse = await fetch(`${DISCORD_API_URL}/users/@me`, {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      });

      if (!userResponse.ok) {
        const error = await userResponse.text();
        console.error('User fetch error:', error);
        throw new Error(`Failed to fetch user: ${error}`);
      }

      const discordUser = await userResponse.json();
      console.log('Discord user fetched:', discordUser.username);

      // Return user data
      const user = {
        id: discordUser.id,
        username: discordUser.username,
        email: discordUser.email,
        avatar: discordUser.avatar 
          ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
          : `https://cdn.discordapp.com/embed/avatars/${parseInt(discordUser.discriminator || '0') % 5}.png`,
        discriminator: discordUser.discriminator,
        global_name: discordUser.global_name,
      };

      return new Response(JSON.stringify({ user, access_token: tokenData.access_token }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Discord auth error:', errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
