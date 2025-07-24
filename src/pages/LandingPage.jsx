import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Clock, Shield, Truck } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger, TextPlugin, SplitText } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin)

const LandingPage = () => {
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Advanced text animations like GitHub repo
      const splitText = new SplitText(textRef.current, { type: "chars,words,lines" })
      
      // Hero timeline with sophisticated animations
      const heroTl = gsap.timeline()
      
      heroTl.fromTo(splitText.chars, 
        { 
          opacity: 0, 
          y: 100,
          rotationX: -90,
          transformOrigin: "0% 50% -50"
        },
        { 
          opacity: 1, 
          y: 0,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.02,
          ease: "back.out(1.7)"
        }
      )
      .fromTo('.hero-subtitle', 
        { 
          opacity: 0, 
          y: 50,
          filter: "blur(10px)"
        },
        { 
          opacity: 1, 
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out"
        },
        "-=0.8"
      )
      .fromTo('.hero-cta', 
        { 
          opacity: 0, 
          scale: 0.8,
          y: 30
        },
        { 
          opacity: 1, 
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)"
        },
        "-=0.5"
      )

      // Advanced parallax with multiple layers
      gsap.to('.hero-bg-layer-1', {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })

      gsap.to('.hero-bg-layer-2', {
        yPercent: -60,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })

      // Morphing background gradient
      gsap.to('.hero-gradient', {
        background: "linear-gradient(135deg, #D4AF37 0%, #FF9F0A 100%)",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      })

      // Advanced features animation with 3D transforms
      gsap.fromTo('.feature-card',
        {
          opacity: 0,
          y: 100,
          rotationY: -15,
          transformOrigin: "center center",
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1.2,
          stagger: {
            amount: 0.6,
            from: "start"
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              gsap.to('.feature-card', {
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                duration: 0.5,
                stagger: 0.1
              })
            }
          }
        }
      )

      // Floating elements with physics-like movement
      gsap.to('.floating-element-1', {
        y: -20,
        x: 10,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

      gsap.to('.floating-element-2', {
        y: 15,
        x: -8,
        rotation: -3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1
      })

      gsap.to('.floating-element-3', {
        y: -25,
        x: 12,
        rotation: 8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2
      })

      // Advanced scroll-triggered counter animation
      const counters = document.querySelectorAll('.counter')
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'))
        gsap.fromTo(counter, 
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })

      // Image reveal with clip-path
      gsap.fromTo('.reveal-image',
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.reveal-image',
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
            <h1 ref={textRef} className="hero-title text-display-large md:text-display-medium text-primary-black leading-tight">
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
        <div className="floating-element-1 absolute top-20 left-10 w-20 h-20 bg-accent-gold/20 rounded-full backdrop-blur-sm"></div>
        <div className="floating-element-2 absolute bottom-32 right-16 w-16 h-16 bg-success-green/20 rounded-full backdrop-blur-sm"></div>
        <div className="floating-element-3 absolute top-1/2 left-20 w-12 h-12 bg-warning-amber/20 rounded-full backdrop-blur-sm"></div>
        
        {/* Additional floating elements for depth */}
        <div className="floating-element-1 absolute top-40 right-32 w-8 h-8 bg-primary-black/10 rounded-full"></div>
        <div className="floating-element-2 absolute bottom-20 left-32 w-14 h-14 bg-accent-gold/15 rounded-full"></div>
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
            <div className="flex justify-center space-x-8 mt-8">
              <div className="text-center">
                <div className="counter text-3xl font-bold text-accent-gold" data-target="1000">0</div>
                <div className="text-sm text-text-tertiary">Pedidos Entregues</div>
              </div>
              <div className="text-center">
                <div className="counter text-3xl font-bold text-accent-gold" data-target="98">0</div>
                <div className="text-sm text-text-tertiary">% Satisfação</div>
              </div>
              <div className="text-center">
                <div className="counter text-3xl font-bold text-accent-gold" data-target="25">0</div>
                <div className="text-sm text-text-tertiary">Min Entrega</div>
              </div>
            </div>
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