import React from "react";
import { useForm } from "@mantine/form";
import { Button, Box, TextInput, PasswordInput, Title, Divider, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { http } from "../config/http";
import { useEffect } from "react";
import useRedirectIfAuthenticated from "../utils/useRedirectIfAuthenticated";


const LoginForm = () => {
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

  // React Query Mutation for Login
  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (payload) => {
      const response = await http.post("/auth/login", payload);
      return response.data;
    },
    onSuccess: (data) => {
      // Store the Access Token and Refresh Token
      const { accessToken, refreshToken } = data;
      
      sessionStorage.setItem("accessToken", accessToken);
      document.cookie = `refreshToken=${refreshToken}; HttpOnly`;

      navigate("/home");
    },
    onError: (error) => {
      console.log("Login failed", error.response?.data?.message || error.message);
    },
  });

  // useEffect(() => {
  useRedirectIfAuthenticated();
  // },)

  const handleSubmit = (values) => {
    mutate({
      username: values.username,
      password: values.password,
    });
  };

  return (
    <div className="min-h-screen flex items-center">
      <Box className="bg-white w-[44%] mx-auto p-8 shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <Title order={2} className="text-xl text-[#008080] font-semibold">
            Login to Blog App
          </Title>
        </div>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {/* Username Field */}
          <TextInput
            label="Username"
            placeholder="JohnDoe"
            size="lg"
            withAsterisk
            {...form.getInputProps("username")}
            className="mb-6"
          />

          {/* Password Field */}
          <PasswordInput
            label="Password"
            placeholder="********"
            size="lg"
            withAsterisk
            {...form.getInputProps("password")}
            className="mb-6"
          />

          {/* Submit Button */}
          <Button
            fullWidth
            mt={4}
            color="teal"
            type="submit"
            className="hover:bg-teal-600 transition-colors"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          {/* Divider */}
          <Divider my="sm" label="or" />

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <Button
              variant="outline"
              color="gray"
              onClick={() => navigate("/signup")}
              size="sm"
            >
              Don't have an account? Sign Up
            </Button>
          </div>
        </form>

        {error && (
          <div className="text-red-500 text-center mt-4">{error.response?.data?.message || "An error occurred during login"}</div>
        )}
      </Box>
    </div>
  );
};

export default LoginForm;
