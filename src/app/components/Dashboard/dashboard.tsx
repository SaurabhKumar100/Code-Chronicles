"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Navbar from "../Navbar/navbar";

const Dashboard = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  // ...

  useEffect(() => {
    const visited = localStorage.getItem("visited"); //add
    if (session && visited !== "true") {
      setOpen(true);
      localStorage.setItem("visited", "true");
    }
  }, [session]);

  const toggleSnackbar = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box>
      <Navbar />
      {session && (
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={6000}
          onClose={toggleSnackbar}
        >
          <SnackbarContent
            message="Logged in successfully!"
            action={<CircularProgress size={24} color="inherit" />}
          />
        </Snackbar>
      )}
    </Box>
  );
};

export default Dashboard;
