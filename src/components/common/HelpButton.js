'use client';

import React, { useState } from 'react';
import { FiHelpCircle, FiX, FiBook, FiVideo, FiMessageSquare, FiGlobe } from 'react-icons/fi';
import { FaDiscord, FaTelegram, FaGithub } from 'react-icons/fa';

const HelpButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const helpResources = [
    {
      title: 'Quick Start Guide',
      icon: <FiBook className="text-green-400" />,
      description: 'Learn how to use GreenXchange',
      link: '#'
    },
    {
      title: 'Video Tutorials',
      icon: <FiVideo className="text-blue-400" />,
      description: 'Watch step-by-step guides',
      link: '#'
    },
    {
      title: 'Trading Guide',
      icon: <FiHelpCircle className="text-yellow-400" />,
      description: 'Master AMM & Orderbook trading',
      link: '#'
    },
    {
      title: 'Community Discord',
      icon: <FaDiscord className="text-purple-400" />,
      description: 'Join our community chat',
      link: '#'
    },
    {
      title: 'Telegram Group',
      icon: <FaTelegram className="text-cyan-400" />,
      description: 'Get instant help',
      link: '#'
    },
    {
      title: 'GitHub Repository',
      icon: <FaGithub className="text-gray-300" />,
      description: 'View source code',
      link: 'https://github.com/Shivamd0608/GreenXAi'
    },
    {
      title: 'Network Guide',
      icon: <FiGlobe className="text-emerald-400" />,
      description: 'Mantle L2 setup guide',
      link: '#'
    },
    {
      title: 'Contact Support',
      icon: <FiMessageSquare className="text-red-400" />,
      description: 'Email our support team',
      link: 'mailto:support@greenxchange.com'
    }
  ];

  const quickTips = [
    'Connect to Mantle Sepolia (Chain ID: 5003)',
    'Get test MNT from Mantle faucet',
    'Start with small trades to learn',
    'Check gas fees before confirming',
    'Save your Mint ID securely',
    'Verify email for notifications',
    'Use limit orders for better prices',
    'Monitor price impact on large trades'
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 rounded-lg hover:opacity-90 transition-all"
      >
        <FiHelpCircle className="mr-2" /> Help & Guides
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">GreenXchange Help Center</h2>
                  <p className="text-gray-400 mt-2">Find guides, tutorials, and support resources</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
              {/* Welcome Message */}
              <div className="mb-8 p-6 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl border border-green-700/30">
                <h3 className="text-xl font-bold mb-3">Welcome to GreenXchange! 👋</h3>
                <p className="text-gray-300">
                  We're here to help you navigate the world of environmental credit trading. 
                  Whether you're a project owner, corporate buyer, or trader, you'll find helpful resources below.
                </p>
              </div>

              {/* Resources Grid */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Resources & Guides</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {helpResources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-gray-800/50 hover:bg-gray-800 rounded-xl border border-gray-700/50 transition-all hover:border-green-500/30 hover:transform hover:scale-[1.02]"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="text-3xl mb-3">{resource.icon}</div>
                        <h4 className="font-bold mb-1">{resource.title}</h4>
                        <p className="text-sm text-gray-400">{resource.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Quick Tips & Best Practices</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl border border-blue-700/30">
                    <h4 className="font-bold text-blue-300 mb-3">For New Users</h4>
                    <ul className="space-y-2">
                      {quickTips.slice(0, 4).map((tip, index) => (
                        <li key={index} className="flex items-start text-gray-300">
                          <span className="text-blue-400 mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-xl border border-purple-700/30">
                    <h4 className="font-bold text-purple-300 mb-3">For Advanced Users</h4>
                    <ul className="space-y-2">
                      {quickTips.slice(4).map((tip, index) => (
                        <li key={index} className="flex items-start text-gray-300">
                          <span className="text-purple-400 mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <h4 className="font-bold mb-2">Q: How do I get started?</h4>
                    <p className="text-gray-300 text-sm">
                      A: 1) Connect your wallet, 2) Switch to Mantle Sepolia, 3) Get test MNT from faucet, 
                      4) Start trading or register as a project owner.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <h4 className="font-bold mb-2">Q: What are environmental credits?</h4>
                    <p className="text-gray-300 text-sm">
                      A: Verifiable tokens representing environmental impact (carbon reduction, water conservation, 
                      renewable energy, etc.) that can be traded or retired for offset purposes.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <h4 className="font-bold mb-2">Q: Why Mantle L2?</h4>
                    <p className="text-gray-300 text-sm">
                      A: Mantle provides near-zero gas fees and fast transactions, making environmental credit 
                      trading accessible and affordable for everyone.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Need More Help?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl mb-2">📧</div>
                    <h4 className="font-bold">Email Support</h4>
                    <p className="text-sm text-gray-400">support@greenxchange.com</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🕒</div>
                    <h4 className="font-bold">Response Time</h4>
                    <p className="text-sm text-gray-400">24-48 hours</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🌐</div>
                    <h4 className="font-bold">Community</h4>
                    <p className="text-sm text-gray-400">Join our Discord/Telegram</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-900/90 backdrop-blur-sm border-t border-gray-800 p-4 rounded-b-2xl">
              <div className="text-center text-sm text-gray-400">
                <p>GreenXchange v2.0 • Built on Mantle L2 • Making sustainable finance accessible</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpButton;