'use client';

import React from 'react';
import { SearchIcon } from 'lucide-react';

const SearchButton = () => (
  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500">
    <SearchIcon size={16} />
  </button>
);

export default SearchButton;