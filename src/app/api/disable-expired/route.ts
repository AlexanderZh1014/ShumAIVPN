import { NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";
import { disableVpnUser } from "../../../lib/vpn";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.ADMIN_CRON_SECRET}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const expiredAccounts = await prisma.vpnAccount.findMany({
    where: {
      status: "active",
      expiresAt: {
        lt: new Date(),
      },
    },
  });

  const results = [];

  for (const account of expiredAccounts) {
    try {
      await disableVpnUser(account.vpnUsername);

      await prisma.vpnAccount.update({
        where: {
          id: account.id,
        },
        data: {
          status: "expired",
        },
      });

      results.push({
        username: account.vpnUsername,
        status: "disabled",
      });
    } catch (error) {
  console.error("Failed to disable VPN user:", account.vpnUsername, error);

  results.push({
    username: account.vpnUsername,
    status: "failed",
    error: error instanceof Error ? error.message : String(error),
  });
}
  }

  return NextResponse.json({
    checkedAt: new Date(),
    expiredCount: expiredAccounts.length,
    results,
  });
}