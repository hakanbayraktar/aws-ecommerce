"use client";

import { X, ShoppingBag, Trash2, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '../lib/cart/CartContext';
import { useState } from 'react';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items, removeItem, totalPrice, totalItems, clearCart } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            // SIMULATED API CALL to Order Service
            // const res = await fetch(`${process.env.NEXT_PUBLIC_ORDER_API_URL}/orders`, {
            //   method: 'POST',
            //   body: JSON.stringify({ items, total: totalPrice })
            // });

            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network lag
            alert('Order Placed Successfully! AWS Step Functions have been triggered.');
            clearCart();
            onClose();
        } catch (error) {
            alert('Checkout failed. Please check your cloud connectivity.');
        } finally {
            setIsCheckingOut(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md glass border-l border-white/10 flex flex-col shadow-2xl animate-slide-in">
                    <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between">
                        <h2 className="text-2xl font-bold flex items-center">
                            <ShoppingBag className="mr-3 w-6 h-6 text-purple-500" />
                            Your Cart <span className="ml-2 text-sm text-slate-400">({totalItems})</span>
                        </h2>
                        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                            <X className="w-6 h-6 text-slate-400" />
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto px-6 py-8 space-y-6">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
                                    <ShoppingBag className="w-8 h-8" />
                                </div>
                                <p className="text-lg font-medium">Your basket is empty of innovation.</p>
                                <button onClick={onClose} className="mt-4 text-purple-400 text-sm font-bold hover:underline">
                                    Continue exploring
                                </button>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-black/20">
                                        {/* Placeholder for item image if needed */}
                                        <div className="w-full h-full premium-gradient opacity-20" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-sm">{item.name}</h3>
                                        <p className="text-purple-400 text-xs mt-1 font-mono">${item.price} x {item.quantity}</p>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {items.length > 0 && (
                        <div className="px-6 py-8 border-t border-white/5 bg-white/5 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-400 font-medium">Total Amount</span>
                                <span className="text-2xl font-black text-white">${totalPrice.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                                className="w-full premium-gradient py-4 rounded-2xl font-bold flex items-center justify-center shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-transform group disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {isCheckingOut ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>
                            <p className="text-center text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                Secure cloud-native checkout
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
