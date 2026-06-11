import { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send } from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice } from '../utils/price';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  onRemoveItem: (productId: string, selectedColor?: string) => void;
  darkMode: boolean;
  setCurrentTab: (tab: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  darkMode,
  setCurrentTab
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 150 ? 0 : 5.00; // Free delivery for orders over $150
  const total = subtotal + deliveryFee;

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('New Georgia Estate, Monrovia, Liberia');
  const [checkoutError, setCheckoutError] = useState('');

  const handleCheckoutOnWhatsApp = () => {
    if (cart.length === 0) return;

    if (!showCheckoutForm) {
      setShowCheckoutForm(true);
      return;
    }

    if (!customerName || !customerPhone || !customerEmail || !deliveryLocation) {
      setCheckoutError('Please provide your name, phone, email, and location for deliveries!');
      return;
    }

    setCheckoutError('');

    // Generate formatted item lists
    const itemsLines = cart.map((item, idx) => {
      const colorText = item.selectedColor ? ` (Color: ${item.selectedColor})` : '';
      const itemPrice = formatPrice(item.product.price);
      const totalItemVal = formatPrice(item.product.price * item.quantity);
      return `${idx + 1}. *${item.product.name}*${colorText}\n    Qty: ${item.quantity} x $${itemPrice} = *$${totalItemVal}*`;
    }).join('\n');

    const messageTemplate = 
`*NEW ORDER - ALLAH IS GREAT ELECTRONICS*
---------------------------------------
Hello! I would like to place an order for the following items:

${itemsLines}

---------------------------------------
*Subtotal:* $${formatPrice(subtotal)}
*Delivery:* ${deliveryFee === 0 ? '_Free Delivery (Promo)_' : `$${formatPrice(deliveryFee)}`}
*Total Order Value:* *$${formatPrice(total)}*

*Customer Details:*
- Client Name: ${customerName}
- WhatsApp Phone: ${customerPhone}
- Email Inbox: ${customerEmail}
- Delivery Location: ${deliveryLocation}

Please confirm stock availability and pickup details. Thank you!`;

    // 1. Log the order into LocalStorage so the Admin Dashboard receives it in real-time
    try {
      const currentOrdersRaw = localStorage.getItem('allah_is_great_orders');
      const orderList = currentOrdersRaw ? JSON.parse(currentOrdersRaw) : [];
      
      const newOrder = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName,
        customerPhone,
        customerEmail,
        deliveryLocation,
        items: cart.map(item => ({
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          selectedColor: item.selectedColor
        })),
        subtotal,
        deliveryFee,
        total,
        status: 'pending' as const,
        createdAt: new Date().toISOString()
      };

      orderList.unshift(newOrder);
      localStorage.setItem('allah_is_great_orders', JSON.stringify(orderList));
      // Trigger a storage event so if the admin is on another tab/view, it auto syncs
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error('Failed to log transaction locally:', err);
    }

    const formattedLink = `https://wa.me/231776070131?text=${encodeURIComponent(messageTemplate)}`;
    window.open(formattedLink, '_blank');
    
    // Reset checkout form and close drawer nicely
    setShowCheckoutForm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 overflow-hidden">
      {/* Overlay backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer chassis sliding from right */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className={`w-screen max-w-md transform transition-all duration-300 ${
          darkMode ? 'bg-slate-900 text-slate-100 border-l border-slate-800' : 'bg-white text-slate-800 border-l border-slate-200'
        }`}>
          
          <div className="h-full flex flex-col shadow-2xl">
            {/* Header */}
            <div className={`px-6 py-5 flex items-center justify-between border-b ${
              darkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-100 bg-slate-50'
            }`}>
              <div className="flex items-center space-x-2.5">
                <ShoppingBag className="text-amber-500" size={20} />
                <h2 className="text-lg font-black tracking-wide">Your Shopping Cart</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart body items or Checkout form */}
            <div className="flex-1 py-4 overflow-y-auto px-6 space-y-4">
              {showCheckoutForm ? (
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between border-b pb-2 mb-2 border-dashed border-slate-700">
                    <h3 className="text-xs font-black uppercase tracking-wider text-amber-500">Delivery Details</h3>
                    <button 
                      onClick={() => setShowCheckoutForm(false)}
                      className="text-xs text-slate-400 hover:text-amber-500 underline font-bold"
                    >
                      Back to Cart Items
                    </button>
                  </div>

                  {checkoutError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-500">
                      {checkoutError}
                    </div>
                  )}

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="E.g., Jefferson Flomo"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className={`py-2 px-3 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">WhatsApp Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="E.g., +231776899401"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className={`py-2 px-3 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="E.g., jflomo@gmail.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className={`py-2 px-3 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Monrovia Delivery Address *</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="E.g., Block E, New Georgia Estate, Monrovia, Liberia"
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                      className={`py-2 px-3 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                </div>
              ) : (
                cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
                    <div className="p-4 bg-amber-500/10 rounded-full text-amber-500">
                      <ShoppingBag size={48} />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Your cart is empty</p>
                      <p className="text-sm text-slate-400 mt-1 max-w-xs">
                        Explore our premium smartphones, electrical fittings, and accessories to fill up!
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentTab('products');
                        onClose();
                      }}
                      className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-md"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div 
                      key={`${item.product.id}-${item.selectedColor || ''}-${index}`}
                      className={`flex items-start gap-4 p-3 rounded-xl border transition-all ${
                        darkMode ? 'bg-slate-950/40 border-slate-800 hover:border-slate-700' : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Thumbnail image */}
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-16 h-16 object-cover rounded-lg shrink-0 border border-slate-200/50 dark:border-slate-800"
                      />

                      {/* Meta info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold truncate pr-3">{item.product.name}</h4>
                        {item.selectedColor && (
                          <div className="flex items-center space-x-1.5 mt-1">
                            <span className="text-[10px] uppercase text-slate-400 font-mono">Color:</span>
                            <span className="text-xs text-slate-300 font-semibold">{item.selectedColor}</span>
                          </div>
                        )}
                        <p className="text-amber-500 font-bold text-sm mt-1.5">${formatPrice(item.product.price)}</p>
                        
                        {/* Quantity Increments */}
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1), item.selectedColor)}
                            className={`p-1 rounded transition-colors ${
                              darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                            }`}
                          >
                            <Minus size={11} />
                          </button>
                          <span className="text-xs font-bold font-mono px-1.5">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                            className={`p-1 rounded transition-colors ${
                              darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                            }`}
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                      </div>

                      {/* Delete item button */}
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedColor)}
                        className="text-slate-400 hover:text-red-500 p-1.5 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )
              )}
            </div>

            {/* Calculations & Order Trigger */}
            {cart.length > 0 && (
              <div className={`px-6 py-6 border-t space-y-4 ${
                darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="space-y-2 text-xs font-semibold">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-sm font-bold text-slate-300">${formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Est. Delivery</span>
                    <span className="font-mono text-sm font-bold text-slate-300">
                      {deliveryFee === 0 ? <span className="text-emerald-500 uppercase tracking-widest text-[10px]">Free (Orders &gt;$150)</span> : `$${formatPrice(deliveryFee)}`}
                    </span>
                  </div>
                  <div className="border-t border-dashed border-slate-800/80 pt-2 flex items-center justify-between text-base">
                    <span className="text-white font-black font-sans">Total</span>
                    <span className="font-mono font-black text-amber-500">${formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckoutOnWhatsApp}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 hover:scale-101 text-slate-950 font-black tracking-wide text-sm flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-98 cursor-pointer"
                >
                  <Send size={16} />
                  <span>{showCheckoutForm ? 'Confirm & Send on WhatsApp' : 'Provide Delivery Details'}</span>
                </button>

                <p className="text-[10px] text-center text-slate-500 leading-normal">
                  Your structured cart data will be formatted into a WhatsApp order request. Press "Send" in WhatsApp to submit.
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
