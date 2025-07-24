import { useState } from 'react'
import { Clock, CheckCircle, Truck, Package, AlertCircle } from 'lucide-react'

const MeusPedidos = () => {
  // Mock data - será substituído pela integração com Supabase
  const [orders] = useState([
    {
      id: 'PED-001',
      date: '2024-01-15T18:30:00',
      status: 'entregue',
      total: 170.80,
      items: [
        { name: 'Risotto de Camarão', quantity: 2, price: 68.90 },
        { name: 'Bruschetta Artesanal', quantity: 1, price: 32.90 }
      ],
      address: 'Rua das Flores, 123 - Centro'
    },
    {
      id: 'PED-002',
      date: '2024-01-14T20:15:00',
      status: 'saiu-para-entrega',
      total: 95.80,
      items: [
        { name: 'Salmão Grelhado', quantity: 1, price: 78.90 },
        { name: 'Vinho Tinto Premium', quantity: 1, price: 89.90 }
      ],
      address: 'Av. Principal, 456 - Jardins'
    },
    {
      id: 'PED-003',
      date: '2024-01-13T19:45:00',
      status: 'em-preparacao',
      total: 61.80,
      items: [
        { name: 'Carpaccio de Polvo', quantity: 1, price: 45.90 },
        { name: 'Tiramisu Premium', quantity: 1, price: 28.90 }
      ],
      address: 'Rua dos Sabores, 789 - Vila Nova'
    },
    {
      id: 'PED-004',
      date: '2024-01-12T21:00:00',
      status: 'cancelado',
      total: 45.90,
      items: [
        { name: 'Carpaccio de Polvo', quantity: 1, price: 45.90 }
      ],
      address: 'Rua das Palmeiras, 321 - Centro'
    }
  ])

  const getStatusInfo = (status) => {
    const statusMap = {
      'aguardando-pagamento': {
        label: 'Aguardando Pagamento',
        icon: Clock,
        color: 'text-warning-amber',
        bgColor: 'bg-warning-amber/10',
        borderColor: 'border-warning-amber'
      },
      'pagamento-confirmado': {
        label: 'Pagamento Confirmado',
        icon: CheckCircle,
        color: 'text-success-green',
        bgColor: 'bg-success-green/10',
        borderColor: 'border-success-green'
      },
      'em-preparacao': {
        label: 'Em Preparação',
        icon: Package,
        color: 'text-accent-gold',
        bgColor: 'bg-accent-gold/10',
        borderColor: 'border-accent-gold'
      },
      'saiu-para-entrega': {
        label: 'Saiu para Entrega',
        icon: Truck,
        color: 'text-primary-black',
        bgColor: 'bg-primary-black/10',
        borderColor: 'border-primary-black'
      },
      'entregue': {
        label: 'Entregue',
        icon: CheckCircle,
        color: 'text-success-green',
        bgColor: 'bg-success-green/10',
        borderColor: 'border-success-green'
      },
      'cancelado': {
        label: 'Cancelado',
        icon: AlertCircle,
        color: 'text-error-red',
        bgColor: 'bg-error-red/10',
        borderColor: 'border-error-red'
      }
    }
    return statusMap[status] || statusMap['aguardando-pagamento']
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleRepeatOrder = (order) => {
    console.log('Repetir pedido:', order)
    // Implementar lógica para adicionar itens ao carrinho
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-soft-gray flex items-center justify-center">
        <div className="container-main text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-background-elevated rounded-full flex items-center justify-center mx-auto mb-lg shadow-card">
              <Package size={32} className="text-text-tertiary" />
            </div>
            <h2 className="text-headline-large text-primary-black mb-md">
              Nenhum pedido encontrado
            </h2>
            <p className="text-body-medium text-text-secondary mb-xl">
              Você ainda não fez nenhum pedido. Que tal experimentar nossos pratos?
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
        <div className="mb-4xl">
          <h1 className="text-headline-large text-primary-black mb-md">
            Meus Pedidos
          </h1>
          <p className="text-body-medium text-text-secondary">
            Acompanhe o status dos seus pedidos e histórico de compras
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-lg">
          {orders.map((order) => {
            const statusInfo = getStatusInfo(order.status)
            const StatusIcon = statusInfo.icon

            return (
              <div key={order.id} className="card-product p-xl">
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-lg">
                  <div className="flex items-center space-x-lg mb-md md:mb-0">
                    <div>
                      <h3 className="text-headline-medium text-primary-black">
                        Pedido #{order.id}
                      </h3>
                      <p className="text-body-medium text-text-secondary">
                        {formatDate(order.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-lg">
                    <div className={`flex items-center space-x-2 px-md py-sm rounded-card border ${statusInfo.bgColor} ${statusInfo.borderColor}`}>
                      <StatusIcon size={16} className={statusInfo.color} />
                      <span className={`text-caption font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <span className="text-headline-medium font-semibold text-primary-black">
                      R$ {order.total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-lg">
                  <h4 className="text-body-medium font-medium text-primary-black mb-md">
                    Itens do Pedido
                  </h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-body-medium">
                        <span className="text-text-secondary">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">
                          R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="mb-lg">
                  <h4 className="text-body-medium font-medium text-primary-black mb-md">
                    Endereço de Entrega
                  </h4>
                  <p className="text-body-medium text-text-secondary">
                    {order.address}
                  </p>
                </div>

                {/* Order Actions */}
                <div className="flex flex-col sm:flex-row gap-md">
                  {order.status === 'entregue' && (
                    <button
                      onClick={() => handleRepeatOrder(order)}
                      className="btn-secondary flex-1"
                    >
                      Repetir Pedido
                    </button>
                  )}
                  
                  {(order.status === 'saiu-para-entrega' || order.status === 'em-preparacao') && (
                    <button className="btn-secondary flex-1">
                      Acompanhar Pedido
                    </button>
                  )}
                  
                  <button className="btn-secondary flex-1">
                    Ver Detalhes
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Load More */}
        <div className="text-center mt-4xl">
          <button className="btn-secondary">
            Carregar Mais Pedidos
          </button>
        </div>
      </div>
    </div>
  )
}

export default MeusPedidos