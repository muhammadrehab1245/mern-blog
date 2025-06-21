import { Button, Box, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import BlogsListing from '../components/BlogListing';

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
const blogs = [
    {
      id: 1,
      title: "How to Learn React",
      description: "A comprehensive guide to learning React from scratch.",
    },
    {
      id: 2,
      title: "Understanding JavaScript Closures",
      description: "In this post, we dive deep into JavaScript closures and their use cases.",
    },
    {
      id: 3,
      title: "CSS Grid Layout Tutorial",
      description: "Learn how to use CSS Grid Layout for creating modern web designs.",
    },
    {
      id: 4,
      title: "Introduction to Node.js",
      description: "Get started with Node.js and build server-side applications.",
    },
  ];

  return (
    <>
    <Navbar/>
     <BlogsListing blogs={blogs} />;
    </>
  );
};

export default Home;
