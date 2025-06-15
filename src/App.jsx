import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import Category from './pages/Category';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="post/:id" element={<BlogPost />} />
          <Route path="category/:category" element={<Category />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;