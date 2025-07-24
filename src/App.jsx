import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Import pages
import LandingPage from './pages/LandingPage'
import Cardapio from './pages/Cardapio'
import Carrinho from './pages/Carrinho'
import Checkout from './pages/Checkout'
import MeusPedidos from './pages/MeusPedidos'
import Admin from './pages/Admin'

// Import components
import Header from './components/Header'
import Footer from './components/Footer'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Initialize scroll animations
    const initScrollAnimations = () => {
      // Animate elements on scroll
      gsap.utils.toArray('.animate-on-scroll').forEach((element) => {
        gsap.fromTo(element, 
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })

      // Text reveal animations
      gsap.utils.toArray('.text-reveal').forEach((element) => {
        const spans = element.querySelectorAll('span')
        gsap.fromTo(spans,
          {
            y: '100%'
          },
          {
            y: '0%',
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })
    }

    // Initialize animations after DOM is ready
    const timer = setTimeout(initScrollAnimations, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-soft-gray">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/cardapio" element={<Cardapio />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pedidos" element={<MeusPedidos />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App