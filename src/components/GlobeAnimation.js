// components/GlobeAnimation.js
'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function GlobeAnimation() {
  const canvasRef = useRef(null);
  const [stars, setStars] = useState([]);

  // Enhanced user distribution data with more granular data
  const userDistribution = {
    northAmerica: { 
      total: 4500, 
      color: '#22d3ee',
      regions: [
        { lat: 40, lon: -100, density: 0.4 }, // Central
        { lat: 45, lon: -75, density: 0.3 },  // Northeast
        { lat: 35, lon: -120, density: 0.3 }  // West
      ]
    },
    southAmerica: { 
      total: 2800, 
      color: '#10b981',
      regions: [
        { lat: -15, lon: -60, density: 0.4 }, // Brazil
        { lat: -35, lon: -65, density: 0.3 }, // Argentina
        { lat: 5, lon: -75, density: 0.3 }    // Colombia
      ]
    },
    europe: { 
      total: 3800, 
      color: '#3b82f6',
      regions: [
        { lat: 50, lon: 10, density: 0.3 },   // Central
        { lat: 52, lon: 0, density: 0.25 },   // UK
        { lat: 48, lon: 2, density: 0.25 },   // France
        { lat: 45, lon: 12, density: 0.2 }    // Italy
      ]
    },
    asia: { 
      total: 5200, 
      color: '#f59e0b',
      regions: [
        { lat: 35, lon: 105, density: 0.3 },  // China
        { lat: 20, lon: 80, density: 0.25 },  // India
        { lat: 35, lon: 135, density: 0.2 },  // Japan
        { lat: 25, lon: 120, density: 0.15 }, // Taiwan
        { lat: 37, lon: 127, density: 0.1 }   // Korea
      ]
    },
    africa: { 
      total: 2100, 
      color: '#ef4444',
      regions: [
        { lat: 5, lon: 20, density: 0.3 },    // Central
        { lat: -30, lon: 25, density: 0.25 }, // South
        { lat: 10, lon: 10, density: 0.25 },  // West
        { lat: 30, lon: 30, density: 0.2 }    // North
      ]
    },
    oceania: { 
      total: 1200, 
      color: '#8b5cf6',
      regions: [
        { lat: -25, lon: 135, density: 0.6 }, // Australia
        { lat: -40, lon: 175, density: 0.4 }  // New Zealand
      ]
    }
  };

  // Continent border coordinates (simplified)
  const continentBorders = [
    // North America
    { lat: 70, lon: -140 }, { lat: 60, lon: -140 }, { lat: 60, lon: -100 }, 
    { lat: 50, lon: -100 }, { lat: 50, lon: -80 }, { lat: 30, lon: -80 },
    { lat: 30, lon: -100 }, { lat: 20, lon: -100 }, { lat: 20, lon: -110 },
    { lat: 15, lon: -110 }, { lat: 15, lon: -90 }, { lat: 10, lon: -80 },
    { lat: 70, lon: -170 }, { lat: 60, lon: -170 }, { lat: 60, lon: -140 },
    
    // South America
    { lat: 10, lon: -80 }, { lat: -10, lon: -80 }, { lat: -20, lon: -70 },
    { lat: -40, lon: -70 }, { lat: -55, lon: -70 }, { lat: -55, lon: -50 },
    { lat: -40, lon: -50 }, { lat: -20, lon: -50 }, { lat: -10, lon: -60 },
    { lat: 10, lon: -60 }, { lat: 10, lon: -80 },
    
    // Europe
    { lat: 70, lon: -10 }, { lat: 60, lon: -10 }, { lat: 60, lon: 20 },
    { lat: 50, lon: 20 }, { lat: 50, lon: 40 }, { lat: 45, lon: 40 },
    { lat: 45, lon: 30 }, { lat: 40, lon: 30 }, { lat: 40, lon: 10 },
    { lat: 35, lon: 10 }, { lat: 35, lon: -5 }, { lat: 45, lon: -5 },
    { lat: 45, lon: -10 }, { lat: 60, lon: -10 },
    
    // Africa
    { lat: 35, lon: -10 }, { lat: 35, lon: 30 }, { lat: 30, lon: 30 },
    { lat: 30, lon: 40 }, { lat: 10, lon: 40 }, { lat: 10, lon: 50 },
    { lat: -10, lon: 50 }, { lat: -35, lon: 50 }, { lat: -35, lon: 20 },
    { lat: -30, lon: 20 }, { lat: -30, lon: 10 }, { lat: -20, lon: 10 },
    { lat: -20, lon: -10 }, { lat: 5, lon: -10 }, { lat: 5, lon: -20 },
    { lat: 35, lon: -20 }, { lat: 35, lon: -10 },
    
    // Asia
    { lat: 70, lon: 60 }, { lat: 60, lon: 60 }, { lat: 60, lon: 100 },
    { lat: 50, lon: 100 }, { lat: 50, lon: 120 }, { lat: 30, lon: 120 },
    { lat: 30, lon: 140 }, { lat: 20, lon: 140 }, { lat: 20, lon: 100 },
    { lat: 10, lon: 100 }, { lat: 10, lon: 80 }, { lat: 0, lon: 80 },
    { lat: 0, lon: 40 }, { lat: 30, lon: 40 }, { lat: 30, lon: 50 },
    { lat: 40, lon: 50 }, { lat: 40, lon: 60 }, { lat: 70, lon: 60 },
    
    // Australia
    { lat: -10, lon: 110 }, { lat: -10, lon: 155 }, { lat: -45, lon: 155 },
    { lat: -45, lon: 110 }, { lat: -10, lon: 110 }
  ];

  useEffect(() => {
    // Initialize stars
    const generatedStars = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5
    }));
    setStars(generatedStars);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = 800;
      canvas.height = 800;
    };
    
    resizeCanvas();

    const globe = {
      radius: 280,
      rotationX: 0,
      rotationY: 0.3
    };

    // Convert latitude/longitude to 3D coordinates
    const latLonToXYZ = (lat, lon, radius) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      return { x, y, z };
    };

    // Project 3D point to 2D canvas
    const project = (x, y, z) => {
      const scale = 500 / (500 + z);
      const x2d = x * scale + canvas.width / 2;
      const y2d = y * scale + canvas.height / 2;
      return { x: x2d, y: y2d, scale };
    };

    // Draw stars background
    const drawStars = () => {
      stars.forEach(star => {
        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(
          (star.x / 100) * canvas.width,
          (star.y / 100) * canvas.height,
          star.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
      });
    };

    // Draw latitude lines
    const drawLatitudeLines = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 0.8;
      
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        for (let lon = 0; lon <= 360; lon += 5) {
          const { x, y, z } = latLonToXYZ(lat, lon, globe.radius);
          
          // Rotate point
          const rotatedX = x * Math.cos(globe.rotationY) - z * Math.sin(globe.rotationY);
          const rotatedZ = x * Math.sin(globe.rotationY) + z * Math.cos(globe.rotationY);
          const rotatedY = y * Math.cos(globe.rotationX) - rotatedZ * Math.sin(globe.rotationX);
          const finalZ = y * Math.sin(globe.rotationX) + rotatedZ * Math.cos(globe.rotationX);
          
          if (finalZ > -globe.radius) {
            const { x: x2d, y: y2d } = project(rotatedX, rotatedY, finalZ);
            if (lon === 0) {
              ctx.moveTo(x2d, y2d);
            } else {
              ctx.lineTo(x2d, y2d);
            }
          }
        }
        ctx.stroke();
      }
    };

    // Draw longitude lines
    const drawLongitudeLines = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 0.8;
      
      for (let lon = 0; lon < 360; lon += 30) {
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 5) {
          const { x, y, z } = latLonToXYZ(lat, lon, globe.radius);
          
          // Rotate point
          const rotatedX = x * Math.cos(globe.rotationY) - z * Math.sin(globe.rotationY);
          const rotatedZ = x * Math.sin(globe.rotationY) + z * Math.cos(globe.rotationY);
          const rotatedY = y * Math.cos(globe.rotationX) - rotatedZ * Math.sin(globe.rotationX);
          const finalZ = y * Math.sin(globe.rotationX) + rotatedZ * Math.cos(globe.rotationX);
          
          if (finalZ > -globe.radius) {
            const { x: x2d, y: y2d } = project(rotatedX, rotatedY, finalZ);
            if (lat === -90) {
              ctx.moveTo(x2d, y2d);
            } else {
              ctx.lineTo(x2d, y2d);
            }
          }
        }
        ctx.stroke();
      }
    };

    // Draw equator line
    const drawEquator = () => {
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      
      ctx.beginPath();
      for (let lon = 0; lon <= 360; lon += 5) {
        const { x, y, z } = latLonToXYZ(0, lon, globe.radius);
        
        const rotatedX = x * Math.cos(globe.rotationY) - z * Math.sin(globe.rotationY);
        const rotatedZ = x * Math.sin(globe.rotationY) + z * Math.cos(globe.rotationY);
        const rotatedY = y * Math.cos(globe.rotationX) - rotatedZ * Math.sin(globe.rotationX);
        const finalZ = y * Math.sin(globe.rotationX) + rotatedZ * Math.cos(globe.rotationX);
        
        if (finalZ > -globe.radius) {
          const { x: x2d, y: y2d } = project(rotatedX, rotatedY, finalZ);
          if (lon === 0) {
            ctx.moveTo(x2d, y2d);
          } else {
            ctx.lineTo(x2d, y2d);
          }
        }
      }
      ctx.stroke();
    };

    // Draw continent borders
    const drawContinentBorders = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([]);
      
      ctx.beginPath();
      continentBorders.forEach((point, index) => {
        const { x, y, z } = latLonToXYZ(point.lat, point.lon, globe.radius);
        
        const rotatedX = x * Math.cos(globe.rotationY) - z * Math.sin(globe.rotationY);
        const rotatedZ = x * Math.sin(globe.rotationY) + z * Math.cos(globe.rotationY);
        const rotatedY = y * Math.cos(globe.rotationX) - rotatedZ * Math.sin(globe.rotationX);
        const finalZ = y * Math.sin(globe.rotationX) + rotatedZ * Math.cos(globe.rotationX);
        
        if (finalZ > -globe.radius) {
          const { x: x2d, y: y2d } = project(rotatedX, rotatedY, finalZ);
          if (index === 0) {
            ctx.moveTo(x2d, y2d);
          } else {
            ctx.lineTo(x2d, y2d);
          }
        }
      });
      ctx.stroke();
    };

    // Draw distributed user dots
    const drawUserDots = () => {
      Object.entries(userDistribution).forEach(([continent, data]) => {
        const { total, color, regions } = data;
        
        regions.forEach(region => {
          const dotCount = Math.max(3, Math.floor(total * region.density / 500));
          
          for (let i = 0; i < dotCount; i++) {
            // Add some randomness to dot positions within the region
            const randomLat = region.lat + (Math.random() - 0.5) * 20;
            const randomLon = region.lon + (Math.random() - 0.5) * 40;
            
            const { x, y, z } = latLonToXYZ(randomLat, randomLon, globe.radius);
            
            // Rotate point
            const rotatedX = x * Math.cos(globe.rotationY) - z * Math.sin(globe.rotationY);
            const rotatedZ = x * Math.sin(globe.rotationY) + z * Math.cos(globe.rotationY);
            const rotatedY = y * Math.cos(globe.rotationX) - rotatedZ * Math.sin(globe.rotationX);
            const finalZ = y * Math.sin(globe.rotationX) + rotatedZ * Math.cos(globe.rotationX);
            
            if (finalZ > -globe.radius) {
              const { x: x2d, y: y2d, scale } = project(rotatedX, rotatedY, finalZ);
              
              // Vary dot size slightly
              const dotSize = (1 + Math.random() * 0.5) * scale;
              
              // Create glowing dot effect
              const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, dotSize * 3);
              gradient.addColorStop(0, color);
              gradient.addColorStop(0.7, `${color}80`);
              gradient.addColorStop(1, 'transparent');
              
              ctx.beginPath();
              ctx.arc(x2d, y2d, dotSize, 0, Math.PI * 2);
              ctx.fillStyle = gradient;
              ctx.fill();
            }
          }
        });
      });
    };

    // Draw major city markers with user concentrations
    const drawCityMarkers = () => {
      const majorCities = [
        { name: 'NYC', lat: 40.7, lon: -74, users: 800, color: '#22d3ee' },
        { name: 'London', lat: 51.5, lon: -0.1, users: 700, color: '#3b82f6' },
        { name: 'Tokyo', lat: 35.7, lon: 139.8, users: 900, color: '#f59e0b' },
        { name: 'Singapore', lat: 1.3, lon: 103.8, users: 600, color: '#f59e0b' },
        { name: 'Sydney', lat: -33.9, lon: 151.2, users: 400, color: '#8b5cf6' },
        { name: 'São Paulo', lat: -23.6, lon: -46.6, users: 500, color: '#10b981' },
        { name: 'Cairo', lat: 30.0, lon: 31.2, users: 300, color: '#ef4444' }
      ];
      
      majorCities.forEach(city => {
        const { x, y, z } = latLonToXYZ(city.lat, city.lon, globe.radius);
        
        const rotatedX = x * Math.cos(globe.rotationY) - z * Math.sin(globe.rotationY);
        const rotatedZ = x * Math.sin(globe.rotationY) + z * Math.cos(globe.rotationY);
        const rotatedY = y * Math.cos(globe.rotationX) - rotatedZ * Math.sin(globe.rotationX);
        const finalZ = y * Math.sin(globe.rotationX) + rotatedZ * Math.cos(globe.rotationX);
        
        if (finalZ > -globe.radius) {
          const { x: x2d, y: y2d, scale } = project(rotatedX, rotatedY, finalZ);
          
          // Draw city marker
          const markerSize = 3 * scale;
          ctx.fillStyle = city.color;
          ctx.beginPath();
          ctx.arc(x2d, y2d, markerSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw pulse effect for major cities
          ctx.strokeStyle = city.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(x2d, y2d, markerSize * 2, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
    };

    const animate = () => {
      // Clear with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars in the background
      drawStars();
      
      // Slow rotation
      globe.rotationY += 0.001;
      
      // Draw globe elements in correct order
      drawLatitudeLines();
      drawLongitudeLines();
      drawEquator();
      drawContinentBorders();
      drawUserDots();
      drawCityMarkers();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [stars]);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
      className="relative globe-container"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          maxWidth: '800px', 
          maxHeight: '800px',
          background: 'transparent'
        }}
      />
      
      {/* Enhanced Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-2xl"
      >
        <h3 className="text-white text-sm font-bold mb-3 flex items-center">
          <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
          Global User Distribution
        </h3>
        <div className="space-y-2">
          {Object.entries(userDistribution).map(([continent, data]) => (
            <div key={continent} className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: data.color }}
                />
                <span className="text-white font-medium capitalize">
                  {continent.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
              <span className="text-cyan-200 font-bold">
                {(data.total / 1000).toFixed(1)}K
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex items-center space-x-2 text-xs text-gray-300">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
            <span>Dots represent user density</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-300 mt-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <span>Lines show continent borders</span>
          </div>
        </div>
      </motion.div>

      {/* Additional glow effects */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-emerald-400/10 rounded-full blur-3xl -z-10"
        style={{
          width: '110%',
          height: '110%',
          top: '-5%',
          left: '-5%',
        }}
      />
    </motion.div>
  );
}