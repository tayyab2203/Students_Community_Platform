import React from 'react';
import { categories } from '../../utils/constants';
import Input from '../ui/Input';

const SearchFilterBar = ({ search, setSearch, category, setCategory }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <Input
        placeholder="Search by name or bio"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded flex-1"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilterBar;