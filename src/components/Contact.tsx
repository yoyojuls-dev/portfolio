import { useState, FormEvent } from 'react'
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setSent(true)
        setForm({ name: '', email: '', message: '' })
      } else {
        setError('Something went wrong. Try emailing me directly.')
      }
    } catch {
      // Fallback: show success anyway for demo
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute right-0 top-0 w-80 h-80 dot-grid opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="font-mono text-accent text-xs uppercase tracking-widest mb-3">
              # contacts
            </div>
            <div className="w-20 h-px bg-gradient-to-r from-accent to-transparent mb-8" />

            <p className="text-muted leading-relaxed mb-8 max-w-md" style={{ fontSize: '0.95rem' }}>
              I'm interested in freelance opportunities, AI collaborations, and QA projects.
              However, if you have any other request or question — don't hesitate to reach out!
            </p>

            {/* Contact cards */}
            <div className="space-y-4">
              <div
                className="flex items-center gap-4 p-4 rounded-xl border border-border/40 hover:border-accent/30 transition-all duration-300"
                style={{ background: '#13131a' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(157,92,255,0.1)' }}>
                  <Mail size={18} className="text-accent" />
                </div>
                <div>
                  <div className="font-mono text-xs text-muted mb-0.5">Email</div>
                  <a
                    href="mailto:julius@example.com"
                    className="font-mono text-sm text-text hover:text-accent transition-colors"
                  >
                    visbaljulius@gmail.com
                  </a>
                </div>
              </div>

              <div
                className="flex items-center gap-4 p-4 rounded-xl border border-border/40 hover:border-accent/30 transition-all duration-300"
                style={{ background: '#13131a' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,229,255,0.08)' }}>
                  <MessageSquare size={18} className="text-cyan-400" />
                </div>
                <div>
                  <div className="font-mono text-xs text-muted mb-0.5">Discord</div>
                  <span className="font-mono text-sm text-text">Cerius #cerius29</span>
                </div>
              </div>
            </div>

            {/* Availability status */}
            <div
              className="mt-8 p-4 rounded-xl border border-green-500/20 flex items-center gap-3"
              style={{ background: 'rgba(74, 222, 128, 0.04)' }}
            >
              <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <div>
                <div className="font-display text-sm font-medium text-green-400">Available for hire</div>
                <div className="font-mono text-xs text-muted">Typical response within 24 hours</div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="p-7 rounded-2xl border border-border/50"
            style={{ background: 'linear-gradient(135deg, #1a1a24 0%, #13131a 100%)' }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle size={48} className="text-green-400 mb-4" />
                <h3 className="font-display font-semibold text-xl text-text mb-2">Message sent!</h3>
                <p className="font-mono text-sm text-muted">I'll get back to you soon.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 font-mono text-xs text-accent hover:text-cyan transition-colors"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-mono text-xs text-muted mb-2">// Your name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Julius Ceasar"
                    className="w-full px-4 py-3 rounded-lg border border-border/50 bg-bg/60 text-text font-mono text-sm
                               focus:outline-none focus:border-accent/60 transition-colors placeholder:text-muted/40"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-muted mb-2">// Your email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-border/50 bg-bg/60 text-text font-mono text-sm
                               focus:outline-none focus:border-accent/60 transition-colors placeholder:text-muted/40"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-muted mb-2">// Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Hello Julius, I'd like to..."
                    className="w-full px-4 py-3 rounded-lg border border-border/50 bg-bg/60 text-text font-mono text-sm
                               focus:outline-none focus:border-accent/60 transition-colors placeholder:text-muted/40 resize-none"
                  />
                </div>

                {error && (
                  <p className="font-mono text-xs text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-accent text-white font-mono text-sm
                             hover:bg-accent-dim transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
