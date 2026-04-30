"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import RobotMascot from "./RobotMascot";

/* ================================================================
   Types
   ================================================================ */
type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type BotMsg = { from: "bot"; text: string; ui?: React.ReactNode };
type UserMsg = { from: "user"; text: string };
type Msg = BotMsg | UserMsg;

/* ================================================================
   Helpers
   ================================================================ */
function getBusinessDays(count: number): Date[] {
  const days: Date[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1); // start tomorrow
  while (days.length < count) {
    if (d.getDay() !== 0 && d.getDay() !== 6) days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

const timeSlots = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","12:30","13:00","13:30","14:00","14:30",
  "15:00","15:30","16:00","16:30","17:00","17:30",
];

const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ================================================================
   Main Component
   ================================================================ */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  // Booking data
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [openedAt] = useState(() => Date.now()); // spam: timestamp check

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const tz = useMemo(() => {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return "UTC"; }
  }, []);
  const tzOffset = useMemo(() => {
    const off = new Date().getTimezoneOffset();
    const sign = off <= 0 ? "+" : "-";
    const h = String(Math.floor(Math.abs(off) / 60)).padStart(2, "0");
    const m = String(Math.abs(off) % 60).padStart(2, "0");
    return `UTC${sign}${h}:${m}`;
  }, []);

  const businessDays = useMemo(() => getBusinessDays(14), []);

  // Listen for external open
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  // Focus input when step changes
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (step === 6) textareaRef.current?.focus();
        else inputRef.current?.focus();
      }, 100);
    }
  }, [open, step]);

  // Scroll to bottom
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, step]);

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Initialize welcome on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ from: "bot", text: "Hi 👋 I'm the CascadX assistant. I'd love to set up a call with our team to walk you through the platform. It only takes 30 seconds — ready?" }]);
    }
  }, [open, messages.length]);

  const addBot = (text: string) => setMessages((p) => [...p, { from: "bot", text }]);
  const addUser = (text: string) => setMessages((p) => [...p, { from: "user", text }]);

  // Quick pick handlers for Step 0
  const handleReady = () => {
    addUser("Yes, let's go");
    setTimeout(() => {
      addBot("Great! What's the best email to reach you at?");
      setStep(1);
    }, 400);
  };
  const handleBrowsing = () => {
    addUser("Just browsing");
    setTimeout(() => addBot("No problem — I'll be here whenever you're ready 😊"), 400);
  };

  // Submit handlers per step
  const submitEmail = () => {
    const val = input.trim();
    if (!emailRegex.test(val)) { setError("Hmm, that doesn't look like a valid email. Could you double-check?"); return; }
    setEmail(val); addUser(val); setInput(""); setError("");
    setTimeout(() => { addBot("What should we call you?"); setStep(2); }, 400);
  };

  const submitName = () => {
    const val = input.trim();
    if (val.length < 2) { setError("Please enter at least 2 characters."); return; }
    setName(val); addUser(val); setInput(""); setError("");
    setTimeout(() => { addBot("And what company are you with? (Optional — feel free to skip)"); setStep(3); }, 400);
  };

  const submitCompany = () => {
    const val = input.trim();
    setCompany(val || "—"); addUser(val || "Skipped"); setInput(""); setError("");
    setTimeout(() => { addBot("Perfect. When would you like to chat? Pick a date that works for you:"); setStep(4); }, 400);
  };

  const pickDate = (d: Date) => {
    setSelectedDate(d);
    addUser(formatDate(d));
    setTimeout(() => { addBot(`And what time? (All times in your local timezone — we'll figure out the rest)`); setStep(5); }, 400);
  };

  const pickTime = (t: string) => {
    setSelectedTime(t);
    addUser(`${t} (${tz})`);
    setTimeout(() => { addBot("Anything specific you'd like us to prepare before our call?"); setStep(6); }, 400);
  };

  const submitNotes = () => {
    const val = input.trim() || (textareaRef.current?.value.trim() ?? "");
    setNotes(val || "—");
    addUser(val || "Skipped");
    setInput("");
    setTimeout(() => { addBot("Here's what I have:"); setStep(7); }, 400);
  };

  const confirmAndSend = async () => {
    setStep(8);
    addBot("Sending your request...");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email, name, company,
          date: selectedDate?.toISOString(),
          dateFormatted: selectedDate ? formatDate(selectedDate) : "",
          time: selectedTime, timezone: tz, message: notes,
          website: "", // honeypot — always empty from real users
          openedAt,
        }),
      });
      if (!res.ok) throw new Error("API error");
      setTimeout(() => {
        addBot("🎉 You're booked! We've sent your details to our team and they'll send you a calendar invite within a few hours. Looking forward to chatting!");
        setStep(9);
      }, 600);
    } catch {
      setTimeout(() => {
        addBot("Hmm, something went wrong on our side. Could you email admin@cascadx.com directly with your details? We'll respond within 24 hours.");
        setStep(9);
      }, 600);
    }
  };

  const handleInputSubmit = () => {
    if (step === 1) submitEmail();
    else if (step === 2) submitName();
    else if (step === 3) submitCompany();
    else if (step === 6) submitNotes();
  };

  /* ================================================================
     Render
     ================================================================ */
  return (
    <>
      {/* Collapsed pill */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat with CascadX assistant"
          className="fixed z-50 flex items-center gap-3 h-14 pl-2 pr-5 bg-surface-el border border-[rgba(255,255,255,0.12)] rounded-full shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6),0_0_0_1px_rgba(217,119,87,0.2)] transition-all duration-200 hover:bg-[#2e3533] hover:border-accent hover:scale-[1.03] animate-[float_3s_ease-in-out_infinite] max-[600px]:w-14 max-[600px]:pl-0 max-[600px]:pr-0 max-[600px]:justify-center"
          style={{ bottom: "calc(24px + env(safe-area-inset-bottom, 0px))", right: "24px" }}
        >
          <div className="relative w-10 h-10 rounded-full bg-surface grid place-items-center shrink-0">
            <RobotMascot size={32} />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent animate-[pulse_2s_ease-in-out_infinite]" />
          </div>
          <span className="font-display font-medium text-sm text-ink max-[600px]:hidden">Speak with us</span>
        </button>
      )}

      {/* Expanded panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] max-[600px]:inset-0 max-[600px]:w-full max-[600px]:h-full max-[600px]:bottom-0 max-[600px]:right-0 max-[600px]:rounded-none bg-surface-el border border-[rgba(255,255,255,0.12)] rounded-[18px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7),0_1px_0_rgba(255,255,255,0.08)_inset] flex flex-col overflow-hidden animate-[msgIn_0.35s_cubic-bezier(0.2,0.8,0.2,1)_forwards] max-[600px]:pb-[env(safe-area-inset-bottom)]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-line shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-surface grid place-items-center">
                <RobotMascot size={28} />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent" />
              </div>
              <div>
                <div className="font-display font-[600] text-sm">CascadX Assistant</div>
                <div className="font-mono text-[10px] text-ink-muted tracking-[0.06em] uppercase">Online</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-lg hover:bg-white/[0.06] grid place-items-center transition-colors" aria-label="Close chat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={bodyRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed ${
                  msg.from === "user"
                    ? "bg-accent text-[#0d0f0e] rounded-br-md"
                    : "bg-surface border border-line text-ink rounded-bl-md"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Step 0: Quick picks */}
            {step === 0 && messages.length > 0 && (
              <div className="flex gap-2 pt-1">
                <button onClick={handleReady} className="px-4 py-2 text-sm font-semibold bg-accent text-[#0d0f0e] rounded-full hover:bg-accent-deep transition-colors">Yes, let&apos;s go</button>
                <button onClick={handleBrowsing} className="px-4 py-2 text-sm border border-line text-ink-soft rounded-full hover:border-ink-muted transition-colors">Just browsing</button>
              </div>
            )}

            {/* Step 4: Date picker */}
            {step === 4 && (
              <div className="pt-2">
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
                  {businessDays.map((d) => {
                    const sel = selectedDate?.toDateString() === d.toDateString();
                    return (
                      <button
                        key={d.toISOString()}
                        onClick={() => pickDate(d)}
                        className={`shrink-0 w-16 h-20 rounded-[var(--radius)] border flex flex-col items-center justify-center gap-0.5 transition-all ${
                          sel
                            ? "border-accent bg-[rgba(217,119,87,0.12)]"
                            : "border-line bg-surface hover:border-ink-muted"
                        }`}
                      >
                        {sel && <span className="w-1.5 h-1.5 rounded-full bg-accent absolute -top-0.5" />}
                        <span className="font-mono text-[10px] uppercase text-ink-muted">{dayNames[d.getDay()]}</span>
                        <span className="font-display font-[700] text-[20px] leading-none">{d.getDate()}</span>
                        <span className="font-mono text-[10px] uppercase text-ink-muted">{monthNames[d.getMonth()]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 5: Time picker */}
            {step === 5 && (
              <div className="pt-2">
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((t) => {
                    const sel = selectedTime === t;
                    return (
                      <button
                        key={t}
                        onClick={() => pickTime(t)}
                        className={`h-9 rounded-[var(--radius-sm)] border text-[13px] font-medium transition-all ${
                          sel
                            ? "border-accent bg-[rgba(217,119,87,0.15)] text-ink"
                            : "border-line bg-surface text-ink-soft hover:border-ink-muted"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 font-mono text-[10px] text-ink-muted">
                  Timezone: {tz} ({tzOffset})
                </div>
              </div>
            )}

            {/* Step 7: Confirmation card */}
            {step === 7 && (
              <div className="pt-2">
                <div className="bg-bg border border-line rounded-[var(--radius)] p-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-ink-muted">Email</span><span className="text-ink">{email}</span></div>
                  <div className="flex justify-between"><span className="text-ink-muted">Name</span><span className="text-ink">{name}</span></div>
                  <div className="flex justify-between"><span className="text-ink-muted">Company</span><span className="text-ink">{company}</span></div>
                  <div className="flex justify-between"><span className="text-ink-muted">Date</span><span className="text-ink">{selectedDate ? formatDate(selectedDate) : ""}</span></div>
                  <div className="flex justify-between"><span className="text-ink-muted">Time</span><span className="text-ink">{selectedTime} ({tz})</span></div>
                  <div className="flex justify-between"><span className="text-ink-muted">Notes</span><span className="text-ink truncate max-w-[180px]">{notes}</span></div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={confirmAndSend} className="flex-1 px-4 py-2.5 text-sm font-semibold bg-accent text-[#0d0f0e] rounded-full hover:bg-accent-deep transition-colors">
                    ✓ Confirm and send
                  </button>
                  <button onClick={() => { setStep(4); addBot("No problem — pick a new date:"); }} className="px-4 py-2.5 text-sm border border-line text-ink-soft rounded-full hover:border-ink-muted transition-colors">
                    ✏ Edit
                  </button>
                </div>
              </div>
            )}

            {/* Step 8: Loading */}
            {step === 8 && (
              <div className="flex items-center gap-2 py-2">
                <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-ink-muted">Sending your request...</span>
              </div>
            )}

            {/* Step 9: Footer note */}
            {step === 9 && (
              <p className="text-[12px] text-ink-muted mt-2">
                If you don&apos;t hear from us within 24 hours, please email admin@cascadx.com directly.
              </p>
            )}
          </div>

          {/* Input area — shown for steps 1,2,3,6 */}
          {[1, 2, 3, 6].includes(step) && (
            <div className="px-4 py-3 border-t border-line shrink-0">
              {error && <p className="text-[12px] text-warn mb-2 px-1">{error}</p>}

              {step === 6 ? (
                <div className="space-y-2">
                  <textarea
                    ref={textareaRef}
                    rows={3}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tell us a bit about your use case, current PSPs, or what you're looking to solve... (optional)"
                    className="w-full bg-bg rounded-xl border border-line px-4 py-3 text-sm text-ink placeholder:text-ink-muted font-sans outline-none focus:border-accent resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <button onClick={() => { setInput(""); submitNotes(); }} className="text-[12px] text-ink-muted hover:text-ink transition-colors">Skip this →</button>
                    <button onClick={submitNotes} className="w-8 h-8 rounded-full bg-accent text-[#0d0f0e] grid place-items-center shrink-0 transition-colors hover:bg-accent-deep" aria-label="Send">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 bg-bg rounded-full border border-line px-4 py-2">
                    <input
                      ref={inputRef}
                      type={step === 1 ? "email" : "text"}
                      value={input}
                      onChange={(e) => { setInput(e.target.value); setError(""); }}
                      onKeyDown={(e) => { if (e.key === "Enter") handleInputSubmit(); }}
                      placeholder={step === 1 ? "you@company.com" : step === 2 ? "Your name" : "Company name"}
                      className="flex-1 bg-transparent border-none outline-none text-sm text-ink placeholder:text-ink-muted font-sans"
                    />
                    <button onClick={handleInputSubmit} className="w-8 h-8 rounded-full bg-accent text-[#0d0f0e] grid place-items-center shrink-0 transition-colors hover:bg-accent-deep" aria-label="Send">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                  {step === 3 && (
                    <button onClick={() => { setInput(""); submitCompany(); }} className="text-[12px] text-ink-muted hover:text-ink transition-colors pl-1">Skip this →</button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
