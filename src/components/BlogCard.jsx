import React from "react";
import { Card, Text, Title, Button, Group, ActionIcon } from "@mantine/core";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ title, description, id, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${id}`); // Navigate to the specific blog page
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" className="transition-all hover:shadow-lg">
      <Group position="apart" mb="xs">
        <Title order={3} className="text-xl text-gray-800">{title}</Title>
        <ActionIcon color="red" onClick={() => onDelete(id)}>
          <FaTrash size={18} />
        </ActionIcon>
      </Group>
      <Text className="text-gray-600 mb-4">{description}</Text>
      <Button
        onClick={handleClick}
        color="teal"
        size="sm"
        fullWidth
      >
        View More
      </Button>
    </Card>
  );
};

export default BlogCard;
