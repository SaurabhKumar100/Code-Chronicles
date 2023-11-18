"use client";
import React from "react";
import Logo from "../../../../public/assets/Logo.svg";
import Google from "../../../../public/assets/google.svg";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";

const SignUp = () => {
  return (
    <Box className="w-full h-screen flex item-start bg-[#f1f7f7]">
      <Box className="relative w-1/2 h-full flex flex-col">
        <Box className="absolute top-[25%] left-[5%] flex flex-col">
          <Box className="flex items-center pr-8">
            <Image
              src={Logo}
              alt="Logo"
              height={200}
              width={200}
              className="pr-5"
            />
            <Box className="pt-5">
              <Typography className="text-[#62e048] text-5xl font-extrabold">
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

        <Box className=" h-full w-full object-cover" />
      </Box>
      <Box className="h-full w-1/2 flex flex-col p-20 justify-between">
        <Box className="h-full  flex flex-col p-20 items-center">
          <Box className="w-1/2 h-full flex flex-col">
            <Box className="w-full flex flex-col mt-5 mb-5">
              <Typography className="text-black text-5xl font-bold mb-4">
                Welcome!
              </Typography>
            </Box>
            <Box className="w-300 flex flex-col mb-5">
              <Box className="w-full flex flex-col">
                <TextField
                  id="outlined-basic"
                  type="fullname"
                  label="Full Name"
                  variant="outlined"
                  className="my-4"
                  InputLabelProps={{
                    className: "text-gray-400 font-semibold ",
                  }}
                  InputProps={{
                    className: "font-semibold ",
                    classes: {
                      notchedOutline: "border-2 border-slate-400 ",
                    },
                  }}
                />
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
                      notchedOutline: "border-2 border-slate-400 ",
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
                      notchedOutline: "border-2 border-slate-400 ",
                    },
                  }}
                />
              </Box>
            </Box>
            <Box className="w-full flex flex-col mb-5">
              <Button
                variant="contained"
                className="MuiButton-root bg-[#51ce38] font-bold p-2 hover:bg-[#51ce38]"
              >
                Signup
              </Button>
            </Box>
            <Box className="w-full flex items-center justify-center relative py-2">
              <Box className="w-full h-[1px] bg-black"></Box>
              <Typography className="absolute text-lg text-black bg-[#f1f7f7] px-0.5">
                or
              </Typography>
            </Box>

            <button
              onClick={async () => {
                await signIn("google", {
                  callbackUrl: "http://localhost:3000/dashboard",
                });
              }}
              className="text-black font-semibold my-2 p-2 border-2 border-black rounded-md flex "
            >
              <Box className="pl-3">
                <Image src={Google} alt="" width={25} height={25} />
              </Box>
              <Box className="pl-10">Continue with Google</Box>
            </button>

            <Box className="w-full flex gap-1 items-center justify-center mt-10">
              <Typography variant="body2" className="text-black">
                Already have an account?
              </Typography>
              <Link
                href="/login"
                className=" text-black font-semibold underline underline-offset-2 cursor-pointer"
              >
                Login here
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
