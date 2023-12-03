"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "../../../../public/assets/Logo.svg";
import Google from "../../../../public/assets/google.svg";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession, signIn } from "next-auth/react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { Snackbar, SnackbarContent } from "@mui/material";

interface formData {
  // firstName: string;
  // lastName: string;
  email: string;
  password: string;
  // confirmPassword: string;
}

const schema = yup
  .object({
    // firstName: yup.string().required("First name is required"),
    // lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password min length is 8")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
        "Password must contain at least one uppercase letter, one number, and one special character"
      )
      .required("password is required"),
    // confirmPassword: yup
    //   .string()
    //   .required("Confirm password is required")
    //   .oneOf([yup.ref("password")], "Confirm password must be same"),
  })
  .required();

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const toggleSnackbar = () => {
    // Create a function to toggle the snackbar
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    // Show the snackbar with a message and a loading icon

    if (session && session.user && session.user.name) {
      toggleSnackbar();
      // Split the user's name by whitespace
      const nameParts = session.user.name.split(" ");
      // Get the first part of the name
      const firstName = nameParts[0];
      // Convert the first name to lowercase
      const userName = firstName.toLowerCase();
      // Create the new URL with the user's name
      const dashboardUrl = `/${userName}/dashboard`;
      // Replace the current URL with the new one
      router.push(dashboardUrl);
    }
  }, [session, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<formData> = (data) => {
    console.log("Form data submitted:", data);
  };

  return (
    <Box className="w-full h-screen flex item-start bg-[#f1f7f7] px-2">
      <Box className="hidden md:flex md:w-1/2 h-full">
        <Box className="relative w-1/2 h-full flex flex-col">
          <Box className="absolute top-[25%] left-[5%] flex flex-col ">
            <Box className="flex items-center pr-8">
              <Image
                src={Logo}
                alt="Logo"
                height={150}
                width={150}
                className="pr-5 pb-8"
              />
              <Box className="pt-12">
                <Typography className="text-[#62e048] text-3xl font-extrabold">
                  Welcome to Code<span>_Chronicle</span>
                </Typography>
                <Typography
                  variant="h4"
                  className="text-black text-2xl font-bold my-4"
                >
                  Your Ultimate Destination for Tech Enthusiasts
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <Box className="hidden md:flex md:w-1/2"></Box> Empty placeholder */}
      <Box className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <Box
          sx={{ maxWidth: "500px", width: "100%" }}
          className="bg-white rounded-md p-4"
        >
          <Box className="flex gap-2 items-center mb-4">
            <Image src={Logo} height={50} width={50} alt="logo" />
            <Typography variant="body1" className="text-green-500">
              Welcome
            </Typography>
          </Box>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />

            <TextField
              id="password"
              label="Password"
              variant="outlined"
              {...register("password")}
              type="password"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />

            <Button
              type="submit"
              variant="contained"
              className="text-white font-semibold rounded-md bg-green-500 hover:bg-green-600 hover:text-white py-3"
            >
              Login
            </Button>
            <Button
              onClick={async () => {
                // Try to sign in with Google
                await signIn("google");
              }}
              className="text-white font-semibold rounded-md bg-black hover:bg-black hover:text-white py-3"
              variant="contained"
              startIcon={
                <Image src={Google} alt="icon" width={20} height={20}></Image>
              }
            >
              Continue with Google
            </Button>
            <Snackbar
              open={open} // Set the open prop to the state variable
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Set the position of the snackbar
              autoHideDuration={6000} // Set the duration of the snackbar
              onClose={toggleSnackbar} // Set the onClose prop to the toggle function
            >
              <SnackbarContent
                message="Logging you in..." // Set the message of the snackbar
                action={<CircularProgress size={24} color="inherit" />} // Set the action of the snackbar
              />
            </Snackbar>

            <Box className="w-full flex items-center justify-center mt-5 gap-3">
              <Typography variant="body2" className="text-black">
                don&apos;t have an account?
              </Typography>
              <Link
                href="/signup"
                className=" text-black font-semibold underline underline-offset-2 cursor-pointer"
              >
                Signup here for free
              </Link>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
