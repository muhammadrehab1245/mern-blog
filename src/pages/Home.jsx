import React, { useEffect, useState } from "react";
import { Button, Box, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import BlogsListing from "../components/BlogListing";

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // State to store the blog posts
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://assignment-blog-mocha.vercel.app/api/posts/list",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`, // Include the token in the headers
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();
        setBlogs(data); // Set the blog posts
        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        setError(err.message); // Set error if something goes wrong
        setLoading(false);
      }
    };

    fetchBlogs(); // Fetch blogs on component mount
  }, []);

  if (loading) {
    return <Text align="center">Loading...</Text>;
  }

  if (error) {
    return <Text align="center" color="red">{`Error: ${error}`}</Text>;
  }

  return (
    <>
      <Navbar />
      <BlogsListing blogs={blogs} />
    </>
  );
};

export default Home;
