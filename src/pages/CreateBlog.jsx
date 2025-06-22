import React from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  TextInput,
  Textarea,
  Title,
  Container,
  Paper,
  Group,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { http } from "../config/http"; // Your custom Axios instance (or use fetch)
import Navbar from "../components/Navbar";

const CreateBlog = () => {
  const navigate = useNavigate();

  // Using Mantine's useForm hook for form handling and validation
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },

    validate: {
      title: (value) =>
        value.trim().length === 0 ? "Title is required" : null,
      description: (value) =>
        value.trim().length === 0 ? "Description is required" : null,
    },
  });

  // React Query Mutation for Create Blog Post
  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (payload) => {
      // Fetching the Authorization token from sessionStorage or cookie
      const token = sessionStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No access token found");
      }

      const response = await http.post("/posts", payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      return response.data;
    },
    onSuccess: (data) => {
      // Handle success, redirect to Home page
      console.log("Post created successfully:", data);
      navigate("/home");
    },
    onError: (error) => {
      // Handle error (optional: show a message)
      console.log("Error creating post:", error.message);
    },
  });

  const handleSubmit = (values) => {
    // Prepare payload
    const payload = {
      title: values.title,
      content: values.description, // Assuming content is the description
    };

    // Call mutate function to send the request
    mutate(payload);
  };

  return (
    <>
      <Navbar />
      <Container size="xs" mt="lg">
        <Paper shadow="xl" padding="xl" radius="md" className="bg-white">
          <Title order={2} className="text-center mb-6 text-teal-700">
            Create New Blog
          </Title>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            {/* Title Field */}
            <TextInput
              label="Title"
              placeholder="Enter blog title"
              {...form.getInputProps("title")}
              mb="lg"
              required
              size="md"
              className="transition-all"
            />

            {/* Description Field */}
            <Textarea
              label="Description"
              placeholder="Enter blog description"
              {...form.getInputProps("description")}
              mb="lg"
              required
              size="md"
              rows={10}
              className="transition-all"
            />

            {/* Submit Button */}
            <Group position="center" mt="md">
              <Button
                type="submit"
                color="teal"
                fullWidth
                size="lg"
                className="transition-all hover:bg-teal-600 hover:scale-105"
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? "Creating Blog..." : "Create Blog"}
              </Button>
            </Group>
          </form>

          {/* Error Handling */}
          {error && (
            <div className="text-red-500 text-center mt-4">
              {error.response?.data?.message ||
                "An error occurred while creating the blog post."}
            </div>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default CreateBlog;
