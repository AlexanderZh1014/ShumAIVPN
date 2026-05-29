import { NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";
import { createVpnUser } from "../../../lib/vpn";

export async function GET(request: Request) {

  try {

    const { searchParams } =
      new URL(request.url);

    const token =
      searchParams.get("token");

    if (!token) {

      return NextResponse.json(
        {
          error: "Missing token",
        },
        {
          status: 400,
        }
      );
    }

    const user =
      await prisma.user.findUnique({

        where: {
          verifyToken: token,
        },

        include: {
          vpnAccount: true,
        },
      });

    if (!user) {

      return NextResponse.json(
        {
          error: "Invalid token",
        },
        {
          status: 400,
        }
      );
    }

    if (
      user.emailVerified &&
      user.vpnAccount
    ) {

      return NextResponse.redirect(
        new URL(
          "/login",
          process.env.APP_URL
        )
      );
    }

    const vpnUsername =
      user.email
        .split("@")[0]
        .replace(
          /[^a-zA-Z0-9]/g,
          "_"
        )
        .toLowerCase();

    const vpnPassword =
      Math.random()
        .toString(36)
        .slice(-10);

    await createVpnUser(
      vpnUsername,
      vpnPassword
    );

    await prisma.user.update({

      where: {
        id: user.id,
      },

      data: {

        emailVerified: true,

        verifyToken: null,

        vpnAccount: {

          create: {

            vpnUsername,

            vpnPassword,

            server:
              "vpn763499306.softether.net",

            secret:
              "your_pre_shared_key",

            status:
              "active",
          },
        },
      },
    });

    return NextResponse.redirect(
      new URL(
        "/login",
        process.env.APP_URL
      )
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Email verification failed",
      },
      {
        status: 500,
      }
    );
  }
}