"use client";

import { useEffect, useState } from "react";

type VpnAccount = {
  vpnUsername: string;
  vpnPassword: string;
  server: string;
  secret: string;
  status: string;
  expiresAt: string | null;
};

type User = {
  id?: string;
  email: string;
  vpnAccount: VpnAccount | null;
};

const dictionary = {
  en: {
    logout: "Logout",
    accountDashboard: "Account Dashboard",
    welcomeTo: "Welcome to",
    loggedInAs: "Logged in as",
    vpnCredentials: "VPN Credentials",
    credentialDesc: "Use these credentials in your device VPN settings.",
    description: "Description",
    server: "Server",
    type: "Type",
    username: "Username",
    password: "Password",
    secret: "Secret",
    expiresAt: "Expires At",
    noExpiration: "No expiration",
    status: "Status",
    active: "active",
    expired: "expired",
    copy: "Copy",
    copied: "Copied!",
    copyFailed: "Copy failed",
    quickSetup: "Quick Setup",
    iphone: "iPhone / iPad",
    windows: "Windows",
    connectionNotes: "Connection Notes",
    iosStep1: "Open Settings → VPN → Add VPN Configuration.",
    iosStep2: "Select Type: L2TP.",
    iosStep3: "Enter Server, Username, Password, and Secret.",
    iosStep4: "Save and connect.",
    winStep1: "Open Settings → Network & Internet → VPN.",
    winStep2: "Add VPN → Provider: Windows built-in.",
    winStep3: "Select L2TP/IPsec with pre-shared key.",
    winStep4: "Enter your credentials and connect.",
    note1: "Use mobile data when testing from inside the same network.",
    note2: "Do not share your password or Secret.",
    note3: "If connection fails, check VPN type and Secret first.",
  },

  zh: {
    logout: "退出登录",
    accountDashboard: "账户控制台",
    welcomeTo: "欢迎使用",
    loggedInAs: "当前登录账号",
    vpnCredentials: "VPN 连接信息",
    credentialDesc: "请在设备的 VPN 设置中填写以下连接信息。",
    description: "描述",
    server: "服务器",
    type: "类型",
    username: "用户名",
    password: "密码",
    secret: "共享密钥",
    expiresAt: "到期时间",
    noExpiration: "无到期时间",
    status: "状态",
    active: "已激活",
    expired: "已过期",
    copy: "复制",
    copied: "已复制！",
    copyFailed: "复制失败",
    quickSetup: "快速设置",
    iphone: "iPhone / iPad",
    windows: "Windows",
    connectionNotes: "连接说明",
    iosStep1: "打开 设置 → VPN → 添加 VPN 配置。",
    iosStep2: "类型选择：L2TP。",
    iosStep3: "填写服务器、用户名、密码和共享密钥。",
    iosStep4: "保存并连接。",
    winStep1: "打开 设置 → 网络和 Internet → VPN。",
    winStep2: "添加 VPN → VPN 提供商选择 Windows 内置。",
    winStep3: "选择使用预共享密钥的 L2TP/IPsec。",
    winStep4: "填写你的连接信息并连接。",
    note1: "如果你在同一个家庭网络内测试，建议使用手机蜂窝数据。",
    note2: "请勿分享你的密码或共享密钥。",
    note3: "如果连接失败，请优先检查 VPN 类型和共享密钥。",
  },
};

function CopyButton({
  text,
  label,
  copiedText,
  copyText,
  copyFailedText,
}: {
  text: string;
  label: string;
  copiedText: string;
  copyText: string;
  copyFailedText: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      try {
        const textarea = document.createElement("textarea");

        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        document.execCommand("copy");

        document.body.removeChild(textarea);

        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      } catch {
        alert(copyFailedText);
      }
    }
  }

  return (
    <button
      aria-label={`${copyText} ${label}`}
      onClick={handleCopy}
      className="
        rounded-lg
        border
        border-[#ff7a1b]/30
        px-3
        py-1
        text-xs
        text-[#ffd7cd]
        hover:border-[#ff4002]
        hover:bg-[#ff4002]/10
      "
    >
      {copied ? copiedText : copyText}
    </button>
  );
}

function formatStatus(status: string, locale: "en" | "zh") {
  if (status === "active") {
    return locale === "zh" ? "已激活" : "active";
  }

  if (status === "expired") {
    return locale === "zh" ? "已过期" : "expired";
  }

  return status || "-";
}

export default function DashboardPage() {
  const [locale, setLocale] = useState<"en" | "zh">("en");
  const t = dictionary[locale];

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadLatestUser() {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        window.location.href = "/login";
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      const response = await fetch("/api/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: parsedUser.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        localStorage.removeItem("user");
        window.location.href = "/login";
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    }

    loadLatestUser();
  }, []);

  if (!user) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#0e0100]
          text-[#fffbff]
        "
      >
        Loading...
      </main>
    );
  }

  const vpn = user.vpnAccount;

  const rows = [
    [t.description, vpn?.vpnUsername || ""],
    [t.server, vpn?.server || ""],
    [t.type, "L2TP/IPsec"],
    [t.username, vpn?.vpnUsername || ""],
    [t.password, vpn?.vpnPassword || ""],
    [t.secret, "ShumAI2026"],
    [
      t.expiresAt,
      vpn?.expiresAt
        ? new Date(vpn.expiresAt).toLocaleString()
        : t.noExpiration,
    ],
    [t.status, vpn?.status || ""],
  ];

  return (
    <main
      className="
        min-h-screen
        bg-[#0e0100]
        px-6
        py-8
        text-[#fffbff]
      "
    >
      <nav
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
        "
      >
        <a
          href="/"
          className="
            text-2xl
            font-bold
            tracking-tight
          "
        >
          ShumAI
          <span className="text-[#ff4002]">VPN</span>
        </a>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => setLocale("en")}
              className={locale === "en" ? "text-white" : "text-[#cfa49a]"}
            >
              EN
            </button>

            <span className="text-[#5c2a16]">/</span>

            <button
              onClick={() => setLocale("zh")}
              className={locale === "zh" ? "text-white" : "text-[#cfa49a]"}
            >
              中文
            </button>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="
              rounded-full
              border
              border-[#ff7a1b]/30
              px-5
              py-2
              text-sm
              text-[#ffd7cd]
              hover:border-[#ff4002]
            "
          >
            {t.logout}
          </button>
        </div>
      </nav>

      <section
        className="
          relative
          mx-auto
          mt-12
          max-w-7xl
        "
      >
        <div
          className="
            absolute
            left-1/3
            top-0
            -z-10
            h-96
            w-96
            rounded-full
            bg-[#ff4002]/20
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-10
            top-40
            -z-10
            h-72
            w-72
            rounded-full
            bg-[#ff9815]/15
            blur-3xl
          "
        />

        <div>
          <div
            className="
              mb-4
              inline-flex
              rounded-full
              border
              border-[#ff7a1b]/40
              bg-[#1e0800]/80
              px-4
              py-2
              text-sm
              text-[#ffd7cd]
            "
          >
            {t.accountDashboard}
          </div>

          <h1
            className="
              text-5xl
              font-bold
              tracking-tight
            "
          >
            {t.welcomeTo}{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#ff4002]
                via-[#ff7a1b]
                to-[#ff9815]
                bg-clip-text
                text-transparent
              "
            >
              ShumAI VPN
            </span>
          </h1>

          <p
            className="
              mt-3
              text-[#ffd7cd]
            "
          >
            {t.loggedInAs} {user.email}
          </p>
        </div>

        <div
          className="
            mt-10
            grid
            gap-6
            lg:grid-cols-2
          "
        >
          <section
            className="
              rounded-3xl
              border
              border-[#ff7a1b]/20
              bg-[#1e0800]/90
              p-6
              shadow-2xl
              shadow-orange-950/30
            "
          >
            <h2
              className="
                text-2xl
                font-semibold
              "
            >
              {t.vpnCredentials}
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-[#ffd7cd]
              "
            >
              {t.credentialDesc}
            </p>

            <div
              className="
                mt-6
                space-y-5
                text-sm
              "
            >
              {rows.map(([label, value]) => {
                const isStatus = label === t.status;
                const isExpiresAt = label === t.expiresAt;
                const rawStatus = vpn?.status || "";
                const isActive = rawStatus === "active";
                const isExpired = rawStatus === "expired";

                return (
                  <div
                    key={label}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      border-b
                      border-[#ff7a1b]/10
                      pb-3
                    "
                  >
                    <div>
                      <p
                        className="
                          text-[#cfa49a]
                        "
                      >
                        {label}
                      </p>

                      <p
                        className={`
                          break-all
                          font-mono
                          flex
                          items-center
                          gap-2
                          ${
                            isStatus
                              ? isActive
                                ? "text-green-400"
                                : isExpired
                                  ? "text-yellow-400"
                                  : "text-red-400"
                              : "text-[#fffbff]"
                          }
                        `}
                      >
                        {isStatus && (
                          <span
                            className={`
                              h-2.5
                              w-2.5
                              rounded-full
                              ${
                                isActive
                                  ? "bg-green-400"
                                  : isExpired
                                    ? "bg-yellow-400"
                                    : "bg-red-400"
                              }
                            `}
                          />
                        )}

                        {isStatus ? formatStatus(rawStatus, locale) : value}
                      </p>
                    </div>

                    {!isStatus && !isExpiresAt && (
                      <CopyButton
                        text={value}
                        label={label}
                        copiedText={t.copied}
                        copyText={t.copy}
                        copyFailedText={t.copyFailed}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section
            className="
              rounded-3xl
              border
              border-[#ff7a1b]/20
              bg-[#1e0800]/90
              p-6
              shadow-2xl
              shadow-orange-950/30
            "
          >
            <h2
              className="
                text-2xl
                font-semibold
              "
            >
              {t.quickSetup}
            </h2>

            <div
              className="
                mt-6
                space-y-6
              "
            >
              <div>
                <h3
                  className="
                    font-semibold
                    text-[#fffbff]
                  "
                >
                  {t.iphone}
                </h3>

                <ol
                  className="
                    mt-3
                    list-decimal
                    space-y-2
                    pl-5
                    text-sm
                    text-[#ffd7cd]
                  "
                >
                  <li>{t.iosStep1}</li>
                  <li>{t.iosStep2}</li>
                  <li>{t.iosStep3}</li>
                  <li>{t.iosStep4}</li>
                </ol>
              </div>

              <div>
                <h3
                  className="
                    font-semibold
                    text-[#fffbff]
                  "
                >
                  {t.windows}
                </h3>

                <ol
                  className="
                    mt-3
                    list-decimal
                    space-y-2
                    pl-5
                    text-sm
                    text-[#ffd7cd]
                  "
                >
                  <li>{t.winStep1}</li>
                  <li>{t.winStep2}</li>
                  <li>{t.winStep3}</li>
                  <li>{t.winStep4}</li>
                </ol>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-[#ff7a1b]/20
                  bg-[#0e0100]/70
                  p-4
                "
              >
                <h3
                  className="
                    font-semibold
                    text-[#ff9815]
                  "
                >
                  {t.connectionNotes}
                </h3>

                <ul
                  className="
                    mt-3
                    list-disc
                    space-y-2
                    pl-5
                    text-sm
                    text-[#ffd7cd]
                  "
                >
                  <li>{t.note1}</li>
                  <li>{t.note2}</li>
                  <li>{t.note3}</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}