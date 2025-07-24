import { useState } from 'react'
import { BarChart3, Package, Users, Settings, Plus, Edit, Trash2 } from 'lucide-react'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard')

  // Mock data
  const [stats] = useState({
    todayOrders: 24,
    todayRevenue: 1850.40,
    activeProducts: 18,
    totalCustomers: 156
  })

  const [orders] = useState([
    {
      id: 'PED-001',
      customer: 'Maria Silva',
      items: 3,
      total: 170.80,
      status: 'em-preparacao',
      time: '18:30'
    },
    {
      id: 'PED-002',
      customer: 'João Santos',
      items: 2,
      total: 95.80,
      status: 'saiu-para-entrega',
      time: '18:15'
    }
  ])

  const [products] = useState([
    {
      id: 1,
      name: 'Risotto de Camarão',
      price: 68.90,
      category: 'Pratos Principais',
      status: 'ativo'
    },
    {
      id: 2,
      name: 'Bruschetta Artesanal',
      price: 32.90,
      category: 'Entradas',
      status: 'ativo'
    }
  ])

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'orders', name: 'Pedidos', icon: Package },
    { id: 'products', name: 'Produtos', icon: Package },
    { id: 'customers', name: 'Clientes', icon: Users },
    { id: 'settings', name: 'Configurações', icon: Settings }
  ]

  const getStatusColor = (status) => {
    const colors = {
      'aguardando-pagamento': 'text-warning-amber bg-warning-amber/10',
      'em-preparacao': 'text-accent-gold bg-accent-gold/10',
      'saiu-para-entrega': 'text-primary-black bg-primary-black/10',
      'entregue': 'text-success-green bg-success-green/10',
      'cancelado': 'text-error-red bg-error-red/10'
    }
    return colors[status] || colors['aguardando-pagamento']
  }

  const updateOrderStatus = (orderId, newStatus) => {
    console.log('Atualizando status do pedido:', orderId, newStatus)
    // Implementar lógica de atualização
  }

  return (
    <div className="min-h-screen pt-20 bg-soft-gray">
      <div className="container-main py-xl">
        {/* Header */}
        <div className="mb-4xl">
          <h1 className="text-headline-large text-primary-black mb-md">
            Painel Administrativo
          </h1>
          <p className="text-body-medium text-text-secondary">
            Gerencie pedidos, produtos e configurações do restaurante
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-xl">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-product p-lg sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-md py-3 rounded-card text-left transition-colors duration-300 ${
                        activeTab === tab.id
                          ? 'bg-primary-black text-pure-white'
                          : 'text-text-secondary hover:bg-soft-gray hover:text-primary-black'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-body-medium font-medium">{tab.name}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="space-y-xl">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
                  <div className="card-product p-lg text-center">
                    <h3 className="text-caption text-text-tertiary mb-2">Pedidos Hoje</h3>
                    <p className="text-headline-large font-semibold text-primary-black">
                      {stats.todayOrders}
                    </p>
                  </div>
                  <div className="card-product p-lg text-center">
                    <h3 className="text-caption text-text-tertiary mb-2">Receita Hoje</h3>
                    <p className="text-headline-large font-semibold text-success-green">
                      R$ {stats.todayRevenue.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <div className="card-product p-lg text-center">
                    <h3 className="text-caption text-text-tertiary mb-2">Produtos Ativos</h3>
                    <p className="text-headline-large font-semibold text-primary-black">
                      {stats.activeProducts}
                    </p>
                  </div>
                  <div className="card-product p-lg text-center">
                    <h3 className="text-caption text-text-tertiary mb-2">Total Clientes</h3>
                    <p className="text-headline-large font-semibold text-primary-black">
                      {stats.totalCustomers}
                    </p>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="card-product p-xl">
                  <h2 className="text-headline-medium text-primary-black mb-xl">
                    Pedidos Recentes
                  </h2>
                  <div className="space-y-lg">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-lg bg-soft-gray rounded-card">
                        <div>
                          <h3 className="text-body-medium font-medium text-primary-black">
                            {order.id} - {order.customer}
                          </h3>
                          <p className="text-caption text-text-tertiary">
                            {order.items} itens • {order.time}
                          </p>
                        </div>
                        <div className="flex items-center space-x-lg">
                          <span className="text-body-medium font-semibold">
                            R$ {order.total.toFixed(2).replace('.', ',')}
                          </span>
                          <span className={`px-3 py-1 rounded-card text-caption font-medium ${getStatusColor(order.status)}`}>
                            {order.status.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Orders Management */}
            {activeTab === 'orders' && (
              <div className="card-product p-xl">
                <div className="flex items-center justify-between mb-xl">
                  <h2 className="text-headline-medium text-primary-black">
                    Gerenciar Pedidos
                  </h2>
                </div>

                <div className="space-y-lg">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-border-light rounded-card p-lg">
                      <div className="flex items-center justify-between mb-lg">
                        <div>
                          <h3 className="text-headline-medium text-primary-black">
                            {order.id}
                          </h3>
                          <p className="text-body-medium text-text-secondary">
                            Cliente: {order.customer} • {order.time}
                          </p>
                        </div>
                        <span className="text-headline-medium font-semibold">
                          R$ {order.total.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-md">
                        <button
                          onClick={() => updateOrderStatus(order.id, 'em-preparacao')}
                          className="btn-secondary text-sm"
                        >
                          Em Preparação
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'saiu-para-entrega')}
                          className="btn-secondary text-sm"
                        >
                          Saiu para Entrega
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'entregue')}
                          className="btn-secondary text-sm"
                        >
                          Entregue
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Products Management */}
            {activeTab === 'products' && (
              <div className="card-product p-xl">
                <div className="flex items-center justify-between mb-xl">
                  <h2 className="text-headline-medium text-primary-black">
                    Gerenciar Produtos
                  </h2>
                  <button className="btn-primary flex items-center">
                    <Plus size={18} className="mr-2" />
                    Novo Produto
                  </button>
                </div>

                <div className="space-y-lg">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-lg bg-soft-gray rounded-card">
                      <div>
                        <h3 className="text-body-medium font-medium text-primary-black">
                          {product.name}
                        </h3>
                        <p className="text-caption text-text-tertiary">
                          {product.category} • R$ {product.price.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-md">
                        <span className={`px-3 py-1 rounded-card text-caption font-medium ${
                          product.status === 'ativo' 
                            ? 'text-success-green bg-success-green/10' 
                            : 'text-error-red bg-error-red/10'
                        }`}>
                          {product.status}
                        </span>
                        <button className="btn-icon">
                          <Edit size={16} />
                        </button>
                        <button className="btn-icon text-error-red">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div className="card-product p-xl">
                <h2 className="text-headline-medium text-primary-black mb-xl">
                  Configurações
                </h2>

                <div className="space-y-xl">
                  <div>
                    <h3 className="text-body-medium font-medium text-primary-black mb-lg">
                      Webhooks N8N
                    </h3>
                    <div className="space-y-md">
                      <div>
                        <label className="block text-body-medium text-text-secondary mb-md">
                          URL Webhook Novo Pedido
                        </label>
                        <input
                          type="url"
                          placeholder="https://n8n.exemplo.com/webhook/novo-pedido"
                          className="input-field w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-body-medium text-text-secondary mb-md">
                          URL Webhook Status Atualizado
                        </label>
                        <input
                          type="url"
                          placeholder="https://n8n.exemplo.com/webhook/status-pedido"
                          className="input-field w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-body-medium font-medium text-primary-black mb-lg">
                      Informações do Restaurante
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                      <div>
                        <label className="block text-body-medium text-text-secondary mb-md">
                          Nome do Restaurante
                        </label>
                        <input
                          type="text"
                          defaultValue="Delivery Premium"
                          className="input-field w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-body-medium text-text-secondary mb-md">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          defaultValue="(11) 99999-9999"
                          className="input-field w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <button className="btn-primary">
                    Salvar Configurações
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin