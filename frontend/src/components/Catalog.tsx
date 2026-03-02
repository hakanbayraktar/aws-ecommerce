"use client";

import { useEffect, useState } from 'react';
import { ShoppingCart, Zap } from 'lucide-react';
import { useCart } from '../lib/cart/CartContext';
import { useSearch } from '../lib/search/SearchContext';

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();
    const { searchTerm } = useSearch();

    useEffect(() => {
        // In a real scenario, this would call the Search Service
        // which aggregates data from OpenSearch
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
                const query = searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : '';
                const res = await fetch(`${apiUrl}/search${query}`);
                if (!res.ok) throw new Error('Failed to fetch from Search Service');
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error('Failed to fetch products, using fallback mock data', err);
                const mockData = [
                    { id: '1', name: 'Cloud-Native Hoodie', price: 59, description: 'Premium heavyweight cotton with AWS-inspired art.', image: '/api/images/hoodie.png' },
                    { id: '2', name: 'DevOps Atolyesi Desk Mat', price: 35, description: 'Extra large workspace mat for architects.', image: '/api/images/deskmat.png' },
                    { id: '3', name: 'Infinite Scaling Mug', price: 18, description: 'Double-walled ceramic for long coding sessions.', image: '/api/images/mug.png' },
                ];
                const filtered = searchTerm
                    ? mockData.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    : mockData;
                setProducts(filtered);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchTerm]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="glass p-6 rounded-[2rem] animate-pulse">
                        <div className="w-full h-48 rounded-2xl bg-white/5 mb-6" />
                        <div className="h-6 w-3/4 bg-white/5 rounded-lg mb-4" />
                        <div className="h-4 w-full bg-white/5 rounded-lg mb-2" />
                        <div className="h-4 w-2/3 bg-white/5 rounded-lg mb-8" />
                        <div className="h-12 w-full bg-white/5 rounded-xl" />
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0 && !loading) {
        return (
            <div className="text-center py-20 opacity-50 flex flex-col items-center">
                <Zap className="w-12 h-12 mb-4 text-purple-500" />
                <p className="text-xl font-bold">No components found in this region.</p>
                <button onClick={() => useSearch().setSearchTerm('')} className="mt-4 text-purple-400 hover:underline">Clear search</button>
            </div>
        );
    }

    return (
        <div id="catalog" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
                <div key={product.id} className="glass p-6 rounded-[2rem] group hover:border-purple-500/50 transition-all flex flex-col">
                    <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 bg-white/5 relative">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-4 right-4 glass p-2 rounded-xl text-xs font-bold premium-gradient">
                            ${product.price}
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-slate-400 text-sm mb-6 flex-grow">{product.description}</p>
                    <button
                        onClick={() => addItem(product)}
                        className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:premium-gradient hover:border-transparent transition-all font-bold flex items-center justify-center group/btn"
                    >
                        Add to Cart <ShoppingCart className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            ))}
        </div>
    );
}
