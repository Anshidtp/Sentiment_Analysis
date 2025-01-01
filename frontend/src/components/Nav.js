import React from 'react';
import { ChartBar } from 'lucide-react';

const Nav = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChartBar className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SentimentScope
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;