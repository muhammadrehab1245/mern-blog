import React from "react";
import { useForm } from "@mantine/form";
import { Button, TextInput, Textarea, Title, Container, Paper, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CreateBlog = () => {
  const navigate = useNavigate();

  // Mantine form validation and initialization
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },

    validate: {
      title: (value) => (value.trim().length === 0 ? "Title is required" : null),
      description: (value) =>
        value.trim().length === 0 ? "Description is required" : null,
    },
  });

  const handleSubmit = (values) => {
    // In a real-world scenario, here you would send the form data to an API
    console.log("Form Submitted:", values);

    // For now, just navigate to another page after the form is submitted
    navigate("/home"); // Redirect to Home page after submission (or any other route)
  };

  return (
    <>
    <Navbar />
   
    <Container size="xs" mt="lg">
      <Paper shadow="xl" padding="xl"  radius="md" className="bg-white">
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
            className="transition-all "
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
              Create Blog
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
     </>
  );
};

export default CreateBlog;
