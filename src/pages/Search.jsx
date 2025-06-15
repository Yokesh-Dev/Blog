import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Filter, Grid, List, X } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import SearchBar from '../components/SearchBar';
import { blogPosts, categories, allTags } from '../data/blogData';
import { searchPosts, filterPostsByCategory, sortPosts } from '../utils/searchUtils';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');
  const [visibleResults, setVisibleResults] = useState(9);

  // Update query when search params change
  useEffect(() => {
    const newQuery = searchParams.get('q') || '';
    setQuery(newQuery);
  }, [searchParams]);

  const searchResults = useMemo(() => {
    let results = searchPosts(blogPosts, query);
    
    if (selectedCategory !== 'All') {
      results = filterPostsByCategory(results, selectedCategory);
    }
    
    if (selectedTag) {
      results = results.filter(post => post.tags.includes(selectedTag));
    }
    
    return sortPosts(results, sortBy);
  }, [query, selectedCategory, selectedTag, sortBy]);

  const displayedResults = searchResults.slice(0, visibleResults);
  
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setSearchParams(newQuery ? { q: newQuery } : {});
    setVisibleResults(9); // Reset pagination
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedTag('');
  };

  const loadMoreResults = () => {
    setVisibleResults(prev => prev + 9);
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedTag !== '';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Search Header */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-gray-950 dark:via-blue-950 dark:to-gray-950 text-white transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Search Articles
            </h1>
            <p className="text-xl text-blue-100 dark:text-blue-200 mb-8">
              Find insights on personal development, technology, and career growth
            </p>
            
            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search articles, tags, or authors..."
                  className="w-full pl-10 pr-4 py-3 bg-white border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Summary */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {query ? `Search Results for "${query}"` : 'All Articles'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {searchResults.length} article{searchResults.length !== 1 ? 's' : ''} found
                {hasActiveFilters && ' with current filters'}
              </p>
            </div>
            
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <X className="h-4 w-4" />
                <span>Clear Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters and Controls */}
        <section className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                {/* Tag Filter */}
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                >
                  <option value="">All Tags</option>
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>
                      #{tag}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                >
                  <option value="date">Latest</option>
                  <option value="likes">Most Liked</option>
                  <option value="readTime">Quick Reads</option>
                </select>

                {/* View Mode */}
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors duration-200 ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Results */}
        <section>
          {searchResults.length === 0 ? (
            <div className="text-center py-16">
              <SearchIcon className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                {query ? 'No results found' : 'Start searching'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {query 
                  ? 'Try adjusting your search terms or filters'
                  : 'Enter a keyword to find relevant articles'
                }
              </p>
              
              {query && (
                <div className="max-w-md mx-auto">
                  <SearchBar autoFocus={false} />
                </div>
              )}
            </div>
          ) : (
            <>
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'space-y-6'
              }>
                {displayedResults.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* Load More */}
              {visibleResults < searchResults.length && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMoreResults}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
                  >
                    Load More Results
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Search;