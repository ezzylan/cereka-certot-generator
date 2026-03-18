import { db } from "#server/db";
import { certotsTable, promptsTable } from "#server/db/schema";
import * as z from "zod";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);

  const { prompts, certot } = await readValidatedBody(
    event,
    z.object({ prompts: z.array(z.string()), certot: certotSchema }).parse,
  );

  const promptsIds = await db
    .insert(promptsTable)
    .values({ prompts, userId: session.user.id })
    .returning({ id: promptsTable.id });

  await db.insert(certotsTable).values({
    ...certot,
    promptsId: promptsIds[0]!.id,
  });
});
