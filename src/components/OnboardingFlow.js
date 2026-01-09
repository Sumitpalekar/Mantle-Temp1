'use client';
import { useState } from 'react';

export default function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(0);
  
  const steps = [
    {
      title: "Welcome to GreenXchange",
      description: "Trade verified environmental credits in 3 simple steps",
      button: "Get Started",
      emoji: "🌿"
    },
    {
      title: "Connect Your Wallet",
      description: "Your wallet is connected and ready to trade",
      button: "Continue",
      emoji: "🔗"
    },
    {
      title: "Choose Your First Trade",
      description: "Start with Carbon Credits - easy to understand and trade",
      button: "Start Trading",
      emoji: "🌍"
    }
  ];
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-bounce">{steps[step].emoji}</div>
          
          {/* Progress dots */}
          <div className="flex justify-center space-x-2 mb-8">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i <= step ? 'bg-emerald-500' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            {steps[step].title}
          </h1>
          
          <p className="text-gray-300 mb-8 text-lg">
            {steps[step].description}
          </p>
          
          <button
            onClick={() => {
              if (step < steps.length - 1) {
                setStep(step + 1);
              } else {
                onComplete();
              }
            }}
            className="w-full py-4 bg-emerald-500 text-white rounded-xl font-bold text-lg hover:bg-emerald-600 transition-colors shadow-lg"
          >
            {steps[step].button}
          </button>
          
          {step === 0 && (
            <button
              onClick={onComplete}
              className="mt-4 text-gray-400 hover:text-white text-sm transition-colors"
            >
              Skip tutorial, I know what I'm doing
            </button>
          )}
        </div>
      </div>
    </div>
  );
}