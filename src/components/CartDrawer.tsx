import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart, ShoppingBag, ArrowLeft, MessageSquare } from 'lucide-react';
import type { CartItem, User as UserType } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  user: UserType | null;
  onPromptAuth: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  user,
  onPromptAuth,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNote, setCustomerNote] = useState('');

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
    }
  }, [isOpen]);

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Please fill in all required fields.');
      return;
    }

    const storePhone = '919601072015'; // Flagship Hotline from Contact Center
    let itemsText = '';
    cartItems.forEach((item, idx) => {
      itemsText += `${idx + 1}. *${item.product.name}*\n   Qty: ${item.quantity}\n`;
    });

    const message = `🛍️ *NEW ORDER INQUIRY - Shivam Electronic World*\n` +
      `-----------------------------------------\n` +
      `👤 *Customer Name:* ${customerName}\n` +
      `📞 *Phone Number:* ${customerPhone}\n` +
      `📍 *Delivery Address:* ${customerAddress}\n` +
      (customerNote ? `💬 *Customer Note:* ${customerNote}\n` : '') +
      `-----------------------------------------\n` +
      `🛒 *Items:* \n${itemsText}\n` +
      `-----------------------------------------\n` +
      `🚚 *Shipping:* FREE\n` +
      `💵 *Pricing:* On Request via WhatsApp\n\n` +
      `Please confirm availability and dispatch details. Thank you!`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${storePhone}&text=${encodedText}`;
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
                className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors mr-2 p-1 hover:bg-slate-100 rounded-lg"
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
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          {isCheckingOut ? (
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
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-900 placeholder-slate-400 rounded-xl transition-all outline-none text-sm font-medium"
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
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. +91 96010 72015"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-900 placeholder-slate-400 rounded-xl transition-all outline-none text-sm font-medium"
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
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-900 placeholder-slate-400 rounded-xl transition-all outline-none text-sm resize-none font-medium"
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
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-900 placeholder-slate-400 rounded-xl transition-all outline-none text-sm resize-none font-medium"
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
                Looks like you haven't added any electronic goodies to your cart yet.
              </p>
              <button 
                onClick={onClose}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={item.product.id}
                className="flex gap-4 p-3 bg-slate-50/50 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors text-left"
              >
                {/* Product Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0 border border-slate-150">
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
                    <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5">
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
                      className="p-1 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
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
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50/90 backdrop-blur-md">
            <div className="space-y-3 mb-6 text-left">
              <div className="flex justify-between text-sm text-slate-500">
                <span className="font-semibold">Inquiry Order</span>
                <span className="text-blue-600 font-extrabold uppercase tracking-wide">Price On Request</span>
              </div>
            </div>

            {isCheckingOut ? (
              <button 
                type="submit"
                form="checkout-form"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-green-500/20 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-sm"
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
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 active:scale-[0.98] text-sm cursor-pointer"
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
