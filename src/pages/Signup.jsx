import React from "react";
import { useForm } from "@mantine/form";
import { Button, Box, Input, Text, Title, Divider } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { http } from "../config/http";
import useRedirectIfAuthenticated from "../utils/useRedirectIfAuthenticated";
import Navbar from "../components/Navbar";

const SignUpForm = () => {
  const navigate = useNavigate();

  // Using Mantine's useForm hook for form handling and validation
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) => (value.trim().length === 0 ? "Username is required" : null),
      password: (value) => (value.trim().length === 0 ? "Password is required" : null),
    },
  });

  // React Query Mutation for Sign Up
  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (payload) => {
      const response = await http.post("/auth/register", payload);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("SignUp Successful:", data);
      navigate("/login");
    },
    onError: (error) => {
      console.log("Error occurred:", error);
    },
  });

  const handleSubmit = (values) => {
    // Call the mutate function with the payload (username and password)
    mutate({
      username: values.username,
      password: values.password,
    });
  };

    // useEffect(() => {
    useRedirectIfAuthenticated();
    // },)

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center">
      <Box className="bg-white w-[44%] mx-auto p-8 shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <Title order={2} className="text-xl font-semibold">
            Sign Up
          </Title>
        </div>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-left text-sm font-medium text-gray-700">Username</label>
            <Input
              type="text"
              placeholder="JohnDoe"
              value={form.values.username}
              onChange={(e) => form.setFieldValue("username", e.target.value)}
              error={form.errors.username}
              className="mt-2"
              size="lg"
            />
            {form.errors.username && (
              <Text color="red" size="sm">{form.errors.username}</Text>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-left text-sm font-medium text-gray-700">Password</label>
            <Input
              type="password"
              placeholder="********"
              value={form.values.password}
              onChange={(e) => form.setFieldValue("password", e.target.value)}
              error={form.errors.password}
              className="mt-2"
              size="lg"
            />
            {form.errors.password && (
              <Text color="red" size="sm">{form.errors.password}</Text>
            )}
          </div>

          {/* Submit Button */}
          <Button
            fullWidth
            mt={4}
            color="teal"
            type="submit"
            className="hover:bg-teal-600 transition-colors"
            size="lg"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>

          {/* Divider */}
          <Divider my="sm" label="or" />

          {/* Login Link */}
          <div className="text-center mt-4">
            <Button
              variant="outline"
              color="gray"
              onClick={() => navigate("/login")}
              size="sm"
            >
              Already have an account? Login
            </Button>
          </div>
        </form>

        {error && (
          <div className="text-red-500 text-center mt-4">{error.message}</div>
        )}
      </Box>
    </div>
    </>
  );
};

export default SignUpForm;
