import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Clock, Shield, Truck } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const LandingPage = () => {
  const heroRef = useRef(null)
  const featuresRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      const tl = gsap.timeline()
      
      tl.fromTo('.hero-title', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
      .fromTo('.hero-subtitle', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo('.hero-cta', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )

      // Parallax effect for hero background
      gsap.to('.hero-bg', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })

      // Features stagger animation
      gsap.fromTo('.feature-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

    }, heroRef)

    return () => ctx.revert()
  }, [])

  const features = [
    {
      icon: Clock,
      title: "Entrega Rápida",
      description: "Seus pratos favoritos em até 30 minutos na sua porta"
    },
    {
      icon: Shield,
      title: "Qualidade Garantida",
      description: "Ingredientes frescos e selecionados todos os dias"
    },
    {
      icon: Truck,
      title: "Entrega Grátis",
      description: "Frete grátis para pedidos acima de R$ 50,00"
    }
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      rating: 5,
      comment: "Melhor experiência de delivery que já tive! Comida incrível e entrega super rápida."
    },
    {
      name: "João Santos",
      rating: 5,
      comment: "Qualidade excepcional e atendimento impecável. Recomendo demais!"
    },
    {
      name: "Ana Costa",
      rating: 5,
      comment: "Sabores únicos e apresentação perfeita. Vale cada centavo!"
    }
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-gray via-pure-white to-soft-gray">
        <div className="hero-bg absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-black/20 to-premium-gray/20"></div>
        </div>
        
        <div className="container-main relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-xl">
            <h1 className="hero-title text-display-large md:text-display-medium text-primary-black leading-tight">
              Experiência gastronômica
              <span className="text-gradient block">premium</span>
              na sua casa
            </h1>
            
            <p className="hero-subtitle text-body-large text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Sabores únicos, ingredientes selecionados e o melhor atendimento. 
              Descubra uma nova forma de experimentar a alta gastronomia.
            </p>
            
            <div className="hero-cta flex flex-col sm:flex-row gap-md justify-center items-center">
              <Link to="/cardapio" className="btn-primary group">
                Ver Cardápio
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <button className="btn-secondary">
                Assistir Vídeo
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent-gold/10 rounded-full animate-pulse-soft"></div>
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-success-green/10 rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-warning-amber/10 rounded-full animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="section-spacing bg-background-elevated">
        <div className="container-main">
          <div className="text-center mb-4xl">
            <h2 className="text-headline-large text-primary-black mb-lg">
              Por que escolher nosso delivery?
            </h2>
            <p className="text-body-large text-text-secondary max-w-2xl mx-auto">
              Combinamos tecnologia, qualidade e paixão pela gastronomia para oferecer 
              a melhor experiência de delivery da cidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card-product p-xl text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-accent-gold to-warning-amber rounded-premium flex items-center justify-center mx-auto mb-lg group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={28} className="text-primary-black" />
                </div>
                <h3 className="text-headline-medium text-primary-black mb-md">
                  {feature.title}
                </h3>
                <p className="text-body-medium text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-spacing bg-soft-gray">
        <div className="container-main">
          <div className="text-center mb-4xl">
            <h2 className="text-headline-large text-primary-black mb-lg">
              O que nossos clientes dizem
            </h2>
            <p className="text-body-large text-text-secondary">
              Mais de 10.000 clientes satisfeitos confiam em nosso serviço
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="animate-on-scroll card-product p-xl">
                <div className="flex items-center mb-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent-gold to-warning-amber rounded-full flex items-center justify-center mr-md">
                    <span className="text-primary-black font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-body-medium font-medium text-primary-black">
                      {testimonial.name}
                    </h4>
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-accent-gold text-accent-gold" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-body-medium text-text-secondary leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-primary-black text-pure-white">
        <div className="container-main text-center">
          <div className="max-w-3xl mx-auto space-y-xl">
            <h2 className="text-headline-large leading-tight">
              Pronto para uma experiência gastronômica única?
            </h2>
            <p className="text-body-large text-gray-300">
              Faça seu primeiro pedido e descubra por que somos o delivery premium 
              mais amado da cidade.
            </p>
            <Link to="/cardapio" className="btn-primary inline-flex items-center group">
              Fazer Pedido Agora
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage