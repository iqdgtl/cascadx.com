import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, company, date, dateFormatted, time, timezone, message, website, openedAt } = body;

    // Honeypot — if hidden "website" field is filled, it's a bot
    if (website) {
      return NextResponse.json({ success: true }); // silent reject
    }

    // Timestamp check — must take >2s to fill the form
    if (openedAt && Date.now() - openedAt < 2000) {
      return NextResponse.json({ success: true }); // silent reject
    }

    // Validate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
    }
    if (!name || name.length < 2) {
      return NextResponse.json({ success: false, error: "Name required" }, { status: 400 });
    }
    if (!date || !time) {
      return NextResponse.json({ success: false, error: "Date and time required" }, { status: 400 });
    }

    const displayDate = dateFormatted || date;

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <body style="font-family: -apple-system, sans-serif; background: #0d0f0e; color: #fafaf7; padding: 32px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #1e2423; border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 32px;">
            <h1 style="font-size: 22px; margin: 0 0 8px; color: #fafaf7;">New booking request</h1>
            <p style="color: #b8bcb6; margin: 0 0 24px;">Someone just booked a call via the CascadX site.</p>
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;" />
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #7a8178; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Email</td><td style="padding: 8px 0; color: #fafaf7;">${email}</td></tr>
              <tr><td style="padding: 8px 0; color: #7a8178; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Name</td><td style="padding: 8px 0; color: #fafaf7;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #7a8178; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Company</td><td style="padding: 8px 0; color: #fafaf7;">${company || "—"}</td></tr>
              <tr><td style="padding: 8px 0; color: #7a8178; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Date</td><td style="padding: 8px 0; color: #fafaf7;">${displayDate}</td></tr>
              <tr><td style="padding: 8px 0; color: #7a8178; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Time</td><td style="padding: 8px 0; color: #fafaf7;">${time}</td></tr>
              <tr><td style="padding: 8px 0; color: #7a8178; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Timezone</td><td style="padding: 8px 0; color: #fafaf7;">${timezone}</td></tr>
              <tr><td style="padding: 8px 0; color: #7a8178; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; vertical-align: top;">Message</td><td style="padding: 8px 0; color: #fafaf7;">${message || "—"}</td></tr>
            </table>
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;" />
            <a href="mailto:${email}?subject=Re: Your CascadX call request" style="display: inline-block; background: #d97757; color: #0d0f0e; padding: 12px 20px; border-radius: 999px; text-decoration: none; font-weight: 600;">Reply to ${name}</a>
          </div>
          <p style="text-align: center; color: #7a8178; font-size: 12px; margin-top: 24px;">CascadX · AI-Powered Payment Cascading</p>
        </body>
        </html>
      `;

      // Send notification to admin
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: process.env.RESEND_TO_EMAIL!,
        replyTo: email,
        subject: `New booking: ${name} — ${displayDate} at ${time}`,
        html: emailHtml,
      });

      // Send confirmation to user
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: "Your CascadX call request — confirmed",
        html: `<p>Hi ${name},</p><p>Thanks for booking a call! We've received your request for <strong>${displayDate}</strong> at <strong>${time}</strong> (${timezone}).</p><p>Our team will send you a calendar invite within a few hours.</p><p>If anything changes, just reply to this email.</p><p>— The CascadX team</p>`,
      });
    } else {
      // Dev fallback — log to console
      console.log("=== BOOKING REQUEST (no RESEND_API_KEY) ===");
      console.log({ email, name, company, date: displayDate, time, timezone, message });
      console.log("============================================");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ success: false, error: "Failed to send" }, { status: 500 });
  }
}
