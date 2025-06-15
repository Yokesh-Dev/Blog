import React, { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { blogPosts, categories, allTags } from '../data/blogData';
import { filterPostsByCategory, sortPosts } from '../utils/searchUtils';

const Category = () => {
  const { category } = useParams();
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');
  const [visiblePosts, setVisiblePosts] = useState(9);

  if (!category || !categories.includes(category)) {
    return <Navigate to="/" replace />;
  }

  const filteredAndSortedPosts = useMemo(() => {
    let posts = filterPostsByCategory(blogPosts, category);
    
    if (selectedTag) {
      posts = posts.filter(post => post.tags.includes(selectedTag));
    }
    
    return sortPosts(posts, sortBy);
  }, [category, selectedTag, sortBy]);

  const displayedPosts = filteredAndSortedPosts.slice(0, visiblePosts);
  const categoryTags = allTags.filter(tag => 
    blogPosts.some(post => post.category === category && post.tags.includes(tag))
  );

  const loadMorePosts = () => {
    setVisiblePosts(prev => prev + 9);
  };

  const getCategoryDescription = (cat) => {
    switch (cat) {
      case 'Personal Development':
        return 'Unlock your potential with insights on growth mindset, productivity, and life skills.';
      case 'Developer Technology':
        return 'Stay ahead with the latest trends, tools, and best practices in software development.';
      case 'Job Search':
        return 'Navigate your career journey with tips on interviews, networking, and professional growth.';
      default:
        return 'Explore our collection of insightful articles.';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Category Header */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-gray-950 dark:via-blue-950 dark:to-gray-950 text-white transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {category}
            </h1>
            <p className="text-xl text-blue-100 dark:text-blue-200 mb-8 max-w-3xl mx-auto">
              {getCategoryDescription(category)}
            </p>
            <div className="flex items-center justify-center space-x-4 text-blue-200">
              <span>{filteredAndSortedPosts.length} articles</span>
              <span>•</span>
              <span>{categoryTags.length} topics</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Controls */}
        <section className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Tag Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag('')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedTag === ''
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  All Tags
                </button>
                {categoryTags.slice(0, 5).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedTag === tag
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
                {categoryTags.length > 5 && (
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                  >
                    <option value="">More tags...</option>
                    {categoryTags.slice(5).map((tag) => (
                      <option key={tag} value={tag}>
                        #{tag}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="flex items-center space-x-4">
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

        {/* Articles Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedTag ? `Articles tagged with #${selectedTag}` : `All ${category} Articles`}
            </h2>
            <span className="text-gray-500 dark:text-gray-400">
              {filteredAndSortedPosts.length} article{filteredAndSortedPosts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredAndSortedPosts.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No articles found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            <>
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'space-y-6'
              }>
                {displayedPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* Load More */}
              {visiblePosts < filteredAndSortedPosts.length && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMorePosts}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
                  >
                    Load More Articles
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

export default Category;