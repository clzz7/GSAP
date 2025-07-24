import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Carrinho = () => {
  // Mock data - será substituído pela lógica real do carrinho
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Risotto de Camarão',
      description: 'Risotto cremoso com camarões frescos',
      price: 68.90,
      quantity: 2,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Bruschetta Artesanal',
      description: 'Pão artesanal com tomates confitados',
      price: 32.90,
      quantity: 1,
      image: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = subtotal >= 50 ? 0 : 8.90
  const total = subtotal + deliveryFee

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-soft-gray flex items-center justify-center">
        <div className="container-main text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-background-elevated rounded-full flex items-center justify-center mx-auto mb-lg shadow-card">
              <ShoppingBag size={32} className="text-text-tertiary" />
            </div>
            <h2 className="text-headline-large text-primary-black mb-md">
              Seu carrinho está vazio
            </h2>
            <p className="text-body-medium text-text-secondary mb-xl">
              Adicione alguns pratos deliciosos do nosso cardápio para começar.
            </p>
            <Link to="/cardapio" className="btn-primary">
              Ver Cardápio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-soft-gray">
      <div className="container-main py-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4xl">
          <div>
            <h1 className="text-headline-large text-primary-black mb-md">
              Seu Carrinho
            </h1>
            <p className="text-body-medium text-text-secondary">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'} no carrinho
            </p>
          </div>
          <Link to="/cardapio" className="btn-secondary flex items-center">
            <ArrowLeft size={18} className="mr-2" />
            Continuar Comprando
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-lg">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="card-product p-lg"
                >
                  <div className="flex items-center space-x-lg">
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-card overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-headline-medium text-primary-black mb-1">
                        {item.name}
                      </h3>
                      <p className="text-body-medium text-text-secondary truncate">
                        {item.description}
                      </p>
                      <p className="text-headline-medium font-semibold text-primary-black mt-2">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="btn-icon w-8 h-8 bg-soft-gray hover:bg-border-light"
                      >
                        <Minus size={16} />
                      </button>
                      
                      <span className="text-headline-medium font-medium min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="btn-icon w-8 h-8 bg-soft-gray hover:bg-border-light"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="btn-icon text-error-red hover:bg-error-red hover:text-pure-white"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-product p-xl sticky top-24">
              <h3 className="text-headline-medium text-primary-black mb-xl">
                Resumo do Pedido
              </h3>

              <div className="space-y-lg mb-xl">
                <div className="flex justify-between items-center">
                  <span className="text-body-medium text-text-secondary">Subtotal</span>
                  <span className="text-body-medium font-medium">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-body-medium text-text-secondary">Taxa de entrega</span>
                  <span className={`text-body-medium font-medium ${deliveryFee === 0 ? 'text-success-green' : ''}`}>
                    {deliveryFee === 0 ? 'Grátis' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>

                {deliveryFee > 0 && (
                  <p className="text-caption text-text-tertiary">
                    Frete grátis para pedidos acima de R$ 50,00
                  </p>
                )}

                <div className="border-t border-border-light pt-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-headline-medium font-semibold text-primary-black">Total</span>
                    <span className="text-headline-medium font-semibold text-primary-black">
                      R$ {total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>

              <Link to="/checkout" className="btn-primary w-full text-center">
                Finalizar Pedido
              </Link>

              <div className="mt-lg text-center">
                <p className="text-caption text-text-tertiary">
                  Pagamento seguro com Mercado Pago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carrinho