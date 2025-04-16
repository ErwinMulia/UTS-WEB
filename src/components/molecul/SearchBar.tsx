'use client';

import React from 'react';
import Input from '@/components/atom/Input';
import SearchButton from '@/components/atom/SearchButton';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => (
  <div className="relative mr-2 hidden md:block">
    <Input
      placeholder="Cari acara, lokasi..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <SearchButton />
  </div>
);

export default SearchBar;
