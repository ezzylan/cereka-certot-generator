import { db } from "#server/db";
import { usersTable } from "#server/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { username } = await readValidatedBody(event, authSchema.parse);

  const fetchedUsers = await db.select().from(usersTable).where(eq(usersTable.username, username));
  const user = fetchedUsers[0];

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }

  await setUserSession(event, {
    user: {
      id: user.id,
      name: user.name,
      image: user.image,
      username: user.username,
    },
    secure: { apiKey: user.apiKey },
  });
});
