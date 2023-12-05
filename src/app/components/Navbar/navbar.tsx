"use client";
import * as React from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Logo from "../../../../public/assets/Logo.svg";
import { Button } from "@mui/material";

function Navbar() {
  const { status, data: session } = useSession();

  // Check if localStorage is available (client-side)
  const isLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("user") !== null;
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "http://localhost:3000" });

    // Check if localStorage is available (client-side)
    if (typeof window !== "undefined") {
      localStorage.setItem("visited", "false"); // Reset visited flag to false
    }
  };

  return (
    <Toolbar disableGutters>
      <Grid container alignItems="center" className="p-4 bg-white rounded-lg ">
        <Grid item xs={6} md={3}>
          <Grid container alignItems="center">
            <Grid item>
              <Image src={Logo} alt="Logo" height={50} width={50} />
            </Grid>
            <Grid item>
              <a
                href="/"
                className="hidden md:flex mr-2 font-bold tracking-wider text-inherit no-underline"
              >
                <Typography className="text-[#62e048] pl-2 text-lg font-semibold">
                  Code_Chronicle
                </Typography>
              </a>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} md={9} container justifyContent="flex-end">
          <Box className=" flex items-center">
            {isLoggedIn || status === "authenticated" ? (
              <Button
                variant="contained"
                onClick={handleSignOut}
                className="bg-black text-white font-semibold text-sm rounded-md px-6 py-2 mr-3 normal-case hover:bg-slate-700"
              >
                Sign Out
              </Button>
            ) : null}
            <Box sx={{ flexGrow: 0 }}>
              <IconButton sx={{ p: 0 }}>
                {status === "authenticated" && session?.user?.image ? (
                  <Avatar alt="user" src={session.user.image} />
                ) : (
                  <Avatar alt="user" src="/static/images/avatar/2.jpg" />
                )}
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Toolbar>
  );
}

export default Navbar;
