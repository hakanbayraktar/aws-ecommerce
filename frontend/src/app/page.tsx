import { ShoppingCart, Search, User, ArrowRight, Zap, Shield, Globe } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-gradient tracking-tight">DEVOPS ATOLYESI</div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="#" className="hover:text-purple-400 transition-colors">Catalog</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Featured</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Builds</a>
        </div>
        <div className="flex items-center space-x-6">
          <Search className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100" />
          <User className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100" />
          <div className="relative cursor-pointer group">
            <ShoppingCart className="w-5 h-5 opacity-70 group-hover:opacity-100" />
            <span className="absolute -top-2 -right-2 bg-purple-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full glass text-xs font-semibold text-purple-400 mb-8 animate-fade-in">
            New Collection 2026 is Here
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
            Future of Ecommerce <br />
            <span className="text-gradient">Engineered for You.</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-400 mb-12 leading-relaxed">
            Experience lightning-fast performance powered by AWS Fargate and Next.js.
            A cloud-native storefront built for the next generation of online shopping.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="premium-gradient px-8 py-4 rounded-xl font-bold flex items-center justify-center group">
              Start Shopping <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="glass px-8 py-4 rounded-xl font-bold hover:bg-white hover:bg-opacity-10 transition-colors">
              View Architecture
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 bg-black bg-opacity-30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-3xl group hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center mb-6">
              <Zap className="text-white w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Edge Speed</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Global low-latency delivery via AWS CloudFront and optimized static asset handling.
            </p>
          </div>
          <div className="glass p-8 rounded-3xl group hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center mb-6">
              <Shield className="text-white w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Secured by Design</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Enterprise-grade security using AWS Cognito and IAM-protected internal communications.
            </p>
          </div>
          <div className="glass p-8 rounded-3xl group hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center mb-6">
              <Globe className="text-white w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Micro-Services</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Fully decoupled architecture running on ECS Fargate for infinite horizontal scalability.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
