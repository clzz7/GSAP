import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Cardápio', href: '/cardapio' },
    { name: 'Meus Pedidos', href: '/pedidos' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'glass-effect shadow-card' : 'bg-transparent'
    }`}>
      <div className="container-main">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-black to-premium-gray rounded-card flex items-center justify-center">
              <span className="text-pure-white font-semibold text-lg">D</span>
            </div>
            <span className="text-headline-medium font-medium text-primary-black hidden sm:block">
              Delivery Premium
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-body-medium font-medium transition-colors duration-300 ${
                  isActive(item.href) 
                    ? 'text-primary-black' 
                    : 'text-text-secondary hover:text-primary-black'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-gold"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button className="btn-icon hidden md:flex">
              <Search size={20} />
            </button>

            {/* Cart Button */}
            <Link to="/carrinho" className="btn-icon relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-error-red text-pure-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* User Button */}
            <button className="btn-icon">
              <User size={20} />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="btn-icon md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-effect border-t border-border-light"
          >
            <div className="container-main py-4">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      className={`block text-body-medium font-medium py-2 transition-colors duration-300 ${
                        isActive(item.href) 
                          ? 'text-primary-black' 
                          : 'text-text-secondary'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Search */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navigation.length * 0.1 }}
                  className="pt-4 border-t border-border-light"
                >
                  <div className="flex items-center space-x-2 bg-soft-gray rounded-input px-4 py-3">
                    <Search size={18} className="text-text-tertiary" />
                    <input
                      type="text"
                      placeholder="Buscar produtos..."
                      className="flex-1 bg-transparent text-body-medium placeholder-text-tertiary focus:outline-none"
                    />
                  </div>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header