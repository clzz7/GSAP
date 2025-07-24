import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ]

  const quickLinks = [
    { name: 'Cardápio', href: '/cardapio' },
    { name: 'Meus Pedidos', href: '/pedidos' },
    { name: 'Sobre Nós', href: '#' },
    { name: 'Contato', href: '#' },
  ]

  return (
    <footer className="bg-primary-black text-pure-white">
      <div className="container-main">
        {/* Main Footer Content */}
        <div className="py-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-xl">
            {/* Brand Section */}
            <div className="space-y-lg">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-accent-gold to-warning-amber rounded-card flex items-center justify-center">
                  <span className="text-primary-black font-semibold text-lg">D</span>
                </div>
                <span className="text-headline-medium font-medium">
                  Delivery Premium
                </span>
              </div>
              <p className="text-body-medium text-gray-300 leading-relaxed">
                Experiência gastronômica premium entregue na sua casa. 
                Sabores únicos, ingredientes selecionados e o melhor atendimento.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-premium-gray rounded-full flex items-center justify-center hover:bg-accent-gold transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-lg">
              <h3 className="text-headline-medium font-medium">Links Rápidos</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-body-medium text-gray-300 hover:text-accent-gold transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-lg">
              <h3 className="text-headline-medium font-medium">Contato</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin size={18} className="text-accent-gold mt-1 flex-shrink-0" />
                  <p className="text-body-medium text-gray-300">
                    Rua das Delícias, 123<br />
                    Centro, São Paulo - SP<br />
                    CEP: 01234-567
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-accent-gold flex-shrink-0" />
                  <p className="text-body-medium text-gray-300">
                    (11) 99999-9999
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-accent-gold flex-shrink-0" />
                  <p className="text-body-medium text-gray-300">
                    contato@deliverypremium.com
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="space-y-lg">
              <h3 className="text-headline-medium font-medium">Horário de Funcionamento</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Clock size={18} className="text-accent-gold mt-1 flex-shrink-0" />
                  <div className="text-body-medium text-gray-300">
                    <p className="font-medium text-pure-white">Segunda a Sexta</p>
                    <p>11:00 - 23:00</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-[18px] flex-shrink-0"></div>
                  <div className="text-body-medium text-gray-300">
                    <p className="font-medium text-pure-white">Sábado e Domingo</p>
                    <p>12:00 - 00:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-premium-gray py-lg">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-body-medium text-gray-400">
              © {currentYear} Delivery Premium. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <Link
                to="#"
                className="text-body-medium text-gray-400 hover:text-accent-gold transition-colors duration-300"
              >
                Política de Privacidade
              </Link>
              <Link
                to="#"
                className="text-body-medium text-gray-400 hover:text-accent-gold transition-colors duration-300"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer