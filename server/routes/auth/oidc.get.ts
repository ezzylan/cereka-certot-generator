const config = useRuntimeConfig();

export default defineOAuthOidcEventHandler({
  config: {
    scope: ["posts:read", "posts:write", "me:read"],
    openidConfig: {
      authorization_endpoint: `${config.public.daunBaseURL}/oauth/authorize`,
      token_endpoint: `${config.public.daunBaseURL}/api/v2/oauth/token`,
    },
  },
  async onSuccess(event, { tokens }) {
    await setUserSession(event, {
      secure: { apiKey: tokens.data.apiKey },
    });

    const $fetchDaunApi = await fetchDaunApi(event);
    const { data: user } = await $fetchDaunApi<GetCurrentUserResponse>("/me");

    await setUserSession(event, {
      user: {
        id: tokens.data.userId,
        name: user.name,
        image: user.image,
        username: user.username,
      },
    });
    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.error("OIDC OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
