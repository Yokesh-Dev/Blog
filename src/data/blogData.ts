export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  readTime: number;
  imageUrl: string;
  featured: boolean;
  likes: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Growth Mindset: Transforming Challenges into Opportunities',
    excerpt: 'Discover how adopting a growth mindset can revolutionize your approach to personal and professional development.',
    content: `
# The Growth Mindset: Transforming Challenges into Opportunities

In today's rapidly evolving world, the difference between those who thrive and those who merely survive often comes down to mindset. Carol Dweck's research on growth mindset has fundamentally changed how we understand learning, resilience, and success.

## What is a Growth Mindset?

A growth mindset is the belief that abilities and intelligence can be developed through dedication, hard work, and learning from failure. This contrasts with a fixed mindset, where people believe their talents are static traits.

## Key Principles of Growth Mindset

### 1. Embrace Challenges
Instead of avoiding difficulties, see them as opportunities to grow. Every challenge is a chance to expand your capabilities.

### 2. Learn from Criticism
Constructive feedback becomes a valuable tool for improvement rather than a personal attack.

### 3. Find Inspiration in Others' Success
Rather than feeling threatened by others' achievements, use them as motivation and learning opportunities.

## Practical Steps to Develop a Growth Mindset

1. **Replace "I can't" with "I can't yet"**
2. **Focus on the process, not just outcomes**
3. **Celebrate effort and learning, not just results**
4. **Turn failures into learning experiences**

## Conclusion

Developing a growth mindset is a journey, not a destination. It requires consistent practice and self-reflection, but the rewards—increased resilience, better learning, and greater achievement—are worth the effort.
    `,
    category: 'Personal Development',
    tags: ['mindset', 'growth', 'success', 'psychology'],
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      bio: 'Personal development coach and psychology researcher'
    },
    publishedAt: '2024-01-15',
    readTime: 8,
    imageUrl: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    likes: 0
  },
  {
    id: '2',
    title: 'React 19: What\'s New and How It Changes Everything',
    excerpt: 'Explore the groundbreaking features in React 19 and how they will impact modern web development.',
    content: `
# React 19: What's New and How It Changes Everything

React 19 brings revolutionary changes that will transform how we build web applications. Let's dive into the most significant updates and their implications for developers.

## Major New Features

### 1. Server Components
React Server Components allow you to write components that render on the server, reducing bundle size and improving performance.

### 2. Concurrent Features
Enhanced concurrent rendering capabilities provide smoother user experiences with better handling of complex UI updates.

### 3. Automatic Batching
React 19 automatically batches state updates in more scenarios, leading to better performance out of the box.

## Breaking Changes to Watch For

- Legacy lifecycle methods are now fully deprecated
- StrictMode behavior changes
- Updated TypeScript definitions

## Migration Guide

1. **Update your dependencies**
2. **Review deprecated patterns in your codebase**
3. **Test thoroughly with the new concurrent features**
4. **Optimize for server components where applicable**

React 19 represents a significant leap forward in web development capabilities.
    `,
    category: 'Developer Technology',
    tags: ['react', 'javascript', 'web-development', 'frontend'],
    author: {
      name: 'Alex Rodriguez',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      bio: 'Senior Frontend Engineer and React contributor'
    },
    publishedAt: '2024-01-12',
    readTime: 12,
    imageUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    likes: 0
  },
  {
    id: '3',
    title: 'Landing Your Dream Tech Job: A Complete Guide',
    excerpt: 'From resume optimization to interview preparation, master every step of the tech job search process.',
    content: `
# Landing Your Dream Tech Job: A Complete Guide

The tech job market is competitive, but with the right strategy and preparation, you can land your dream role. Here's your comprehensive roadmap to success.

## Phase 1: Preparation

### Resume Optimization
- Highlight relevant technical skills
- Quantify your achievements
- Use ATS-friendly formatting
- Tailor for each application

### Portfolio Development
- Showcase 3-5 high-quality projects
- Include live demos and source code
- Write clear documentation
- Demonstrate problem-solving skills

## Phase 2: Application Strategy

### Target Companies
Research companies that align with your values and career goals. Consider:
- Company culture and values
- Growth opportunities
- Technology stack
- Work-life balance

### Networking
- Attend tech meetups and conferences
- Engage on professional social media
- Reach out to employees at target companies
- Join developer communities

## Phase 3: Interview Excellence

### Technical Preparation
1. **Data Structures & Algorithms**: Master the fundamentals
2. **System Design**: Understand scalability principles
3. **Coding Practice**: Solve problems daily
4. **Mock Interviews**: Practice with peers or platforms

### Behavioral Interviews
Prepare STAR method stories for:
- Leadership experiences
- Conflict resolution
- Project challenges
- Team collaboration

## Salary Negotiation

- Research market rates
- Know your worth
- Negotiate the entire package
- Be prepared to walk away

Success in tech job searching requires persistence, continuous learning, and strategic preparation.
    `,
    category: 'Job Search',
    tags: ['career', 'interview', 'resume', 'tech-jobs'],
    author: {
      name: 'Maya Patel',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      bio: 'Career coach specializing in tech placements'
    },
    publishedAt: '2024-01-10',
    readTime: 15,
    imageUrl: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    likes: 0
  },
  {
    id: '4',
    title: 'Building Resilience: Bouncing Back from Setbacks',
    excerpt: 'Learn proven strategies to develop mental resilience and turn life\'s challenges into stepping stones.',
    content: `
# Building Resilience: Bouncing Back from Setbacks

Resilience isn't about avoiding failure—it's about developing the capacity to recover, learn, and grow stronger from life's inevitable challenges.

## Understanding Resilience

Resilience is a skill that can be developed through practice and intentional effort. It's not a trait you're born with or without.

## The Resilience Framework

### 1. Cognitive Flexibility
Learn to reframe negative situations and find alternative perspectives.

### 2. Emotional Regulation
Develop healthy coping mechanisms for managing stress and difficult emotions.

### 3. Social Support
Build and maintain strong relationships that provide support during tough times.

### 4. Self-Care
Prioritize physical and mental health as the foundation of resilience.

## Practical Resilience Strategies

- **Mindfulness and meditation**
- **Journaling for reflection**
- **Setting realistic goals**
- **Celebrating small wins**
- **Learning from failure**

Building resilience is a lifelong journey that pays dividends in both personal and professional life.
    `,
    category: 'Personal Development',
    tags: ['resilience', 'mental-health', 'self-improvement', 'psychology'],
    author: {
      name: 'Dr. James Wilson',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      bio: 'Licensed psychologist and resilience researcher'
    },
    publishedAt: '2024-01-08',
    readTime: 10,
    imageUrl: 'https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    likes: 0
  },
  {
    id: '5',
    title: 'TypeScript Best Practices for Large-Scale Applications',
    excerpt: 'Master TypeScript patterns and practices that scale with your growing codebase and team.',
    content: `
# TypeScript Best Practices for Large-Scale Applications

As applications grow in complexity, TypeScript becomes invaluable for maintaining code quality and developer productivity. Here are essential practices for large-scale TypeScript projects.

## Project Structure and Organization

### Module Design
- Use barrel exports for clean imports
- Organize by feature, not by file type
- Implement proper dependency management

### Type Organization
- Create dedicated type definition files
- Use module augmentation carefully
- Implement proper type exports

## Advanced Type Patterns

### Utility Types
Make use of TypeScript's built-in utility types:
- \`Partial<T>\` for optional properties
- \`Pick<T, K>\` for selecting specific properties
- \`Omit<T, K>\` for excluding properties

### Custom Utility Types
Create reusable utility types for your domain:

\`\`\`typescript
type ApiResponse<T> = {
  data: T;
  status: 'success' | 'error';
  message?: string;
};
\`\`\`

## Performance Considerations

### Compilation Speed
- Use project references for large codebases
- Implement incremental compilation
- Optimize your tsconfig.json

### Bundle Size
- Use tree-shaking effectively
- Implement code splitting
- Monitor your bundle analyzer

## Team Collaboration

### Code Standards
- Enforce consistent coding styles
- Use ESLint with TypeScript rules
- Implement pre-commit hooks

### Documentation
- Document complex types
- Use JSDoc for better IDE support
- Maintain architectural decision records

These practices will help you build maintainable, scalable TypeScript applications.
    `,
    category: 'Developer Technology',
    tags: ['typescript', 'javascript', 'best-practices', 'architecture'],
    author: {
      name: 'Emma Thompson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      bio: 'Staff Engineer and TypeScript advocate'
    },
    publishedAt: '2024-01-05',
    readTime: 14,
    imageUrl: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    likes: 0
  },
  {
    id: '6',
    title: 'Remote Work Success: Building Your Ideal Home Office',
    excerpt: 'Create a productive remote work environment that enhances focus, creativity, and work-life balance.',
    content: `
# Remote Work Success: Building Your Ideal Home Office

Remote work has become the new normal, but success requires more than just a laptop and Wi-Fi. Creating an optimal home office environment is crucial for productivity and well-being.

## Physical Environment Setup

### Ergonomic Workspace
- Invest in a quality chair and desk
- Position your monitor at eye level
- Ensure proper lighting to reduce eye strain
- Keep frequently used items within reach

### Technology Infrastructure
- Reliable high-speed internet
- Quality webcam and microphone
- Dual monitors for increased productivity
- Backup power solutions

## Productivity Systems

### Time Management
- Use time-blocking techniques
- Implement the Pomodoro Technique
- Set clear boundaries between work and personal time
- Create morning and evening routines

### Communication
- Over-communicate with team members
- Use asynchronous communication effectively
- Schedule regular check-ins
- Be intentional about virtual social interactions

## Maintaining Work-Life Balance

### Physical Boundaries
- Designate a specific work area
- Close your laptop at the end of the workday
- Change clothes to signal work transitions
- Take regular breaks and move around

### Mental Boundaries
- Set clear working hours
- Learn to say no to excessive requests
- Practice mindfulness and stress management
- Maintain hobbies and interests outside work

## Professional Development

- Join virtual networking events
- Participate in online learning
- Stay connected with industry communities
- Seek mentorship opportunities

Remote work success is about creating systems that support both productivity and well-being.
    `,
    category: 'Job Search',
    tags: ['remote-work', 'productivity', 'work-life-balance', 'career'],
    author: {
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      bio: 'Remote work consultant and productivity expert'
    },
    publishedAt: '2024-01-03',
    readTime: 11,
    imageUrl: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    likes: 0
  }
];

export const categories = ['All', 'Personal Development', 'Developer Technology', 'Job Search'];

export const allTags = Array.from(
  new Set(blogPosts.flatMap(post => post.tags))
).sort();