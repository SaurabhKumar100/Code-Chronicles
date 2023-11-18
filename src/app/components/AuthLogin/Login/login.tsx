"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  Box,
  Button,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "../../../../../public/assets/Logo.svg";
import Google from "../../../../../public/assets/google.svg";
import { signIn } from "next-auth/react";

const Login = () => {
  const handleSignIn = async () => {
    await signIn("google", {
      callbackUrl: "http://localhost:3000/dashboard",
    });
  };

  // const [userTime, setUserTime] = useState(serverDate);

  // useEffect(() => {
  //   const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  //   const interval = setInterval(() => {
  //     const formattedTime = new Intl.DateTimeFormat(undefined, {
  //       year: "numeric",
  //       month: "long",
  //       day: "numeric",
  //       hour: "numeric",
  //       minute: "numeric",
  //       second: "numeric",
  //       timeZone: userTimezone,
  //     }).format(new Date());

  //     setUserTime(formattedTime);
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <Box className="bg-[#f1f7f7]">
      <Box className="absolute">
        <Box className="flex items-center relative pl-4">
          <Image src={Logo} alt="Logo" height={50} width={50} />
          <Box className="pt-12">
            <Typography className="text-[#62e048] text-xl font-semibold">
              Code<span>_Chronicle</span>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="flex items-center justify-center h-screen w-full ">
        <Card sx={{ maxWidth: 400 }} className="w-full  rounded-lg shadow-2xl">
          <CardHeader
            className="pl-8"
            avatar={
              <Image
                aria-label="Logo"
                src={Logo}
                width={45}
                height={45}
                alt="CC"
              />
            }
            title={
              <Typography className="text-black text-xl font-bold ">
                Hi there!
              </Typography>
            }
            // subheader={
            //   <Typography className="text-gray-400 text-sm font-semibold">
            //     {userTime}
            //   </Typography>
            // }
          />

          <Box className="w-full flex flex-col px-8">
            <TextField
              id="outlined-basic"
              type="email"
              label="Email"
              variant="outlined"
              className="my-4"
              InputLabelProps={{
                className: "text-gray-400 font-semibold ",
              }}
              InputProps={{
                className: "font-semibold ",
                classes: {
                  notchedOutline:
                    "border-2 border-slate-400 hover:border-white-500",
                },
              }}
            />
            <TextField
              id="outlined-basic"
              type="password"
              label="Password"
              variant="outlined"
              className="my-2"
              InputLabelProps={{
                className: "text-gray-400 font-semibold",
              }}
              InputProps={{
                className: "font-semibold ",
                classes: {
                  notchedOutline:
                    "border-2 border-slate-400 hover:border-white-500",
                },
              }}
            />
          </Box>

          <Box className="flex flex-col">
            <Box className="flex flex-col pl-8 mb-4">
              <Typography className=" text-black font-semibold underline underline-offset-2 cursor-pointer">
                Forgot password?
              </Typography>
            </Box>
            <Box className="p-2">
              <Box className="w-full flex flex-col mb-5 px-6">
                <Button
                  variant="contained"
                  className="MuiButton-root bg-[#51ce38] font-bold px-4 py-4 hover:bg-[#51ce38]"
                >
                  Login
                </Button>
              </Box>
              <Box className="w-full flex items-center justify-center relative mb-4 px-6">
                <Box className="w-full h-[1px] bg-black" />
                <Typography className="absolute text-lg text-black bg-white px-0.5">
                  or
                </Typography>
              </Box>
              <Box className="w-full flex flex-col px-6 mb-4">
                <button
                  onClick={handleSignIn}
                  className="text-black font-semibold  py-4 px-0 border-2 border-[#51ce38] rounded-md flex "
                >
                  <Box className="flex w-full">
                    <Box className="pl-3">
                      <Image src={Google} alt="" width={25} height={25} />
                    </Box>
                    <Box className="ml-12">Continue with Google</Box>
                  </Box>
                </button>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
