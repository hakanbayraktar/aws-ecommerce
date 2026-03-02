"use client";

import { useState } from 'react';
import { signIn, signUp } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { LogIn, UserPlus, ShieldCheck, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        try {
            if (isSignUp) {
                await signUp({
                    username: email,
                    password,
                    options: { userAttributes: { email } }
                });
                alert('Verification code sent to your email.');
            } else {
                await signIn({ username: email, password });
                router.push('/');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="glass w-full max-w-md p-10 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600 opacity-10 blur-3xl -mr-16 -mt-16"></div>

                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 rounded-2xl premium-gradient flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                        <ShieldCheck className="text-white w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        {isSignUp ? 'Join the Future' : 'Welcome Back'}
                    </h2>
                    <p className="text-slate-400 text-sm mt-2 text-center">
                        {isSignUp ? 'Create your cloud-native account' : 'Access your premium dashboard'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-purple-500/50 transition-colors"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-purple-500/50 transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-xs text-center">{error}</p>}

                    <button className="w-full premium-gradient py-4 rounded-xl font-bold flex items-center justify-center shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-transform">
                        {isSignUp ? <><UserPlus className="w-5 h-5 mr-2" /> Sign Up</> : <><LogIn className="w-5 h-5 mr-2" /> Sign In</>}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-sm text-slate-400 hover:text-purple-400 transition-colors"
                    >
                        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
}
