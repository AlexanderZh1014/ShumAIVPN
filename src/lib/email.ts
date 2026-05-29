import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function sendVerificationEmail(
  email: string,
  token: string
) {

  const verifyUrl =
    `${process.env.APP_URL}/api/verify-email?token=${token}`;

  await resend.emails.send({

    from:
      process.env.EMAIL_FROM ||

      "ShumAI VPN <noreply@shumaivpn.com>",

    to: email,

    subject:
      "Verify your VPN account",

    html: `
      <h2>Verify your email</h2>

      <p>
        Click below to activate your VPN account:
      </p>

      <a href="${verifyUrl}">
        Verify Email
      </a>
    `,
  });
}