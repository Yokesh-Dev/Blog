import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Heart, Tag } from 'lucide-react';
import { BlogPost } from '../data/blogData';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  const [likes, setLikes] = useLocalStorage(`likes-${post.id}`, post.likes);
  const [hasLiked, setHasLiked] = useLocalStorage(`liked-${post.id}`, false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (hasLiked) {
      setLikes(Math.max(0, likes - 1));
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const cardClasses = featured
    ? "group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-200 lg:flex"
    : "group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-200";

  return (
    <Link to={`/post/${post.id}`} className={cardClasses}>
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? 'lg:w-1/2' : ''}`}>
        <img
          src={post.imageUrl}
          alt={post.title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            featured ? 'h-64 lg:h-full' : 'h-48'
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white shadow-lg">
            {post.category}
          </span>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-6 flex-1 flex flex-col ${featured ? 'lg:w-1/2' : ''}`}>
        {/* Title */}
        <h2 className={`font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-3 ${
          featured ? 'text-2xl lg:text-3xl' : 'text-xl'
        }`}>
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{post.tags.length - 3} more</span>
          )}
        </div>

        {/* Author and Meta */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-1 text-sm font-medium text-gray-900">
                <User className="h-4 w-4" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              hasLiked
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : 'bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600'
            }`}
          >
            <Heart className={`h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{likes}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;