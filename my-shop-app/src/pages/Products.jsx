import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [addedItems, setAddedItems] = useState(new Set());

  // Format currency helper
  const formatCurrency = (cents) => {
    return (cents / 100).toFixed(2);
  };

  // Load products from API
  const loadProducts = async () => {
    try {
      const response = await fetch('https://supersimplebackend.dev/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading products:', error);
      // Fallback to mock data for demo
      setProducts([
        {
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          image: "https://via.placeholder.com/300x300?text=Product+1",
          name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
          rating: { stars: 4.5, count: 87 },
          priceCents: 1090
        },
        {
          id: "15b6fc6f-327a-4ec4-896f-486349e85a3d", 
          image: "https://via.placeholder.com/300x300?text=Product+2",
          name: "Intermediate Size Basketball",
          rating: { stars: 4, count: 127 },
          priceCents: 2095
        },
        {
          id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
          image: "https://via.placeholder.com/300x300?text=Product+3", 
          name: "Adults Plain Cotton T-Shirt - 2 Pack",
          rating: { stars: 4.5, count: 56 },
          priceCents: 799
        }
      ]);
      setLoading(false);
    }
  };

  // Add item to cart
  const addItemToCart = (productId) => {
    const quantitySelector = document.querySelector(`.product-quantity-selector-${productId}`);
    const quantity = parseInt(quantitySelector?.value || 1);
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { productId, quantity }];
      }
    });

    // Show "Added" message
    setAddedItems(prev => new Set([...prev, productId]));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }, 2000);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="main p-6">
      <div className="mb-4 text-right">
        <span className="bg-blue-500 text-white px-3 py-1 rounded">
          Cart: {cart.reduce((total, item) => total + item.quantity, 0)} items
        </span>
      </div>
      
      <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="product-container bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="product-image-container mb-4">
              <img 
                className="product-image w-full h-48 object-cover rounded"
                src={product.image}
                alt={product.name}
              />
            </div>

            <div className="product-name limit-text-to-2-lines text-sm font-medium mb-2 line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </div>

            <div className="product-rating-container flex items-center mb-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.floor(product.rating.stars)
                        ? 'text-yellow-400'
                        : star <= product.rating.stars
                        ? 'text-yellow-200'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="product-rating-count text-blue-600 text-sm ml-2">
                {product.rating.count}
              </div>
            </div>

            <div className="product-price text-lg font-bold mb-4">
              ${formatCurrency(product.priceCents)}
            </div>

            <div className="product-quantity-container mb-4">
              <select className={`product-quantity-selector-${product.id} border border-gray-300 rounded px-2 py-1 text-sm`}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className="product-spacer mb-2"></div>

            {addedItems.has(product.id) && (
              <div className={`added-to-cart item-${product.id}-added-to-cart text-green-600 text-sm mb-2 flex items-center`}>
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Added
              </div>
            )}

            <button 
              className="add-to-cart-button button-primary w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded transition-colors"
              onClick={() => addItemToCart(product.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;