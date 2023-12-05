"use client";
import React, { useState, useEffect } from "react";
import { Box, Snackbar } from "@mui/material";
import { useSession } from "next-auth/react";
import Navbar from "../Navbar/navbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Dashboard = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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
          autoHideDuration={4000}
          onClose={toggleSnackbar}
        >
          <Alert severity="success" className="flex items-center">
            Logged in succesfully
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default Dashboard;
