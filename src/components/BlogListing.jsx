import React from "react";
import BlogCard from "./BlogCard"; // Import the reusable BlogCard component
import { Grid } from "@mantine/core";

const BlogsListing = ({ blogs }) => {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Latest Blogs</h2>
      <Grid  gutter="md">
        {blogs.map((blog) => (
          <Grid.Col key={blog.id} span={6} sm={4} md={3}>
            <BlogCard
              id={blog.id}
              title={blog.title}
              description={blog.description}
            />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default BlogsListing;
