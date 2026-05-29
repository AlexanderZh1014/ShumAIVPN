import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0e0100] px-6 py-10 text-[#ffd7cd]">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-[#ff7a1b]/20 pt-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <Link
            href="/"
            className="flex items-center text-2xl font-bold text-[#fffbff]"
          >
            <img
              src="/ShumaiLogo.png"
              alt="ShumAI Logo"
              className="mr-3 h-12 w-10 object-contain"
            />
            ShumAI<span className="text-[#ff4002]">VPN</span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-6 text-[#ffd7cd]">
            Secure private network access powered by ShumAI. Fast onboarding,
            verified accounts, and automatic VPN provisioning.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#fffbff]">Product</h3>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/#pricing" className="hover:text-white">
              Pricing
            </Link>
            <Link href="/register" className="hover:text-white">
              Beta Access
            </Link>
            <Link href="/login" className="hover:text-white">
              Dashboard
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#fffbff]">Resources</h3>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <span>iOS Setup</span>
            <span>Windows Setup</span>
            <span>Support</span>
            <span>Connection Guide</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#fffbff]">Contact</h3>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <span>Email: partnerships@shum-ai.com</span>
            <span>Phone: 1-929-285-9968</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-4 border-t border-[#ff7a1b]/20 pt-6 text-sm text-[#cfa49a] md:flex-row">
        <div className="flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms and Conditions</span>
        </div>

        <div>© 2026 ShumAI LLC. All rights reserved.</div>
      </div>
    </footer>
  );
}