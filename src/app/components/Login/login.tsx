"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "../../../../public/assets/Logo.svg";
import Google from "../../../../public/assets/google.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useSession, signIn } from "next-auth/react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
}

const schema = yup
  .object({
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
  })
  .required();

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = useState(false);

  const toggleSnackbar = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (session && session.user && session.user.name) {
      toggleSnackbar();
      const nameParts = session.user.name.split(" ");
      const firstName = nameParts[0];
      const userName = firstName.toLowerCase();
      const dashboardUrl = `/${userName}/dashboard`;
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

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        " http://localhost:5000/api/login",
        data
      );
      const { token, user } = response.data;
      console.log(user.firstName);
      // Store the token and user information in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to user's dashboard based on their name
      const userName = user.firstName.toLowerCase(); // Assuming 'user.name' contains the username
      router.push(`/${userName}/dashboard`); // Redirects to /user.name/dashboard
    } catch (error) {
      // Handle login failure (display error, etc.)
      console.error("Login failed:", error);
    }
  };

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
              Login
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
              className="bg-[#51ce38] font-bold py-3 hover:bg-[#51ce38] text-white"
            >
              Login
            </Button>
            <Box className="w-full flex items-center justify-center relative py-2">
              <Box className="w-full h-[1px] bg-black"></Box>
              <Typography className="absolute text-lg text-black bg-white px-0.5">
                or
              </Typography>
            </Box>

            <Button
              onClick={async () => {
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
                Logging you in...
              </Alert>
            </Snackbar>
            <Box className="w-full flex items-center justify-center mt-5 gap-3">
              <Typography variant="body2" className="text-black">
                Don't have an account?
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
