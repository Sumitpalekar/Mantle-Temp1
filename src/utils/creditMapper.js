// utils/creditMapper.js
export const creditMapper = {
    // Map names to token IDs (from your ERC-1155 contract)
    nameToId: {
      'carbon': 1,
      'water': 2,
      'renewable': 3,
      'green': 4
    },
    
    idToName: {
      1: 'Carbon',
      2: 'Water', 
      3: 'Renewable',
      4: 'Green'
    },
    
    // Get price suggestions (you can fetch these from your contract later)
    getPriceSuggestion: (creditName) => {
      const prices = {
        'carbon': ethers.utils.parseUnits('15.75', 6), // 6 decimals for PYUSD
        'water': ethers.utils.parseUnits('8.20', 6),
        'renewable': ethers.utils.parseUnits('22.50', 6),
        'green': ethers.utils.parseUnits('12.30', 6)
      };
      return prices[creditName] || prices['carbon'];
    },
    
    // Calculate impact
    calculateImpact: (creditName, amount) => {
      const impacts = {
        'carbon': {
          label: 'Carbon Offset',
          value: `${amount} tons CO₂`,
          equivalent: `Like planting ${amount * 5} trees`
        },
        'water': {
          label: 'Water Saved',
          value: `${amount * 1000} liters`,
          equivalent: `Daily use of ${amount * 10} people`
        },
        'renewable': {
          label: 'Clean Energy',
          value: `${amount} MWh`,
          equivalent: `Powers ${amount * 333} homes for a day`
        },
        'green': {
          label: 'Environmental Impact',
          value: `${amount} units`,
          equivalent: 'Verified green projects'
        }
      };
      return impacts[creditName] || impacts['carbon'];
    }
  };