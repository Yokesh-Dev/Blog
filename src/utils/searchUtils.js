export function searchPosts(posts, query) {
  if (!query.trim()) return posts;
  
  const searchTerm = query.toLowerCase();
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    post.category.toLowerCase().includes(searchTerm) ||
    post.author.name.toLowerCase().includes(searchTerm)
  );
}

export function filterPostsByCategory(posts, category) {
  if (category === 'All') return posts;
  return posts.filter(post => post.category === category);
}

export function filterPostsByTag(posts, tag) {
  return posts.filter(post => post.tags.includes(tag));
}

export function sortPosts(posts, sortBy) {
  return [...posts].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      case 'likes':
        return b.likes - a.likes;
      case 'readTime':
        return a.readTime - b.readTime;
      default:
        return 0;
    }
  });
}