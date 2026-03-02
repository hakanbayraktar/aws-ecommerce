"use client";

import { ShoppingCart, Search, User, LogOut } from 'lucide-react';
import { useCart } from '../lib/cart/CartContext';
import { useAuth } from '../lib/auth/AuthContext';
import Link from 'next/link';

export default function Header() {
    const { totalItems } = useCart();
    const { user, logout } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 border-b border-white/5 bg-black/20 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                        <ShoppingCart className="text-white w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-white">DEVOPS<span className="text-purple-500">STORE</span></span>
                </Link>

                <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
                    <Link href="/" className="hover:text-white transition-colors">Infrastructure</Link>
                    <Link href="/" className="hover:text-white transition-colors">Services</Link>
                    <Link href="/" className="hover:text-white transition-colors">Cloud Tools</Link>
                </div>

                <div className="flex items-center space-x-6">
                    <div className="relative group">
                        <button className="p-2 hover:bg-white/5 rounded-xl transition-colors relative">
                            <ShoppingCart className="w-5 h-5 text-slate-400 group-hover:text-white" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-purple-600 text-[10px] font-bold flex items-center justify-center border-2 border-black text-white animate-pulse">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center overflow-hidden">
                                <User className="w-4 h-4 text-purple-400" />
                            </div>
                            <button onClick={logout} className="p-2 hover:bg-red-500/10 rounded-xl transition-colors text-red-400/70 hover:text-red-400">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="flex items-center space-x-2 glass px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">
                            <User className="w-4 h-4" />
                            <span>Sign In</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
