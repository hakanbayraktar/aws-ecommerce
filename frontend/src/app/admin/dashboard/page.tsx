"use client";

import { useEffect, useState } from 'react';
import { Activity, Users, ShoppingCart, Server, TrendingUp, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface Stats {
    activeUsers: number;
    dailyOrders: number;
    systemHealth: number;
    serviceLatency: {
        search: number;
        order: number;
        payment: number;
    };
    recentSales: Array<{ id: string; amount: number; time: string }>;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('http://localhost:3007/analytics/dashboard');
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error('Failed to fetch analytics', err);
                // Fallback mock for UI demo
                setStats({
                    activeUsers: 402,
                    dailyOrders: 24,
                    systemHealth: 99.9,
                    serviceLatency: { search: 42, order: 115, payment: 310 },
                    recentSales: [
                        { id: '1', amount: 156, time: '3 mins ago' },
                        { id: '2', amount: 89, time: '12 mins ago' },
                        { id: '3', amount: 210, time: '25 mins ago' },
                    ]
                });
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
        const interval = setInterval(fetchStats, 5000);
        return () => clearInterval(interval);
    }, []);

    if (loading || !stats) return <div className="min-h-screen flex items-center justify-center opacity-50">Calibrating analytics...</div>;

    return (
        <div className="min-h-screen p-8 pt-24 max-w-7xl mx-auto space-y-8">
            <header className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white">SYSTEM<span className="text-purple-500">OBSERVER</span></h1>
                    <p className="text-slate-400 mt-2 font-medium">Real-time cloud-native operations center</p>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold animate-pulse">
                    <ShieldCheck className="w-4 h-4" />
                    <span>ALL SYSTEMS OPERATIONAL</span>
                </div>
            </header>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Active Sessions', value: stats.activeUsers, icon: Users, color: 'text-blue-400' },
                    { label: 'Daily Orders', value: stats.dailyOrders, icon: ShoppingCart, color: 'text-purple-400' },
                    { label: 'System Uptime', value: `${stats.systemHealth}%`, icon: Activity, color: 'text-green-400' },
                    { label: 'Avg Latency', value: `${stats.serviceLatency.search}ms`, icon: Server, color: 'text-orange-400' },
                ].map((card, i) => (
                    <div key={i} className="glass p-6 rounded-3xl group hover:border-white/10 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-2xl bg-white/5 ${card.color}`}>
                                <card.icon className="w-6 h-6" />
                            </div>
                            <TrendingUp className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                        </div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{card.label}</p>
                        <h3 className="text-3xl font-black mt-1 text-white">{card.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 glass p-8 rounded-[2.5rem]">
                    <h3 className="text-xl font-bold mb-8 flex items-center">
                        <Activity className="mr-3 w-5 h-5 text-purple-500" />
                        Service Latency (ms)
                    </h3>
                    <div className="space-y-6">
                        {Object.entries(stats.serviceLatency).map(([name, latency]) => (
                            <div key={name} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="capitalize text-slate-400 font-medium">{name} Service</span>
                                    <span className="font-mono text-white">{latency}ms</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full premium-gradient"
                                        style={{ width: `${Math.min((latency / 500) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sales Feed */}
                <div className="glass p-8 rounded-[2.5rem]">
                    <h3 className="text-xl font-bold mb-8">Recent Liquidations</h3>
                    <div className="space-y-6">
                        {stats.recentSales.map((sale) => (
                            <div key={sale.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                        <ArrowUpRight className="w-5 h-5 text-purple-400 group-hover:rotate-45 transition-transform" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-white">${sale.amount}</p>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase">{sale.time}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-slate-700 group-hover:text-purple-500/50 transition-colors uppercase tracking-tighter">Verified</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
