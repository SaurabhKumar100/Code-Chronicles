"use client";
import React, { useEffect, useState } from "react";
import Logo from "../../../../public/assets/Logo.svg";
import Google from "../../../../public/assets/google.svg";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import {
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password min length is 8")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
        "Password must contain at least one uppercase letter, one number, and one special character"
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Confirm password must match"),
  })
  .required();

const SignUp = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = useState(false);

  const toggleSnackbar = () => {
    setOpen((prev) => !prev);
    setMessage("Loggin you in");
  };

  useEffect(() => {
    if (session && session.user && session.user.name) {
      toggleSnackbar();
      console.log(session);
      const nameParts = session.user.name.split(" ");
      const firstName = nameParts[0];
      const userName = firstName.toLowerCase();
      const dashboardUrl = `/${userName}/dashboard`;
      router.push(dashboardUrl);
      const registerUser = async (session: Session) => {
        try {
          // If logged in via Google, include Google-related data in the registration
          const googleUserData = {
            name: session?.user?.name,
            email: session?.user?.email,
            image: session?.user?.image,
          };

          // Merge Google user data with form data for registration
          const userDataForRegistration = { ...googleUserData };

          // Send merged data to a specific endpoint for Google registrations
          await axios.post(
            "http://localhost:5000/api/register-google",
            userDataForRegistration
          );
        } catch (error) {
          setMessage("User already exists");
          setSnackbarOpen(true);
        }
      };
      registerUser(session);
    }
  }, [session, router]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Check if the user is logged in via Google
      if (session && session.user && session.user.name) {
        // If logged in via Google, include Google-related data in the registration
        const googleUserData = {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        };

        // Merge Google user data with form data for registration
        const userDataForRegistration = { ...data, ...googleUserData };

        // Send merged data to a specific endpoint for Google registrations
        await axios.post(
          "http://localhost:5000/api/register-google",
          userDataForRegistration
        );
      } else {
        // If not logged in via Google, handle regular form submission here
        // This part of the code is for regular signups without Google
        // Send form data to the existing endpoint for non-Google registrations
        await axios.post("http://localhost:5000/api/register", data);
        setMessage("Registered");
        setSnackbarOpen(true);
        router.push("/login");
      }
    } catch (error) {
      setMessage("User already exists");
      setSnackbarOpen(true);
    }
  };

  // const onSubmit: SubmitHandler<FormData> = async (data) => {
  //   try {
  //     await axios.post(" http://localhost:5000/api/register", data);
  //   } catch (error) {
  //     setMessage("User already exists");
  //     setSnackbarOpen(true);
  //   }
  // };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Box className="w-full h-screen flex item-start bg-[#f1f7f7] px-2">
      <Box className="hidden md:flex md:w-1/2 h-full">
        <Box className="w-full h-full flex items-center justify-center">
          <Box className="text-center">
            <Image
              src={Logo}
              alt="Logo"
              height={150}
              width={150}
              className="pb-8 mx-auto"
            />
            <Typography className="text-[#62e048] text-3xl font-extrabold">
              Welcome to Code<span>_Chronicle</span>
            </Typography>
            <Typography
              variant="h4"
              className="text-black text-4xl font-bold my-4"
            >
              Your Ultimate Destination for Tech Enthusiasts
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="w-full md:w-1/2 flex items-center justify-center">
        <Box
          sx={{ maxWidth: "500px", width: "100%" }}
          className="bg-white rounded-md p-4"
        >
          <Box className="flex gap-2 items-center mb-4">
            <Image src={Logo} height={50} width={50} alt="logo" />
            <Typography variant="body1" className="text-green-500">
              Sign Up
            </Typography>
          </Box>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 "
          >
            <TextField
              id="firstName"
              label="First Name"
              variant="outlined"
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName ? errors.firstName.message : ""}
            />
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              {...register("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName ? errors.lastName.message : ""}
            />
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
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              {...register("confirmPassword")}
              type="password"
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
            />

            <Button
              type="submit"
              variant="contained"
              className="bg-[#51ce38] font-bold py-3 hover:bg-[#51ce38] text-white"
            >
              Signup
            </Button>

            <Snackbar
              open={snackbarOpen}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              autoHideDuration={4000}
              onClose={() => setSnackbarOpen(false)}
            >
              <Alert
                severity={
                  message === "User already exists" ? "error" : "success"
                }
                action={
                  message === "Registered" ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : null
                }
                className="flex items-center"
              >
                {message}
              </Alert>
            </Snackbar>

            <Box className="w-full flex items-center justify-center relative py-2">
              <Box className="w-full h-[1px] bg-black"></Box>
              <Typography className="absolute text-lg text-black bg-white px-0.5">
                or
              </Typography>
            </Box>
            <Button
              type="submit"
              onClick={async () => {
                await signIn("google");
              }}
              className="text-white font-semibold rounded-md bg-black hover:bg-black hover:text-white py-3"
              variant="contained"
              startIcon={
                <Image src={Google} alt="icon" width={20} height={20} />
              }
            >
              Continue with Google
            </Button>
            <Snackbar
              open={open}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              autoHideDuration={6000}
              onClose={toggleSnackbar}
            >
              <Alert
                severity="info"
                action={<CircularProgress size={24} color="inherit" />}
                className="flex items-center"
              >
                {message}
              </Alert>
            </Snackbar>
            <Box className="w-full flex gap-1 items-center justify-center mt-6">
              <Typography variant="body2" className="text-black">
                Already have an account?
              </Typography>
              <Link
                href="/login"
                className="text-black font-semibold underline underline-offset-2 cursor-pointer"
              >
                Login here
              </Link>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
