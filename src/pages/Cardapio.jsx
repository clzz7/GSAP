import { useState, useEffect } from 'react'
import { Search, Filter, Plus, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Cardapio = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

  // Mock data - será substituído pela integração com Supabase
  const categories = [
    { id: 'todos', name: 'Todos', count: 24 },
    { id: 'entradas', name: 'Entradas', count: 6 },
    { id: 'pratos-principais', name: 'Pratos Principais', count: 8 },
    { id: 'sobremesas', name: 'Sobremesas', count: 4 },
    { id: 'bebidas', name: 'Bebidas', count: 6 },
  ]

  const products = [
    {
      id: 1,
      name: 'Risotto de Camarão',
      description: 'Risotto cremoso com camarões frescos, aspargos e parmesão envelhecido',
      price: 68.90,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'pratos-principais',
      rating: 4.8,
      isAvailable: true
    },
    {
      id: 2,
      name: 'Bruschetta Artesanal',
      description: 'Pão artesanal tostado com tomates confitados, manjericão e burrata',
      price: 32.90,
      image: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'entradas',
      rating: 4.9,
      isAvailable: true
    },
    {
      id: 3,
      name: 'Salmão Grelhado',
      description: 'Salmão grelhado com crosta de ervas, purê de batata-doce e legumes',
      price: 78.90,
      image: 'https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'pratos-principais',
      rating: 4.7,
      isAvailable: true
    },
    {
      id: 4,
      name: 'Tiramisu Premium',
      description: 'Tiramisu tradicional com café expresso e mascarpone italiano',
      price: 28.90,
      image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'sobremesas',
      rating: 4.9,
      isAvailable: true
    },
    {
      id: 5,
      name: 'Vinho Tinto Premium',
      description: 'Cabernet Sauvignon reserva especial, safra 2019',
      price: 89.90,
      image: 'https://images.pexels.com/photos/434311/pexels-photo-434311.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'bebidas',
      rating: 4.6,
      isAvailable: true
    },
    {
      id: 6,
      name: 'Carpaccio de Polvo',
      description: 'Fatias finas de polvo com azeite trufado, rúcula e lascas de parmesão',
      price: 45.90,
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'entradas',
      rating: 4.8,
      isAvailable: false
    }
  ]

  useEffect(() => {
    let filtered = products

    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, searchTerm])

  const handleAddToCart = (product) => {
    // Implementar lógica do carrinho
    console.log('Adicionado ao carrinho:', product)
  }

  return (
    <div className="min-h-screen pt-20 bg-soft-gray">
      <div className="container-main py-xl">
        {/* Header */}
        <div className="text-center mb-4xl">
          <h1 className="text-headline-large text-primary-black mb-lg animate-on-scroll">
            Nosso Cardápio
          </h1>
          <p className="text-body-large text-text-secondary max-w-2xl mx-auto animate-on-scroll">
            Descubra sabores únicos criados pelos nossos chefs com ingredientes 
            selecionados e técnicas refinadas.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-4xl space-y-lg">
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
              <input
                type="text"
                placeholder="Buscar pratos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field w-full pl-12"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-md">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-lg py-md rounded-card text-button font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-black text-pure-white'
                    : 'bg-background-elevated text-text-secondary hover:bg-soft-gray hover:text-primary-black'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-70">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
          <AnimatePresence mode="wait">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="card-product overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {!product.isAvailable && (
                    <div className="absolute inset-0 bg-primary-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-pure-white font-medium">Indisponível</span>
                    </div>
                  )}
                  <div className="absolute top-md right-md bg-background-elevated rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star size={14} className="fill-accent-gold text-accent-gold" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-lg">
                  <h3 className="text-headline-medium text-primary-black mb-md group-hover:text-accent-gold transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-body-medium text-text-secondary mb-lg leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-headline-medium font-semibold text-primary-black">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.isAvailable}
                      className={`btn-icon ${
                        product.isAvailable
                          ? 'bg-accent-gold text-primary-black hover:bg-warning-amber'
                          : 'bg-border-light text-text-tertiary cursor-not-allowed'
                      }`}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-4xl">
            <div className="w-24 h-24 bg-soft-gray rounded-full flex items-center justify-center mx-auto mb-lg">
              <Search size={32} className="text-text-tertiary" />
            </div>
            <h3 className="text-headline-medium text-primary-black mb-md">
              Nenhum produto encontrado
            </h3>
            <p className="text-body-medium text-text-secondary">
              Tente ajustar sua busca ou selecionar uma categoria diferente.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cardapio