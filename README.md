# ShumAI VPN

ShumAI VPN is a self-hosted VPN management platform built with Next.js, Prisma, PostgreSQL, and SoftEther VPN. It provides a modern web dashboard for user registration, email verification, VPN account provisioning, subscription management, and administrative controls.

## Features

### User Management

* User registration and login
* Email verification via Resend
* Secure password authentication
* Multi-language support (English & Simplified Chinese)

### VPN Provisioning

* Automatic SoftEther VPN account creation
* L2TP/IPsec VPN support
* Automatic credential generation
* Mobile-friendly dashboard
* One-click credential copy

### Account Dashboard

* View VPN credentials
* Server information
* Shared secret display
* Account status monitoring
* VPN expiration tracking
* Quick setup instructions for:

  * iPhone / iPad
  * Windows
  * Android
  * macOS

### Administrative Panel

* View all VPN users
* Extend account validity
* Shorten account validity
* Monitor account status
* Automatic expiration management
* Bulk expiration checks

### Expiration System

* Custom account expiration dates
* Automatic VPN account disabling
* Scheduled expiration checks via cron
* SoftEther integration
* Real-time status updates

## Technology Stack

### Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* Prisma ORM
* PostgreSQL

### Infrastructure

* SoftEther VPN Server
* Resend Email API
* Cloudflare DNS

## Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── login/
│   │   ├── register/
│   │   ├── verify-email/
│   │   ├── admin/
│   │   └── me/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   ├── pricing/
│   └── admin/
│
├── components/
├── lib/
│   ├── prisma.ts
│   ├── vpn.ts
│   ├── email.ts
│   └── dictionary.ts
│
└── prisma/
    └── schema.prisma
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=
RESEND_API_KEY=
EMAIL_FROM=
APP_URL=

SOFTETHER_SERVER=
SOFTETHER_PASSWORD=
SOFTETHER_HUB=

ADMIN_CRON_SECRET=
```

## Installation

### Clone Repository

```bash
git clone https://github.com/AlexanderZh1014/ShumAIVPN.git
cd ShumAIVPN
```

### Install Dependencies

```bash
npm install
```

### Database

```bash
npx prisma migrate dev
npx prisma generate
```

### Start Development Server

```bash
npm run dev
```

Application:

```text
http://localhost:3000
```

## Production Deployment

Build:

```bash
npm run build
```

Start:

```bash
npm start
```

## Scheduled Expiration Task

Example cron job:

```bash
0 0 * * * curl -H "Authorization: Bearer YOUR_SECRET" \
http://localhost:3001/api/admin/disable-expired
```

This automatically:

1. Finds expired VPN accounts
2. Updates account status
3. Disables SoftEther access
4. Logs results

## Roadmap

### Planned Features

* Subscription billing
* Stripe integration
* PayPal integration
* Bandwidth monitoring
* Usage statistics
* Downloadable VPN profiles
* Referral system
* Multi-server support
* OpenVPN support
* WireGuard support
* Enterprise management tools

## Security

* Password hashing
* Email verification
* Admin API authentication
* SoftEther account expiration enforcement
* Server-side credential management

## License

Copyright © 2026 ShumAI LLC

All rights reserved.

## Author

**Alexander Zhang**

Founder, ShumAI LLC

Website: https://shumaivpn.com
