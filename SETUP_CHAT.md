# Chat Widget — Email Booking Setup

The "Speak with us" chat widget collects demo booking requests and emails them via Resend.

## How it works

1. User clicks "Speak with us" or "Book a demo"
2. Guided 9-step flow collects: email, name, company, preferred date/time, optional notes
3. On confirm, POST to `/api/booking` → sends branded HTML email to admin + confirmation to user via Resend SDK

## Spam protection

- **Honeypot field**: hidden `website` field — if filled by a bot, silently rejected
- **Timestamp check**: form must take >2 seconds to fill — instant submissions silently rejected

## Setup (5 minutes)

### 1. Sign up for Resend

- Go to [resend.com](https://resend.com) and create a free account (3,000 emails/month free)

### 2. Add your sending domain

- In Resend dashboard → Domains → Add Domain → `cascadx.com`
- Add the DNS records Resend provides (TXT + CNAME) in your DNS provider (Cloudflare, Namecheap, etc.)
- Wait for verification (usually 5-30 minutes)

### 3. Generate an API key

- Resend dashboard → API Keys → Create API Key
- Copy the key (starts with `re_`)

### 4. Add environment variables

Create `.env.local` in the project root:

```env
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=bookings@cascadx.com
RESEND_TO_EMAIL=admin@cascadx.com
```

Also add these to Vercel (Settings → Environment Variables) for production.

### 5. Restart dev server

```bash
npm run dev
```

### 6. Test

Submit a real booking through the chat widget. Confirm:
- Admin receives branded HTML email at `admin@cascadx.com`
- User receives confirmation email at their address
- Both emails render correctly

## Development mode

Without `RESEND_API_KEY`, the API route logs booking requests to the server console instead of sending email. The chat flow still works end-to-end — you'll see the booking data in your terminal.

## Emails sent

1. **To admin** (`RESEND_TO_EMAIL`): branded dark HTML email with all booking details + "Reply to [name]" button
2. **To user** (the email they entered): simple confirmation with date/time/timezone

## Customization

| What | Where |
|------|-------|
| Recipient email | `RESEND_TO_EMAIL` env var |
| From address | `RESEND_FROM_EMAIL` env var |
| Bot messages | Text strings in `/src/components/ChatWidget.tsx` |
| Time slots | `timeSlots` array in ChatWidget (default: 09:00-17:30, 30min) |
| Business days shown | `getBusinessDays(14)` — change the `14` for more/fewer days |
| Email HTML template | `/src/app/api/booking/route.ts` |
