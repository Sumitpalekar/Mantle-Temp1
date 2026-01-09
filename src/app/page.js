'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/dashboard');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="text-center">
        <div className="text-5xl mb-6 animate-pulse">🌿</div>
        <p className="text-gray-300 text-lg">Loading GreenXchange...</p>
      </div>
    </div>
  );
}