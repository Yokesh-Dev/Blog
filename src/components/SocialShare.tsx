import React from 'react';
import { Share2, Twitter, Linkedin, Facebook, Link, Copy } from 'lucide-react';

interface SocialShareProps {
  title: string;
  url: string;
  excerpt?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, url, excerpt = '' }) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const shareUrl = window.location.origin + url;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(excerpt);

  const socialLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:bg-blue-50 hover:text-blue-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-blue-50 hover:text-blue-700'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-50 hover:text-blue-800'
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
      >
        <Share2 className="h-4 w-4" />
        <span className="font-medium">Share</span>
      </button>

      {showDropdown && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-48 z-10">
          {socialLinks.map(({ name, icon: Icon, url, color }) => (
            <button
              key={name}
              onClick={() => handleShare(url)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-left text-gray-700 transition-colors duration-200 ${color}`}
            >
              <Icon className="h-4 w-4" />
              <span>Share on {name}</span>
            </button>
          ))}
          
          <hr className="my-2 border-gray-100" />
          
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center space-x-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            {copied ? (
              <>
                <Copy className="h-4 w-4 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Link className="h-4 w-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Backdrop */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default SocialShare;