'use client';

import React, { useState } from 'react';
import { FiHelpCircle, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const UserGuide = ({ title, steps, tips, warnings, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-t-xl cursor-pointer hover:bg-gray-800/80"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <FiHelpCircle className="text-green-400 mr-3" />
          <h3 className="font-bold">User Guide: {title}</h3>
        </div>
        {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="bg-gray-800/50 backdrop-blur-sm border-l border-r border-b border-gray-700/50 rounded-b-xl p-6">
          {children || (
            <div className="space-y-6">
              {steps && (
                <div>
                  <h4 className="font-bold text-green-300 mb-3">Step-by-Step Process</h4>
                  <ol className="space-y-2">
                    {steps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {tips && (
                <div>
                  <h4 className="font-bold text-blue-300 mb-3">Tips & Best Practices</h4>
                  <ul className="space-y-2">
                    {tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span className="text-gray-300">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {warnings && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <h4 className="font-bold text-yellow-300 mb-2">⚠️ Important Warnings</h4>
                  <ul className="space-y-1 text-gray-300">
                    {warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserGuide;