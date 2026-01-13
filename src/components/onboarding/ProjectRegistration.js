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
  FiDollarSign,
  FiMapPin
} from 'react-icons/fi';
import { FaLeaf, FaWater, FaSolarPanel, FaRecycle } from 'react-icons/fa';

const ProjectRegistration = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    projectName: '',
    projectType: 'carbon',
    description: '',
    
    // Step 2
    location: '',
    startDate: '',
    expectedCredits: '',
    
    // Step 3
    verificationDocs: [],
    methodology: '',
    auditor: '',
    
    // Step 4
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });

  const projectTypes = [
    { id: 'carbon', name: 'Carbon Sequestration', icon: <FaLeaf className="text-green-400" />, description: 'Forestry, soil carbon, biochar' },
    { id: 'water', name: 'Water Conservation', icon: <FaWater className="text-blue-400" />, description: 'Watershed protection, water efficiency' },
    { id: 'renewable', name: 'Renewable Energy', icon: <FaSolarPanel className="text-yellow-400" />, description: 'Solar, wind, hydro power' },
    { id: 'circular', name: 'Circular Economy', icon: <FaRecycle className="text-emerald-400" />, description: 'Waste reduction, recycling' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      verificationDocs: [...prev.verificationDocs, ...files]
    }));
  };

  const handleSubmit = async () => {
    // Submit project registration
    alert('Project submitted for verification!');
    router.push('/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Project Name</label>
              <input
                type="text"
                value={formData.projectName}
                onChange={(e) => handleInputChange('projectName', e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter project name"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-3">Project Type</label>
              <div className="grid grid-cols-2 gap-4">
                {projectTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => handleInputChange('projectType', type.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.projectType === type.id
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{type.icon}</div>
                      <div>
                        <p className="font-semibold">{type.name}</p>
                        <p className="text-sm text-gray-400">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Project Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Describe your environmental project..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2 flex items-center">
                <FiMapPin className="mr-2" /> Project Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                placeholder="City, Country"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2 flex items-center">
                  <FiCalendar className="mr-2" /> Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 flex items-center">
                  <FiDollarSign className="mr-2" /> Expected Credits
                </label>
                <input
                  type="number"
                  value={formData.expectedCredits}
                  onChange={(e) => handleInputChange('expectedCredits', e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 10000"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 flex items-center">
                <FiGlobe className="mr-2" /> Methodology
              </label>
              <select
                value={formData.methodology}
                onChange={(e) => handleInputChange('methodology', e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select methodology</option>
                <option value="vcs">Verified Carbon Standard (VCS)</option>
                <option value="gold">Gold Standard</option>
                <option value="ccb">Climate, Community & Biodiversity</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-3 flex items-center">
                <FiUpload className="mr-2" /> Verification Documents
              </label>
              <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-4xl mb-4">📁</div>
                  <p className="text-lg font-semibold">Upload Verification Documents</p>
                  <p className="text-gray-400 mt-2">Project plans, permits, impact assessments, etc.</p>
                  <button className="mt-4 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold">
                    Choose Files
                  </button>
                </label>
              </div>
              
              {formData.verificationDocs.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-gray-300">Uploaded Files:</p>
                  {formData.verificationDocs.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                      <span className="text-gray-300">{file.name}</span>
                      <span className="text-green-400 text-sm">Uploaded</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Auditor Information</label>
              <select
                value={formData.auditor}
                onChange={(e) => handleInputChange('auditor', e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select auditor</option>
                <option value="dnv">DNV GL</option>
                <option value="sgs">SGS</option>
                <option value="tuv">TÜV SÜD</option>
                <option value="other">Other Accredited Auditor</option>
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Contact Name</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Contact Email</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Contact Phone</label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-start">
                <FiInfo className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-300">Important Information</p>
                  <p className="text-gray-300 text-sm mt-1">
                    Your project will be reviewed by our verification team within 7-10 business days. 
                    You'll receive notifications via email about the verification status.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return formData.projectName && formData.projectType && formData.description;
      case 2:
        return formData.location && formData.startDate && formData.expectedCredits;
      case 3:
        return formData.verificationDocs.length > 0 && formData.auditor;
      case 4:
        return formData.contactName && formData.contactEmail && formData.contactPhone;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <FiFileText className="mr-3 text-green-400" /> Register New Credits
          </h1>
          <p className="text-gray-400">Register your environmental project to mint tradable credits</p>
        </div>

        {/* Progress Steps */}
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
                  {stepNumber === 1 && 'Project Details'}
                  {stepNumber === 2 && 'Location & Scale'}
                  {stepNumber === 3 && 'Verification'}
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

        {/* Form Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {step === 1 && 'Project Information'}
              {step === 2 && 'Location & Scale'}
              {step === 3 && 'Verification'}
              {step === 4 && 'Contact Information'}
            </h2>
            <p className="text-gray-400">
              {step === 1 && 'Tell us about your environmental project'}
              {step === 2 && 'Where is your project located and what is its scale?'}
              {step === 3 && 'Upload verification documents and select auditor'}
              {step === 4 && 'How can we contact you?'}
            </p>
          </div>

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
                  onClick={() => isStepComplete() && setStep(step + 1)}
                  disabled={!isStepComplete()}
                  className={`px-8 py-3 rounded-lg font-semibold ${
                    isStepComplete()
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepComplete()}
                  className={`px-8 py-3 rounded-lg font-semibold ${
                    isStepComplete()
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Submit Registration
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Need help? Contact our support team at support@greenxchange.com</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectRegistration;