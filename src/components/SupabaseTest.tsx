'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { testConnection } from '@/lib/supabase';

export default function SupabaseTest() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTestConnection = async () => {
    setIsLoading(true);
    try {
      const result = await testConnection();
      setIsConnected(result);
    } catch (error) {
      console.error('Connection test failed:', error);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-medium mb-4">Supabase Connection Test</h3>
      <Button 
        onClick={handleTestConnection}
        disabled={isLoading}
        className="mb-4"
      >
        {isLoading ? 'Testing...' : 'Test Database Connection'}
      </Button>
      
      {isConnected !== null && (
        <div className={`p-3 rounded ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isConnected ? '✅ Database connected successfully!' : '❌ Database connection failed'}
        </div>
      )}
    </div>
  );
}