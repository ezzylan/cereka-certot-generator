import { db } from "#server/db";
import { certotsTable, promptsTable } from "#server/db/schema";
import { eq } from "drizzle-orm";
import * as z from "zod";

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedQuery(
    event,
    z.object({ id: z.coerce.number().optional() }).parse,
  );

  const getCertots = id ? await db.select().from(certotsTable).where(eq(certotsTable.id, id)) : [];
  const certot = getCertots[0];

  const getPrompts = certot
    ? await db
        .select({ prompts: promptsTable.prompts })
        .from(promptsTable)
        .where(eq(promptsTable.id, certot.promptsId))
    : [];

  return {
    certot: certot ? { title: certot.title, story: certot.story } : undefined,
    prompts: getPrompts[0]?.prompts,
  };
});
