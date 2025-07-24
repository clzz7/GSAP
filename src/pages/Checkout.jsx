import { useState } from 'react'
import { ArrowLeft, CreditCard, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

const Checkout = () => {
  const [step, setStep] = useState(1)
  const [whatsapp, setWhatsapp] = useState('')
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      zipCode: ''
    }
  })

  // Mock cart data
  const cartItems = [
    {
      id: 1,
      name: 'Risotto de Camarão',
      quantity: 2,
      price: 68.90
    },
    {
      id: 2,
      name: 'Bruschetta Artesanal',
      quantity: 1,
      price: 32.90
    }
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = 0
  const total = subtotal + deliveryFee

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault()
    // Aqui seria feita a busca no banco de dados
    // Por enquanto, simular busca
    console.log('Buscando dados para WhatsApp:', whatsapp)
    setStep(2)
  }

  const handleAddressSubmit = (e) => {
    e.preventDefault()
    setStep(3)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    // Integração com Mercado Pago
    console.log('Processando pagamento...')
  }

  return (
    <div className="min-h-screen pt-20 bg-soft-gray">
      <div className="container-main py-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4xl">
          <div className="flex items-center space-x-lg">
            <Link to="/carrinho" className="btn-icon">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-headline-large text-primary-black">
                Finalizar Pedido
              </h1>
              <p className="text-body-medium text-text-secondary">
                Etapa {step} de 3
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4xl">
          <div className="flex items-center justify-between mb-md">
            <span className={`text-caption font-medium ${step >= 1 ? 'text-primary-black' : 'text-text-tertiary'}`}>
              Identificação
            </span>
            <span className={`text-caption font-medium ${step >= 2 ? 'text-primary-black' : 'text-text-tertiary'}`}>
              Endereço
            </span>
            <span className={`text-caption font-medium ${step >= 3 ? 'text-primary-black' : 'text-text-tertiary'}`}>
              Pagamento
            </span>
          </div>
          <div className="w-full bg-border-light rounded-full h-2">
            <div 
              className="bg-accent-gold h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: WhatsApp Login */}
            {step === 1 && (
              <div className="card-product p-xl">
                <div className="flex items-center space-x-md mb-xl">
                  <Phone className="text-accent-gold" size={24} />
                  <h2 className="text-headline-medium text-primary-black">
                    Identificação via WhatsApp
                  </h2>
                </div>

                <form onSubmit={handleWhatsAppSubmit} className="space-y-lg">
                  <div>
                    <label className="block text-body-medium font-medium text-primary-black mb-md">
                      Número do WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="input-field w-full"
                      required
                    />
                    <p className="text-caption text-text-tertiary mt-2">
                      Usaremos seu WhatsApp para enviar atualizações do pedido
                    </p>
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Continuar
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Address */}
            {step === 2 && (
              <div className="card-product p-xl">
                <div className="flex items-center space-x-md mb-xl">
                  <MapPin className="text-accent-gold" size={24} />
                  <h2 className="text-headline-medium text-primary-black">
                    Endereço de Entrega
                  </h2>
                </div>

                <form onSubmit={handleAddressSubmit} className="space-y-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                    <div className="md:col-span-2">
                      <label className="block text-body-medium font-medium text-primary-black mb-md">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        value={customerData.name}
                        onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                        className="input-field w-full"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-body-medium font-medium text-primary-black mb-md">
                        CEP
                      </label>
                      <input
                        type="text"
                        value={customerData.address.zipCode}
                        onChange={(e) => setCustomerData({
                          ...customerData, 
                          address: {...customerData.address, zipCode: e.target.value}
                        })}
                        placeholder="00000-000"
                        className="input-field w-full"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-body-medium font-medium text-primary-black mb-md">
                        Rua
                      </label>
                      <input
                        type="text"
                        value={customerData.address.street}
                        onChange={(e) => setCustomerData({
                          ...customerData, 
                          address: {...customerData.address, street: e.target.value}
                        })}
                        className="input-field w-full"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-body-medium font-medium text-primary-black mb-md">
                        Número
                      </label>
                      <input
                        type="text"
                        value={customerData.address.number}
                        onChange={(e) => setCustomerData({
                          ...customerData, 
                          address: {...customerData.address, number: e.target.value}
                        })}
                        className="input-field w-full"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-body-medium font-medium text-primary-black mb-md">
                        Complemento
                      </label>
                      <input
                        type="text"
                        value={customerData.address.complement}
                        onChange={(e) => setCustomerData({
                          ...customerData, 
                          address: {...customerData.address, complement: e.target.value}
                        })}
                        placeholder="Apartamento, bloco, etc."
                        className="input-field w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-body-medium font-medium text-primary-black mb-md">
                        Bairro
                      </label>
                      <input
                        type="text"
                        value={customerData.address.neighborhood}
                        onChange={(e) => setCustomerData({
                          ...customerData, 
                          address: {...customerData.address, neighborhood: e.target.value}
                        })}
                        className="input-field w-full"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-body-medium font-medium text-primary-black mb-md">
                        Cidade
                      </label>
                      <input
                        type="text"
                        value={customerData.address.city}
                        onChange={(e) => setCustomerData({
                          ...customerData, 
                          address: {...customerData.address, city: e.target.value}
                        })}
                        className="input-field w-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex space-x-md">
                    <button 
                      type="button" 
                      onClick={() => setStep(1)}
                      className="btn-secondary flex-1"
                    >
                      Voltar
                    </button>
                    <button type="submit" className="btn-primary flex-1">
                      Continuar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="card-product p-xl">
                <div className="flex items-center space-x-md mb-xl">
                  <CreditCard className="text-accent-gold" size={24} />
                  <h2 className="text-headline-medium text-primary-black">
                    Pagamento
                  </h2>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-lg">
                  <div className="bg-soft-gray rounded-card p-lg">
                    <p className="text-body-medium text-text-secondary text-center">
                      Você será redirecionado para o Mercado Pago para finalizar o pagamento de forma segura.
                    </p>
                  </div>

                  <div className="flex space-x-md">
                    <button 
                      type="button" 
                      onClick={() => setStep(2)}
                      className="btn-secondary flex-1"
                    >
                      Voltar
                    </button>
                    <button type="submit" className="btn-primary flex-1">
                      Pagar Agora
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-product p-xl sticky top-24">
              <h3 className="text-headline-medium text-primary-black mb-xl">
                Resumo do Pedido
              </h3>

              <div className="space-y-md mb-xl">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="text-body-medium font-medium">{item.name}</p>
                      <p className="text-caption text-text-tertiary">Qtd: {item.quantity}</p>
                    </div>
                    <span className="text-body-medium font-medium">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-md mb-xl border-t border-border-light pt-lg">
                <div className="flex justify-between items-center">
                  <span className="text-body-medium text-text-secondary">Subtotal</span>
                  <span className="text-body-medium font-medium">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-body-medium text-text-secondary">Taxa de entrega</span>
                  <span className="text-body-medium font-medium text-success-green">
                    Grátis
                  </span>
                </div>

                <div className="flex justify-between items-center border-t border-border-light pt-md">
                  <span className="text-headline-medium font-semibold text-primary-black">Total</span>
                  <span className="text-headline-medium font-semibold text-primary-black">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout