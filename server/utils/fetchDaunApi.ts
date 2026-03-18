import type { H3Event } from "#imports";

const config = useRuntimeConfig();

const fetchDaunApi = async (event: H3Event) => {
  const session = await getUserSession(event);

  return $fetch.create({
    baseURL: `${config.public.daunBaseURL}/api/v2`,
    headers: { "X-API-Key": session.secure?.apiKey || "" },
  });
};

export default fetchDaunApi;
