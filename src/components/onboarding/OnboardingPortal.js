'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FiFileText, 
  FiUpload, 
  FiCheck, 
  FiInfo,
  FiGlobe,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiClipboard,
  FiHelpCircle
} from 'react-icons/fi';
import { FaLeaf, FaWater, FaSolarPanel, FaRecycle, FaQuestionCircle } from 'react-icons/fa';

const OnboardingPortal = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('');

  const userTypes = [
    {
      id: 'project_owner',
      title: 'Project Owner',
      icon: <FaLeaf className="text-green-400" />,
      description: 'Register environmental projects to issue credits',
      features: ['Credit issuance', 'Project verification', 'Revenue generation']
    },
    {
      id: 'corporate',
      title: 'Corporate Buyer',
      icon: <FiShield className="text-blue-400" />,
      description: 'Purchase credits for ESG compliance and offsetting',
      features: ['Bulk purchasing', 'Compliance tracking', 'Reporting tools']
    },
    {
      id: 'trader',
      title: 'Trader/Investor',
      icon: <FiClipboard className="text-yellow-400" />,
      description: 'Trade environmental credits for profit',
      features: ['Market analysis', 'Trading tools', 'Portfolio management']
    }
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Welcome to GreenXchange</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join the decentralized marketplace for environmental credits. 
                Choose your role to begin the onboarding process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {userTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setUserType(type.id)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-[1.02] ${
                    userType === type.id
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="text-4xl mb-4 flex justify-center">
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                  <p className="text-gray-400 mb-4">{type.description}</p>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <FiCheck className="mr-2 text-green-400" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* User Guide */}
            <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
              <div className="flex items-start">
                <FaQuestionCircle className="text-green-400 text-2xl mr-4 mt-1" />
                <div>
                  <h4 className="text-lg font-bold mb-2">Need help choosing?</h4>
                  <p className="text-gray-300 mb-2">
                    <strong>Project Owners</strong>: You have environmental projects (forest conservation, renewable energy, water conservation) that generate verifiable credits.
                  </p>
                  <p className="text-gray-300 mb-2">
                    <strong>Corporate Buyers</strong>: Your company needs to purchase credits for carbon neutrality, ESG compliance, or sustainability goals.
                  </p>
                  <p className="text-gray-300">
                    <strong>Traders/Investors</strong>: You want to trade environmental credits for profit, provide liquidity, or invest in sustainable assets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Project Information</h2>
              <p className="text-gray-400">Tell us about your environmental project</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Project Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Amazon Rainforest Conservation"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Project Type</label>
                  <select className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">Select type</option>
                    <option value="carbon">Carbon Sequestration</option>
                    <option value="water">Water Conservation</option>
                    <option value="renewable">Renewable Energy</option>
                    <option value="biodiversity">Biodiversity</option>
                    <option value="waste">Waste Management</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Project Description</label>
                <textarea
                  rows={4}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Describe your project in detail..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">
                    <FiMapPin className="inline mr-2" /> Location
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="City, Country"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">
                    <FiCalendar className="inline mr-2" /> Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Document Verification</h2>
              <p className="text-gray-400">Upload required documents for verification</p>
            </div>

            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center">
                <div className="text-4xl mb-4">📁</div>
                <h3 className="text-xl font-bold mb-2">Upload Documents</h3>
                <p className="text-gray-400 mb-4">
                  Upload project plans, verification certificates, and impact assessments
                </p>
                <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold">
                  Choose Files
                </button>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6">
                <h4 className="text-lg font-bold mb-4">Required Documents</h4>
                <div className="space-y-3">
                  {[
                    'Project Proposal/Plan',
                    'Environmental Impact Assessment',
                    'Verification Certificate (if available)',
                    'Location Proof (GPS coordinates, maps)',
                    'Government Permits/Licenses',
                    'Annual Production Estimates'
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-900/50 rounded">
                      <span className="text-gray-300">{doc}</span>
                      <span className="text-red-400 text-sm">Required</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Guide */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-start">
                  <FiInfo className="text-green-400 mt-1 mr-3" />
                  <div>
                    <p className="font-semibold text-green-300">Document Tips:</p>
                    <ul className="text-gray-300 text-sm mt-1 space-y-1">
                      <li>• Upload PDF or image files (max 10MB each)</li>
                      <li>• Ensure documents are clear and legible</li>
                      <li>• Include English translations if documents are in other languages</li>
                      <li>• Verification typically takes 3-5 business days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-gray-400">How can we reach you?</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">
                    <FiUser className="inline mr-2" /> Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">
                    <FiMail className="inline mr-2" /> Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  <FiPhone className="inline mr-2" /> Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Organization (if any)</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your company or organization"
                />
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start">
                  <FiInfo className="text-blue-400 mt-1 mr-3" />
                  <div>
                    <p className="font-semibold text-blue-300">Verification Process:</p>
                    <p className="text-gray-300 text-sm mt-1">
                      After submission, you'll receive a unique Mint ID via email. 
                      Our verification team will review your documents within 3-5 business days. 
                      Once approved, you can proceed to mint your credits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = () => {
    // Generate mock Mint ID for testing
    const mintId = `MINT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    alert(`✅ Onboarding submitted!\n\nYour Mint ID: ${mintId}\n\nSave this ID for verification. You'll receive email confirmation.`);
    router.push('/onboarding/pending');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <FiFileText className="mr-3 text-green-400" /> Project Onboarding Portal
          </h1>
          <p className="text-gray-400">Register your environmental project and get verified to mint tradable credits</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center relative z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-2 ${
                  stepNumber < step 
                    ? 'bg-green-600 text-white' 
                    : stepNumber === step 
                    ? 'bg-green-500 text-white ring-4 ring-green-500/30'
                    : 'bg-gray-800 text-gray-400'
                }`}>
                  {stepNumber < step ? <FiCheck /> : stepNumber}
                </div>
                <span className="text-sm">
                  {stepNumber === 1 && 'User Type'}
                  {stepNumber === 2 && 'Project Info'}
                  {stepNumber === 3 && 'Documents'}
                  {stepNumber === 4 && 'Contact'}
                </span>
              </div>
            ))}
            {/* Progress Line */}
            <div className="absolute top-6 left-12 right-12 h-1 bg-gray-800 -z-10">
              <div 
                className="h-1 bg-green-600 transition-all duration-300"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 pt-6 border-t border-gray-700">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              className={`px-8 py-3 rounded-lg font-semibold ${
                step === 1 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              disabled={step === 1}
            >
              Back
            </button>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Step {step} of 4</span>
              {step < 4 ? (
                <button
                  onClick={() => step === 1 ? (userType ? setStep(step + 1) : alert('Please select user type')) : setStep(step + 1)}
                  className="px-8 py-3 rounded-lg font-semibold bg-green-600 hover:bg-green-700"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  Submit Onboarding
                </button>
              )}
            </div>
          </div>
        </div>

        {/* User Guide Section */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <FiHelpCircle className="mr-3 text-green-400" /> Onboarding Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-green-300">📋 Step-by-Step Process</h4>
              <ol className="space-y-2 text-gray-300">
                <li>1. <strong>Select User Type</strong> - Choose your role in the ecosystem</li>
                <li>2. <strong>Project Information</strong> - Provide details about your environmental project</li>
                <li>3. <strong>Document Upload</strong> - Submit verification documents</li>
                <li>4. <strong>Contact Details</strong> - Provide your contact information</li>
                <li>5. <strong>Verification</strong> - Wait for our team to review (3-5 days)</li>
                <li>6. <strong>Mint Credits</strong> - Once verified, mint your credits</li>
              </ol>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-blue-300">⏱️ Expected Timeline</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>Day 1-2:</strong> Document verification by our team</li>
                <li>• <strong>Day 3:</strong> Technical review and mint ID generation</li>
                <li>• <strong>Day 4-5:</strong> Final approval and email notification</li>
                <li>• <strong>Day 6+:</strong> Ready to mint and trade credits</li>
              </ul>
              <p className="text-sm text-gray-400 mt-4">
                Need help? Email: support@greenxchange.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPortal;