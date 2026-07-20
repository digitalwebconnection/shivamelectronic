import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart, ShoppingBag, ArrowLeft, MessageSquare, CheckCircle2 } from 'lucide-react';
import type { CartItem, User as UserType, Order } from '../types';

import { API_URL } from '../config';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  user: UserType | null;
  onPromptAuth: () => void;
  onPlaceOrder: (order: Order) => void;
  onStartShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  user,
  onPromptAuth,
  onPlaceOrder,
  onStartShopping,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState('');

  const cartSubtotal = cartItems.reduce((sum, item) => sum + ((item.product.price || 0) * item.quantity), 0);

  // Sync user details if logged in
  useEffect(() => {
    if (user) {
      setCustomerName(user.name);
    } else {
      setCustomerName('');
    }
  }, [user]);

  // Reset checkout view on drawer state transition
  useEffect(() => {
    if (!isOpen) {
      setIsCheckingOut(false);
      setOrderSuccessId(null);
    }
  }, [isOpen]);

  const handleWhatsAppCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Please fill in all required fields.');
      return;
    }

    if (customerPhone.length !== 10) {
      alert('Please enter a valid 10-digit WhatsApp / Phone Number.');
      return;
    }

    const newOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: newOrderId,
      orderId: newOrderId,
      customerName,
      customerEmail: user?.email || '',
      customerPhone,
      customerAddress,
      customerNote,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
      status: 'Pending',
      total: cartSubtotal,
      totalAmount: cartSubtotal,
      totalQuantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      paymentMethod: 'Cash on Delivery',
      items: cartItems.map(item => ({
        product: item.product,
        productName: item.product.name,
        brand: item.product.brand,
        category: item.product.category,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image
      }))
    };

    // Persist order to backend DB
    try {
      await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: newOrderId,
          customerName,
          customerEmail: user?.email || 'guest@shivam.com',
          customerPhone,
          customerAddress,
          customerNote,
          items: cartItems.map(item => ({
            product: item.product,
            productName: item.product.name,
            brand: item.product.brand,
            category: item.product.category,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.image
          })),
          totalAmount: cartSubtotal,
          paymentMethod: 'Cash on Delivery',
          user: user
        })
      });
    } catch (err) {
      console.error('Failed to post order to backend server:', err);
    }

    // Store in global order history
    onPlaceOrder(newOrder);

    // Show success view
    setOrderSuccessId(newOrderId);

    const storePhone = '919601072015'; // Flagship Hotline from Contact Center
    let itemsText = '';
    cartItems.forEach((item, idx) => {
      itemsText += `${idx + 1}. *${item.product.name}*\n` +
                   `   Brand: ${item.product.brand} | Category: ${item.product.category.toUpperCase()}\n` +
                   `   Qty: ${item.quantity}\n\n`;
    });

    const message = `🛍️ *NEW INQUIRY - Shivam Electronic World*\n` +
      `-----------------------------------------\n` +
      `🆔 *Order ID:* ${newOrderId}\n` +
      `👤 *Customer Name:* ${customerName}\n` +
      `📞 *Phone Number:* ${customerPhone}\n` +
      `📍 *Delivery Address:* ${customerAddress}\n` +
      (customerNote ? `💬 *Customer Note:* ${customerNote}\n` : '') +
      `-----------------------------------------\n` +
      `🛒 *Requested Items:* \n\n${itemsText}` +
      `-----------------------------------------\n` +
      `💬 *Final Quote:* Pricing on request / Wholesale Quote\n\n` +
      `Please confirm availability, wholesale discounts, and dispatch details. Thank you!`;

    setLastMessage(message);

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${storePhone}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white border-l border-slate-200 shadow-2xl transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            {isCheckingOut ? (
              <button 
                onClick={() => setIsCheckingOut(false)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors mr-2 p-1 hover:bg-slate-100 rounded-md cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            )}
            <h2 className="text-lg font-bold text-slate-900">
              {isCheckingOut ? 'Checkout Details' : 'Your Cart'}
            </h2>
            {!isCheckingOut && (
              <span className="bg-blue-100 text-blue-600 border border-blue-200 text-xs font-semibold px-2 py-0.5 rounded-full">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          {orderSuccessId ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-2 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-black text-slate-900">Order Placed!</h3>
              <p className="text-xs text-slate-500 max-w-[280px] leading-relaxed font-medium">
                Thank you for your order. Your components have been reserved, and your order has been logged in your profile history.
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-md p-4 w-full text-left space-y-2.5">
                <div className="flex justify-between text-xs text-slate-400 font-bold">
                  <span>ORDER ID</span>
                  <span className="text-slate-800 font-mono">{orderSuccessId}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 font-bold">
                  <span>TOTAL AMOUNT</span>
                  <span className="text-blue-600 font-extrabold uppercase tracking-wide">Quote on Request</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 font-bold">
                  <span>PAYMENT METHOD</span>
                  <span className="text-slate-800 font-medium">Cash on Delivery / Request Quote</span>
                </div>
              </div>

              <div className="pt-4 w-full space-y-2">
                <button
                  onClick={() => {
                    const storePhone = '919601072015';
                    const whatsappUrl = `https://wa.me/${storePhone}?text=${encodeURIComponent(lastMessage)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20 active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-green/30 text-white animate-pulse" />
                  <span>Open WhatsApp Details</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-md transition-all cursor-pointer active:scale-95 border border-slate-800"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : isCheckingOut ? (
            <form id="checkout-form" onSubmit={handleWhatsAppCheckout} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-900 placeholder-slate-400 rounded-md transition-all outline-none text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  WhatsApp / Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => {
                    const val = e.target.value;
                    const digits = val.replace(/\D/g, '');
                    setCustomerPhone(digits.slice(0, 10));
                  }}
                  pattern="[0-9]{10}"
                  maxLength={10}
                  inputMode="numeric"
                  placeholder="e.g. 9601072015"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-900 placeholder-slate-400 rounded-md transition-all outline-none text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Street address, City, ZIP Code"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-900 placeholder-slate-400 rounded-md transition-all outline-none text-sm resize-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Order Note (Optional)
                </label>
                <textarea
                  rows={2}
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="Add any specific instructions or requirements..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-900 placeholder-slate-400 rounded-md transition-all outline-none text-sm resize-none font-medium"
                />
              </div>
            </form>
          ) : cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center pb-12">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">Your cart is empty</h3>
              <p className="text-sm text-slate-500 max-w-[250px] mb-6 font-medium">
                Looks like you haven't added any electronic components to your cart yet.
              </p>
              <button 
                onClick={onStartShopping}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-md transition-all cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={item.product.id}
                className="flex gap-4 p-3 bg-slate-50/50 border border-slate-200 rounded-md hover:border-slate-300 transition-colors text-left"
              >
                {/* Product Image */}
                <div className="w-20 h-20 rounded-md overflow-hidden bg-white shrink-0">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-blue-600 uppercase tracking-widest font-bold">
                      {item.product.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-white border border-slate-200 rounded-md p-0.5">
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="p-1 text-slate-450 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs text-slate-800 font-semibold select-none">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="p-1 text-slate-450 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Trash Button */}
                    <button 
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && !orderSuccessId && (
          <div className="p-5 border-t border-slate-200 bg-slate-50/90 backdrop-blur-md">
            <div className="space-y-3 mb-6 text-left">
              <div className="flex justify-between text-sm text-slate-500">
                <span className="font-semibold text-slate-700">Wholesale Order</span>
                <span className="text-blue-600 font-extrabold uppercase tracking-wide">Quote on Request</span>
              </div>
            </div>

            {isCheckingOut ? (
              <button 
                type="submit"
                form="checkout-form"
                className="w-full py-3 bg-linear-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold rounded-md transition-all duration-300 shadow-lg shadow-green-500/20 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                <span>Send Inquiry on WhatsApp</span>
              </button>
            ) : (
              <button 
                onClick={() => {
                  if (!user) {
                    onPromptAuth();
                  } else {
                    setIsCheckingOut(true);
                  }
                }}
                className="w-full py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-md transition-all duration-300 shadow-lg shadow-blue-500/20 active:scale-[0.98] text-sm cursor-pointer"
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};
