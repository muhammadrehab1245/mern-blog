// components/BlogsListing.jsx
import React from "react";
import { SimpleGrid } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../config/http";
import BlogCard from "./BlogCard";

const BlogsListing = ({ blogs }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    // mutationFn receives the post ID
    mutationFn: (postId) => {
      const token = sessionStorage.getItem("accessToken");
      return http.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      // Invalidate the 'blogs' query so it refetches
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <SimpleGrid cols={3} spacing="lg">
      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          id={blog._id}
          title={blog.title}
          description={blog.content}
          onDelete={handleDelete}
        />
      ))}
    </SimpleGrid>
  );
};

export default BlogsListing;
