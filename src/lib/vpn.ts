import { execFile } from "child_process";
import { promisify } from "util";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import os from "os";

const execFileAsync = promisify(execFile);

export async function createVpnUser(username: string, password: string) {
  const vpncmdPath = "/mnt/c/Windows/System32/vpncmd.exe";

  const serverPassword = process.env.SOFTETHER_ADMIN_PASSWORD;
  const hubName = process.env.SOFTETHER_HUB || "HOMEVPN";

  if (!serverPassword) {
    throw new Error("Missing SOFTETHER_ADMIN_PASSWORD");
  }

  const commandFilePath = path.join(
    os.tmpdir(),
    `softether-${username}-${Date.now()}.txt`
  );

  const commands = [
    `Hub ${hubName}`,
    `UserCreate ${username} /GROUP:none /REALNAME:none /NOTE:none`,
    `UserPasswordSet ${username} /PASSWORD:${password}`,
  ].join("\n");

  await writeFile(commandFilePath, commands, "utf8");

  try {
    await execFileAsync(vpncmdPath, [
      "localhost",
      "/SERVER",
      `/PASSWORD:${serverPassword}`,
      `/IN:${commandFilePath}`,
    ]);
  } finally {
    await unlink(commandFilePath).catch(() => {});
  }
}

export async function disableVpnUser(username: string) {
  const vpncmdPath = "/mnt/c/Windows/System32/vpncmd.exe";

  const serverPassword = process.env.SOFTETHER_ADMIN_PASSWORD;
  const hubName = process.env.SOFTETHER_HUB || "HOMEVPN";

  if (!serverPassword) {
    throw new Error("Missing SOFTETHER_ADMIN_PASSWORD");
  }

  const commandFilePath = path.join(
    os.tmpdir(),
    `softether-disable-${username}-${Date.now()}.txt`
  );

const commands = [
  `Hub ${hubName}`,
  `UserExpiresSet ${username} /EXPIRES:"2000/01/01 00:00:00"`,
].join("\n");

  await writeFile(commandFilePath, commands, "utf8");

  try {
    await execFileAsync(vpncmdPath, [
      "localhost",
      "/SERVER",
      `/PASSWORD:${serverPassword}`,
      `/IN:${commandFilePath}`,
    ]);
  } finally {
    await unlink(commandFilePath).catch(() => {});
  }
}


export async function setVpnUserExpiration(
  username: string,
  expiresAt: Date | null
) {
  const vpncmdPath = "/mnt/c/Windows/System32/vpncmd.exe";

  const serverPassword = process.env.SOFTETHER_ADMIN_PASSWORD;
  const hubName = process.env.SOFTETHER_HUB || "HOMEVPN";

  if (!serverPassword) {
    throw new Error("Missing SOFTETHER_ADMIN_PASSWORD");
  }

  const commandFilePath = path.join(
    os.tmpdir(),
    `softether-expire-${username}-${Date.now()}.txt`
  );

  const expiresValue = expiresAt
    ? `"${expiresAt.getFullYear()}/${String(expiresAt.getMonth() + 1).padStart(2, "0")}/${String(expiresAt.getDate()).padStart(2, "0")} ${String(expiresAt.getHours()).padStart(2, "0")}:${String(expiresAt.getMinutes()).padStart(2, "0")}:${String(expiresAt.getSeconds()).padStart(2, "0")}"`
    : "none";

  const commands = [
    `Hub ${hubName}`,
    `UserExpiresSet ${username} /EXPIRES:${expiresValue}`,
  ].join("\n");

  await writeFile(commandFilePath, commands, "utf8");

  try {
    await execFileAsync(vpncmdPath, [
      "localhost",
      "/SERVER",
      `/PASSWORD:${serverPassword}`,
      `/IN:${commandFilePath}`,
    ]);
  } finally {
    await unlink(commandFilePath).catch(() => {});
  }
}