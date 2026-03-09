import { BrowserRouter } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import Loader from './components/Loader'
// 1. ADD THIS IMPORT LINE:
import Chatbot from './components/Chatbot' 

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loader />

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-bg overflow-x-hidden">
        {/* Ambient background */}
        <div className="fixed inset-0 ambient-glow pointer-events-none z-0" />
        <div className="fixed inset-0 noise-overlay z-0" />

        <CustomCursor />
        <Navbar />

        <main>
          <Hero />
          <Projects />
          <Skills />
          <About />
          <Contact />
        </main>

        <Footer />
        
        {/* 2. ADD YOUR CHATBOT COMPONENT HERE */}
        <Chatbot />
        
      </div>
    </BrowserRouter>
  )
}

export default App