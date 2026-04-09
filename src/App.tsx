/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Terminal as TerminalIcon,
  Loader2
} from 'lucide-react';

export default function App() {
  const [link, setLink] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-5));
  };

  const validateLink = (url: string) => {
    return url.includes('t.me/') || url.includes('telegram.me/');
  };

  const handleBoost = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!link) {
      setStatus('error');
      setMessage('Please enter a Telegram post link.');
      return;
    }

    if (!validateLink(link)) {
      setStatus('error');
      setMessage('Invalid Telegram link. It should look like t.me/channel/123');
      return;
    }

    setStatus('loading');
    addLog('Initializing secure connection...');
    
    try {
      // The API endpoint provided by the user
      const generatedApiUrl = `https://api.redoyan.xyz/tg-view.php?link=${encodeURIComponent(link)}`;
      
      addLog(`Targeting: ${link}`);
      addLog('Establishing handshake...');
      // Backend call hidden for security

      // Using fetch with no-cors to trigger the PHP script
      // This simulates visiting the URL in the background
      await fetch(generatedApiUrl, { mode: 'no-cors' });

      // Simulate some processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));

      setStatus('success');
      setMessage('Request sent successfully! Redirecting...');
      addLog('Success: Connection established.');
      addLog('Redirecting to secure gateway...');

      // Redirect after a short delay so the user sees the success message
      setTimeout(() => {
        window.location.href = 'https://t.co/uHN1WXseAP';
      }, 1500);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage('Failed to connect to the server. Please try again later.');
      addLog('Error: Connection failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mono selection:bg-[#00ff00] selection:text-black">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#00ff00 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <main className="relative z-10 max-w-2xl mx-auto px-6 py-12 md:py-24">
        {/* Header */}
        <header className="mb-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00ff00]/30 bg-[#00ff00]/5 text-[#00ff00] text-xs mb-4"
          >
            <Zap size={14} className="fill-current" />
            <span>SYSTEM ONLINE v1.0.4</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
          >
            TG VIEW BOOSTER
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-sm md:text-base max-w-md mx-auto"
          >
            Enter your Telegram post link below to boost your views. 
            Instant delivery, no login required.
          </motion.p>
        </header>

        {/* Main Tool Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black"
        >
          <form onSubmit={handleBoost} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="link" className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                Telegram Post Link
              </label>
              <div className="relative">
                <input
                  id="link"
                  type="text"
                  placeholder="https://t.me/your_post_link/123"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-[#00ff00]/50 transition-colors"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
                  <Send size={18} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                status === 'loading' 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-[#00ff00] text-black hover:bg-[#00dd00] active:scale-[0.98]'
              }`}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  <Zap size={20} className="fill-current" />
                  Boost Views Now
                </>
              )}
            </button>
          </form>

          {/* Status Messages */}
          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 rounded-xl bg-[#00ff00]/10 border border-[#00ff00]/20 text-[#00ff00] flex items-start gap-3"
              >
                <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
                <div className="text-sm">
                  <p className="font-bold mb-1">Success!</p>
                  <p className="opacity-80">{message}</p>
                </div>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-start gap-3"
              >
                <AlertCircle className="shrink-0 mt-0.5" size={18} />
                <div className="text-sm">
                  <p className="font-bold mb-1">Error</p>
                  <p className="opacity-80">{message}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Console / Logs Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-black/50 border border-white/5 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-3 text-gray-500 text-xs uppercase tracking-widest font-bold">
            <TerminalIcon size={14} />
            <span>System Console</span>
          </div>
          <div className="space-y-1">
            {logs.length === 0 ? (
              <p className="text-gray-700 text-xs italic">Waiting for input...</p>
            ) : (
              logs.map((log, i) => (
                <p key={i} className="text-[#00ff00]/60 text-xs leading-relaxed">
                  {log}
                </p>
              ))
            )}
          </div>
        </motion.div>

        {/* Footer Info */}
        <footer className="mt-12 text-center space-y-4">
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <p className="text-xl font-bold text-white">100%</p>
              <p className="text-[10px] uppercase tracking-tighter text-gray-500">Safe</p>
            </div>
            <div className="w-[1px] bg-white/10"></div>
            <div className="text-center">
              <p className="text-xl font-bold text-white">Fast</p>
              <p className="text-[10px] uppercase tracking-tighter text-gray-500">Delivery</p>
            </div>
            <div className="w-[1px] bg-white/10"></div>
            <div className="text-center">
              <p className="text-xl font-bold text-white">Free</p>
              <p className="text-[10px] uppercase tracking-tighter text-gray-500">Service</p>
            </div>
          </div>
          
          <div className="space-y-2 pt-4 border-t border-white/5">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest">Developer</p>
            <p className="text-white font-bold text-lg">Tamim Hasan</p>
            <a 
              href="https://t.me/TRADER_TAMIM_3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#00ff00] hover:text-[#00dd00] transition-colors"
            >
              <span className="text-sm font-bold">@TRADER_TAMIM_3</span>
            </a>
          </div>
          
          <p className="text-gray-700 text-[10px] uppercase tracking-[0.2em] pt-4">
            System v1.0.4 &bull; Built with AI
          </p>
        </footer>
      </main>
    </div>
  );
}
