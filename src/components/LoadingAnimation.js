// components/LoadingAnimation.js
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import GlobeAnimation from './GlobeAnimation';

export default function LoadingAnimation({ isLoading, onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [creditCount, setCreditCount] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onLoadingComplete, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Animate stats counting up
    const statsInterval = setInterval(() => {
      setUserCount(prev => Math.min(prev + 47, 10000));
      setTransactionCount(prev => Math.min(prev + 23, 5000));
      setCreditCount(prev => Math.min(prev + 12, 2500));
    }, 30);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statsInterval);
    };
  }, [isLoading, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111827] to-[#0f172a] z-50 flex items-center justify-center overflow-hidden"
        >
          {/* Background Stars */}
          <div className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
            
            {/* Left Side - Globe Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, x: -50 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="flex-1 flex justify-center"
            >
              <div className="relative">
                <GlobeAnimation />
                
                {/* Progress Ring around globe */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="url(#progressGradient)"
                    strokeWidth="2"
                    fill="transparent"
                    strokeDasharray="1000"
                    strokeDashoffset={1000 - (progress * 10)}
                    transition={{ duration: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="50%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>

            {/* Right Side - Stats Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="flex-1 max-w-md"
            >
              <div className="text-white space-y-8">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="text-center lg:text-left"
                >
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                    GreenXchange
                  </h1>
                  <p className="text-gray-400 text-xl mb-2">
                    Global Carbon Credit Marketplace
                  </p>
                  <p className="text-gray-500 text-lg">
                    Connecting sustainable projects worldwide
                  </p>
                </motion.div>

                {/* Live Stats */}
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20 shadow-2xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/30"
                        >
                          <span className="text-cyan-400 text-xl">🌐</span>
                        </motion.div>
                        <div>
                          <p className="text-gray-400 text-sm">Active Users Worldwide</p>
                          <p className="text-3xl font-bold text-cyan-400">
                            {userCount.toLocaleString()}+
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 border border-emerald-500/20 shadow-2xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/30"
                        >
                          <span className="text-emerald-400 text-xl">💎</span>
                        </motion.div>
                        <div>
                          <p className="text-gray-400 text-sm">Carbon Credits Traded</p>
                          <p className="text-3xl font-bold text-emerald-400">
                            {creditCount.toLocaleString()}+
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 }}
                    className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 shadow-2xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/30"
                        >
                          <span className="text-purple-400 text-xl">🔄</span>
                        </motion.div>
                        <div>
                          <p className="text-gray-400 text-sm">Total Transactions</p>
                          <p className="text-3xl font-bold text-purple-400">
                            {transactionCount.toLocaleString()}+
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Progress Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="pt-4"
                >
                  <div className="flex justify-between text-sm text-gray-400 mb-3">
                    <span className="flex items-center space-x-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                      />
                      <span>Initializing Platform</span>
                    </span>
                    <span className="font-mono">{progress}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-800 rounded-full h-2 mb-2 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-cyan-500 via-emerald-500 to-purple-500 h-2 rounded-full relative"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/30"
                        animate={{ x: [-100, 100] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </div>
                  
                  <motion.p
                    className="text-center text-gray-500 text-sm mt-3"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {progress < 30 && "Loading blockchain modules..."}
                    {progress >= 30 && progress < 60 && "Connecting to global network..."}
                    {progress >= 60 && progress < 90 && "Synchronizing user data..."}
                    {progress >= 90 && "Finalizing security protocols..."}
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <motion.div
              animate={{ 
                y: [0, -30, 0],
                x: [0, 20, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ 
                y: [0, 40, 0],
                x: [0, -25, 0],
                scale: [1.1, 1, 1.1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                x: [0, 15, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-3/4 left-2/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}