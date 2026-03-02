"use client";

import { useEffect, useState } from 'react';
import { ShoppingCart, Zap } from 'lucide-react';
import { useCart } from '../lib/cart/CartContext';

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

    useEffect(() => {
        // In a real scenario, this would call the Search Service
        // which aggregates data from OpenSearch
        const fetchProducts = async () => {
            try {
                // SIMULATED API CALL to Search Service
                // const res = await fetch(`${process.env.NEXT_PUBLIC_SEARCH_API_URL}/search`);
                // const data = await res.json();

                const mockData = [
                    { id: '1', name: 'Cloud-Native Hoodie', price: 59, description: 'Premium heavyweight cotton with AWS-inspired art.', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400' },
                    { id: '2', name: 'DevOps Atolyesi Desk Mat', price: 35, description: 'Extra large workspace mat for architects.', image: 'https://images.unsplash.com/photo-1616627561950-9f746bcd554e?auto=format&fit=crop&q=80&w=400' },
                    { id: '3', name: 'Infinite Scaling Mug', price: 18, description: 'Double-walled ceramic for long coding sessions.', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fbed20?auto=format&fit=crop&q=80&w=400' },
                ];

                setProducts(mockData);
            } catch (err) {
                console.error('Failed to fetch products', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="text-center py-20 opacity-50">Loading future tech...</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
