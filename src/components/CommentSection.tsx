import React, { useState } from 'react';
import { MessageCircle, Reply, Heart, User } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
}

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useLocalStorage<Comment[]>(`comments-${postId}`, []);
  const [commentLikes, setCommentLikes] = useLocalStorage<Record<string, number>>(`comment-likes-${postId}`, {});
  const [likedComments, setLikedComments] = useLocalStorage<Record<string, boolean>>(`liked-comments-${postId}`, {});
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !author.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: author.trim(),
      content: newComment.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setAuthor('');
  };

  const handleSubmitReply = (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (!replyContent.trim() || !replyAuthor.trim()) return;

    const reply: Comment = {
      id: Date.now().toString(),
      author: replyAuthor.trim(),
      content: replyContent.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    setComments(comments.map(comment => 
      comment.id === parentId 
        ? { ...comment, replies: [reply, ...comment.replies] }
        : comment
    ));

    setReplyContent('');
    setReplyAuthor('');
    setReplyTo(null);
  };

  const handleLikeComment = (commentId: string) => {
    const currentLikes = commentLikes[commentId] || 0;
    const hasLiked = likedComments[commentId] || false;

    if (hasLiked) {
      setCommentLikes({ ...commentLikes, [commentId]: Math.max(0, currentLikes - 1) });
      setLikedComments({ ...likedComments, [commentId]: false });
    } else {
      setCommentLikes({ ...commentLikes, [commentId]: currentLikes + 1 });
      setLikedComments({ ...likedComments, [commentId]: true });
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const CommentItem: React.FC<{ comment: Comment; isReply?: boolean }> = ({ comment, isReply = false }) => {
    const likes = commentLikes[comment.id] || comment.likes;
    const hasLiked = likedComments[comment.id] || false;

    return (
      <div className={`${isReply ? 'ml-12 border-l-2 border-gray-100 pl-4' : ''}`}>
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-gray-900">{comment.author}</span>
                <span className="text-sm text-gray-500">{formatDate(comment.timestamp)}</span>
              </div>
              <p className="text-gray-700 mb-3">{comment.content}</p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLikeComment(comment.id)}
                  className={`flex items-center space-x-1 text-sm transition-colors duration-200 ${
                    hasLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} />
                  <span>{likes}</span>
                </button>
                {!isReply && (
                  <button
                    onClick={() => setReplyTo(comment.id)}
                    className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Reply className="h-4 w-4" />
                    <span>Reply</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reply Form */}
        {replyTo === comment.id && (
          <form onSubmit={(e) => handleSubmitReply(e, comment.id)} className="mt-4 ml-12">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="space-y-3">
                <input
                  type="text"
                  value={replyAuthor}
                  onChange={(e) => setReplyAuthor(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                  >
                    Reply
                  </button>
                  <button
                    type="button"
                    onClick={() => setReplyTo(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200 text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* Replies */}
        {comment.replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} isReply={true} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900">
          Comments ({comments.length + comments.reduce((total, comment) => total + comment.replies.length, 0)})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
            >
              Post Comment
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Be the first to comment on this post!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;