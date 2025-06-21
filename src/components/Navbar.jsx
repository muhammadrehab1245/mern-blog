import { useState } from "react";
import { Drawer, Button, Menu, MenuItem, ActionIcon, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const navigation = [
  { name: "Home", href: "/home" },
  { name: "Create Blog", href: "/create" },
];

export default function Navbar() {
  const [opened, setOpened] = useState(false);
  const [openedMenu, setOpenedMenu] = useState(false);
  const navigate = useNavigate();

  // Toggle Drawer for mobile view
  const handleToggleDrawer = () => setOpened((prev) => !prev);

  // Handle sign out by clearing session storage and redirecting to login page
  const handleSignOut = () => {
    console.log("User signed out");
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-teal-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-12">
        <div className="relative flex h-24 items-center justify-center">
          {/* Mobile menu button */}
        



          {/* Desktop Menu */}
          <div className="">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white px-3 py-2 text-sm font-medium hover:bg-teal-600 hover:text-white rounded-md"
                >
                  {item.name}
                </a>
              ))}

              {/* Profile and Sign Out button */}
              <Menu
                opened={openedMenu}
                onChange={setOpenedMenu}
                control={
                  <ActionIcon variant="outline" color="gray">
                    <FaUserCircle size={24} color="white" />
                  </ActionIcon>
                }
              >
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
