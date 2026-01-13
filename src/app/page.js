'use client'

import { useState, useEffect } from 'react'
import { useWeb3 } from '../context/Web3Context'
import Header from '../components/layout/Header'
import HeroSection from '../components/landing/HeroSection'
import FeaturesGrid from '../components/landing/FeaturesGrid'
import HowItWorks from '../components/landing/HowItWorks'
import Footer from '../components/layout/Footer'
import Dashboard from '../components/dashboard/Dashboard'

export default function Home() {
  const { isConnected, isCorrectNetwork } = useWeb3()
  const [showDashboard, setShowDashboard] = useState(false)

  useEffect(() => {
    if (isConnected && isCorrectNetwork) {
      setShowDashboard(true)
    } else {
      setShowDashboard(false)
    }
  }, [isConnected, isCorrectNetwork])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <Header />
      
      {!showDashboard ? (
        <main>
          <HeroSection />
          <FeaturesGrid />
          <HowItWorks />
          <Footer />
        </main>
      ) : (
        <Dashboard />
      )}
    </div>
  )
}