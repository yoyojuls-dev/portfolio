import RevealOnScroll from './RevealOnScroll'

export default function About() {
  const highlights = [
    { emoji: '🧠', title: 'AI Engineering', desc: 'Building intelligent systems with modern AI APIs and frameworks.' },
    { emoji: '🔬', title: 'QA Testing', desc: 'Ensuring software quality through systematic testing and automation.' },
    { emoji: '✍️', title: 'Prompt Engineering', desc: 'Crafting precise prompts that unlock the full potential of AI models.' },
  ]

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-accent to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Image + decoration */}
          <RevealOnScroll delay={100}>
            <div className="relative hidden lg:block">
              <div className="relative w-full max-w-sm mx-auto">
                <div
                  className="absolute inset-0 rounded-2xl translate-x-4 translate-y-4"
                  style={{ background: 'linear-gradient(135deg, #9d5cff22, #00e5ff11)', border: '1px solid rgba(157,92,255,0.2)' }}
                />
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{ background: '#1a1a24', border: '1px solid rgba(157,92,255,0.15)' }}
                >
                  <img
                    src="/images/about.JPG"
                    alt="About Julius"
                    className="w-full aspect-[3/4] object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const fallback = target.nextElementSibling as HTMLElement
                      if (fallback) fallback.style.display = 'flex'
                    }}
                  />
                  <div
                    className="w-full aspect-[3/4] items-center justify-center text-center p-8"
                    style={{ display: 'none' }}
                  >
                    <div>
                      <div className="text-5xl mb-4">🤖</div>
                      <div className="font-mono text-xs text-muted">Add your photo to</div>
                      <div className="font-mono text-xs text-accent mt-1">public/images/about.png</div>
                    </div>
                  </div>
                </div>
                <div
                  className="absolute -bottom-6 -right-6 p-4 rounded-xl border border-border/50"
                  style={{ background: '#0d0d12', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                >
                  <div className="font-mono text-xs text-muted mb-1">Currently working with</div>
                  <div className="flex items-center gap-2">
                    {['⚛', '🐍', '🤖'].map((icon, i) => (
                      <span key={i} className="text-xl">{icon}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right: Text */}
          <div>
            <RevealOnScroll>
              <div>
                <div className="font-mono text-accent text-xs uppercase tracking-widest mb-3">
                  # about-me
                </div>
                <div className="w-16 h-px bg-gradient-to-r from-accent to-transparent mb-8" />
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <p className="text-muted leading-relaxed mb-5" style={{ fontSize: '0.95rem' }}>
                I'm <span className="text-text font-medium">Julius Ceasar Visbal</span> — a technology enthusiast
                based in the Philippines, passionate about the intersection of artificial intelligence, software
                quality assurance, and creative problem-solving.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={150}>
              <p className="text-muted leading-relaxed mb-5" style={{ fontSize: '0.95rem' }}>
                My journey into tech started with a fascination for how systems think. Today, I specialize
                in building AI-powered tools, engineering precise prompts that coax the best performance
                from language models, and ensuring software meets the highest standards of quality.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <p className="text-muted leading-relaxed mb-10" style={{ fontSize: '0.95rem' }}>
                I'm always striving to learn the newest technologies, contribute to meaningful projects,
                and help others establish their digital presence through reliable, well-tested solutions.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={250}>
              <div className="grid gap-4 mb-10">
                {highlights.map(({ emoji, title, desc }) => (
                  <div
                    key={title}
                    className="flex items-start gap-4 p-4 rounded-lg border border-border/30 hover:border-accent/30 transition-colors"
                    style={{ background: '#13131a' }}
                  >
                    <span className="text-2xl flex-shrink-0 mt-0.5">{emoji}</span>
                    <div>
                      <div className="font-display font-medium text-text text-sm mb-0.5">{title}</div>
                      <div className="font-mono text-xs text-muted">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:gap-3 transition-all"
              >
                Let's work together →
              </a>
            </RevealOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
}