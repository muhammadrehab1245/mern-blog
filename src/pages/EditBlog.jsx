import React, { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { http } from "../config/http";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

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

  useEffect(() => {
    // Fetch the post data when the component mounts or when `id` changes
    const fetchPost = async () => {
      try {
        const response = await http.get(`/posts/${id}`);
        setPost(response.data);

        // Prefill the form with the fetched data
        form.setValues({
          title: response.data.title,
          description: response.data.content,
        });
      } catch (error) {
        console.error("Error fetching the post", error);
      }
    };

    if (id) {
      fetchPost(); // Only fetch if there's an ID in the URL
    }
  }, [id]); // Only trigger useEffect when the `id` changes

  const handleSubmit = async (values) => {
    try {
      // Send a PUT request to update the blog post
      await http.put(`/posts/${id}`, {
        title: values.title,
        content: values.description,
      });
      navigate("/home"); // Redirect to home after successful update
    } catch (error) {
      console.error("Error updating post", error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <Container size="xs" mt="lg">
      <Paper shadow="xl" padding="xl" radius="md" className="bg-white">
        <Title order={2} className="text-center mb-6 text-teal-700">
          Edit Blog
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
            >
              Update Blog
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default EditBlog;
