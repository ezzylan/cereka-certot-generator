import { db } from "#server/db";
import { usersTable } from "#server/db/schema";

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
    const { data } = await $fetchDaunApi<GetCurrentUserResponse>("/me");

    const user = {
      id: tokens.data.userId,
      name: data.name,
      image: data.image,
      username: data.username,
    };

    await db.insert(usersTable).values({
      ...user,
      apiKey: tokens.data.apiKey,
    });

    await setUserSession(event, { ...user });
    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.error("OIDC OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
