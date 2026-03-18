const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const certot = await readValidatedBody(event, certotSchema.parse);
  const post = certot.title + "\n\n***\n\n" + certot.story;

  const formData = new FormData();
  formData.append("content", post);

  const $fetchDaunApi = await fetchDaunApi(event);

  const { data } = await $fetchDaunApi<CreatePostResponse>("/posts", {
    method: "POST",
    body: formData,
  });

  return {
    certotUrl: `${config.public.daunBaseURL}/${data.user?.username}/${data.id}`,
  };
});
