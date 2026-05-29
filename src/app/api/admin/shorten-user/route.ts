import { NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import { setVpnUserExpiration } from "../../../../lib/vpn";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.ADMIN_CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { username, days } = await request.json();

  if (!username || !days) {
    return NextResponse.json(
      { error: "Missing username or days" },
      { status: 400 }
    );
  }

  const account = await prisma.vpnAccount.findUnique({
    where: {
      vpnUsername: username,
    },
  });

  if (!account) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const currentExpiresAt =
    account.expiresAt && account.expiresAt > new Date()
      ? account.expiresAt
      : new Date();

  const expiresAt = new Date(
    currentExpiresAt.getTime() - Number(days) * 24 * 60 * 60 * 1000
  );

  await setVpnUserExpiration(username, expiresAt);

  await prisma.vpnAccount.update({
    where: {
      vpnUsername: username,
    },
    data: {
      expiresAt,
      status: expiresAt < new Date() ? "expired" : "active",
    },
  });

  return NextResponse.json({
    message: "User shortened",
    username,
    expiresAt,
  });
}