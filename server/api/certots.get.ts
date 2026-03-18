import { db } from "#server/db";
import type { SelectCertot } from "#server/db/schema";
import { certotsTable, promptsTable } from "#server/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const selectedCertots: SelectCertot[] = [];

  const prompts = await db
    .select({ id: promptsTable.id })
    .from(promptsTable)
    .where(eq(promptsTable.userId, session.user.id));

  for (const prompt of prompts) {
    const certots = await db
      .select()
      .from(certotsTable)
      .where(eq(certotsTable.promptsId, prompt.id));

    selectedCertots.push(...certots);
  }

  return selectedCertots;
});
