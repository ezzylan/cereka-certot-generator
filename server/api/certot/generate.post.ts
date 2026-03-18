import type { GoogleLanguageModelOptions } from "@ai-sdk/google";
import { google } from "@ai-sdk/google";
import { Output, streamText } from "ai";

const systemPrompt = (posts: (string | null)[]) =>
  "You are a professional storywriter specializing in Malay short stories. You will refer Cereka posts as inspiration for your stories. Your stories will follow Cereka's storytelling style, down to the tiniest details. They will also follow Cereka's writing format exactly." +
  `\n\nHere are the Cereka posts for your reference:\n<posts>\n${posts}\n</posts>`;

const mainPrompt = (context: string, name: string, prevOutput?: Certot) =>
  "Using the context above, " +
  (prevOutput
    ? `rewrite the story in <prevOutput> tags based on the following: \n${context}\n\n<prevOutput>\n${JSON.stringify(prevOutput)}\n</prevOutput>`
    : `write a story based on the following: \n${context}`) +
  `\n\nYour story must be written only in Malay. Never write it in any other language. Use ${name} as the author's name. Do not include the hashtag in your output.`;

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);

  const { context, limit, prevOutput } = await readValidatedBody(event, inputSchema.parse);

  const $fetchDaunApi = await fetchDaunApi(event);

  const { data } = await $fetchDaunApi<SearchPostsResponse>("/posts", {
    query: { username: "cereka", limit },
  });

  const posts = data.map((post) => post.content);

  return streamText({
    model: google("gemini-3.1-flash-lite-preview"),
    output: Output.object({ schema: certotSchema }),
    system: systemPrompt(posts),
    prompt: mainPrompt(context, session.user.name, prevOutput),
    providerOptions: {
      google: {
        thinkingConfig: {
          thinkingLevel: "high",
          includeThoughts: true,
        },
      } satisfies GoogleLanguageModelOptions,
    },
  }).toTextStreamResponse();
});
