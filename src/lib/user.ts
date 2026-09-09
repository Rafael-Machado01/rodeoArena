import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function getCurrentUser() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  return user;
}
