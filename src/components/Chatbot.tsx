import { useState, useRef, useEffect } from 'react'
import { X, Send, MessageCircle, Bot } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
      if (!initialized) {
        triggerIntro()
        setInitialized(true)
      }
    }
  }, [open])

  const triggerIntro = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Hello!' }],
        }),
      })
      const data = await res.json()
      if (data.reply) {
        setMessages([data.reply])
      }
    } catch {
      setMessages([{
        role: 'assistant',
        content: "Hello tol! Ako si Yoyo. May internet issue yata ngayon pero andito pa rin ako. Try mo ulit later ha!",
      }])
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMsg: Message = { role: 'user', content: input.trim() }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })
      const data = await res.json()
      if (data.reply) {
        setMessages(prev => [...prev, data.reply])
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Ay sorry tol, may error. Try mo ulit ha!",
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl border overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #16161f 0%, #0f0f16 100%)',
            borderColor: 'rgba(157,92,255,0.25)',
            boxShadow: '0 0 80px rgba(157,92,255,0.15), 0 30px 60px rgba(0,0,0,0.7)',
            animation: 'chatSlideUp 0.3s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 border-b"
            style={{ borderColor: 'rgba(157,92,255,0.15)', background: 'rgba(157,92,255,0.06)' }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(157,92,255,0.2)', border: '1px solid rgba(157,92,255,0.3)' }}
            >
              <Bot size={16} style={{ color: '#9d5cff' }} />
            </div>
            <div>
              <div className="font-display font-semibold text-sm text-white">Yoyo</div>
              <div className="font-mono text-xs" style={{ color: 'rgba(157,92,255,0.8)' }}>
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full mr-1.5"
                  style={{ background: '#7fff7f', boxShadow: '0 0 4px #7fff7f' }}
                />
                online
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <X size={14} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="overflow-y-auto p-4 space-y-3"
            style={{ height: '320px' }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-[80%] px-3 py-2 rounded-xl font-mono text-xs leading-relaxed"
                  style={
                    msg.role === 'user'
                      ? {
                          background: 'rgba(157,92,255,0.2)',
                          border: '1px solid rgba(157,92,255,0.3)',
                          color: '#e8e8f0',
                          borderRadius: '12px 12px 2px 12px',
                        }
                      : {
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: '#b0b0c8',
                          borderRadius: '12px 12px 12px 2px',
                        }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px 12px 12px 2px',
                  }}
                >
                  <div className="flex gap-1 items-center">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: '#9d5cff',
                          animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-3 border-t"
            style={{ borderColor: 'rgba(157,92,255,0.15)' }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask Yoyo anything..."
              className="flex-1 bg-transparent font-mono text-xs text-white placeholder-muted outline-none px-3 py-2 rounded-lg border"
              style={{ borderColor: 'rgba(157,92,255,0.2)', background: 'rgba(255,255,255,0.03)' }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{
                background: input.trim() && !loading ? 'rgba(157,92,255,0.3)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${input.trim() && !loading ? 'rgba(157,92,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                color: input.trim() && !loading ? '#9d5cff' : '#555',
              }}
            >
              <Send size={13} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {/* Floating Button */}
<button
  onClick={() => setOpen(!open)}
  className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl font-mono text-sm font-medium transition-all duration-300"
  style={{
    background: open
      ? 'rgba(157,92,255,0.15)'
      : 'linear-gradient(135deg, rgba(157,92,255,0.25), rgba(157,92,255,0.1))',
    border: '1px solid rgba(157,92,255,0.4)',
    color: '#9d5cff',
    boxShadow: '0 0 30px rgba(157,92,255,0.2), 0 8px 32px rgba(0,0,0,0.4)',
  }}
>
  {open ? (
    <X size={16} />
  ) : (
    <>
      {/* Desktop: icon + text */}
      <span className="hidden sm:flex items-center gap-2">
        <MessageCircle size={16} />
        <span>Chat with Yoyo</span>
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: '#7fff7f', boxShadow: '0 0 6px #7fff7f', animation: 'pulse 2s infinite' }}
        />
      </span>

      {/* Mobile: icon only */}
      <span className="flex sm:hidden items-center justify-center">
        <MessageCircle size={20} />
      </span>
    </>
  )}
</button>

      {/* Animations */}
      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  )
}