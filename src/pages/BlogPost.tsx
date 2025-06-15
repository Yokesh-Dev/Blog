import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Calendar, Clock, User, Heart, Tag, ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import CommentSection from '../components/CommentSection';
import SocialShare from '../components/SocialShare';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  const [likes, setLikes] = useLocalStorage(`likes-${id}`, post?.likes || 0);
  const [hasLiked, setHasLiked] = useLocalStorage(`liked-${id}`, false);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const handleLike = () => {
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

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Get next/previous posts
  const currentIndex = blogPosts.findIndex(p => p.id === post.id);
  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <article className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-96 bg-gray-900 overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-8 left-8">
          <Link
            to={`/category/${post.category}`}
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
          >
            {post.category}
          </Link>
        </div>

        {/* Back Button */}
        <div className="absolute top-8 right-8">
          <Link
            to="/"
            className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Header */}
        <header className="relative -mt-20 z-10 bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            {/* Author Info */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-900">{post.author.name}</span>
                </div>
                <p className="text-sm text-gray-600">{post.author.bio}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  hasLiked
                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                    : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <Heart className={`h-5 w-5 ${hasLiked ? 'fill-current' : ''}`} />
                <span className="font-medium">{likes}</span>
              </button>
              <SocialShare title={post.title} url={`/post/${post.id}`} excerpt={post.excerpt} />
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 border-t border-gray-100 pt-6">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/search?q=${encodeURIComponent(tag)}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Link>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />
          </div>
        </section>

        {/* Navigation */}
        {(previousPost || nextPost) && (
          <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
              {previousPost ? (
                <Link
                  to={`/post/${previousPost.id}`}
                  className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group flex-1 md:mr-4"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Previous</p>
                    <p className="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-1">
                      {previousPost.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="flex-1 md:mr-4" />
              )}

              {nextPost ? (
                <Link
                  to={`/post/${nextPost.id}`}
                  className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group flex-1 md:ml-4 text-right"
                >
                  <div className="text-right flex-1">
                    <p className="text-sm text-gray-500">Next</p>
                    <p className="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-1">
                      {nextPost.title}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                </Link>
              ) : (
                <div className="flex-1 md:ml-4" />
              )}
            </div>
          </section>
        )}

        {/* Comments */}
        <section className="mb-8">
          <CommentSection postId={post.id} />
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/post/${relatedPost.id}`}
                  className="group block"
                >
                  <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <img
                      src={relatedPost.imageUrl}
                      alt={relatedPost.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};

export default BlogPost;