"use client";
import * as React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import Logo from "../../../../public/assets/Logo.svg";

function Navbar() {
  const router = useRouter();
  const { status, data: session } = useSession();

  return (
    <Container className="bg-[#E3F4F4] blur-[0.5px] rounded-md shadow-md mt-2 sticky">
      <Toolbar disableGutters>
        <Image src={Logo} alt="Logo" height={50} width={50} />
        {/* Assuming you're using React with JSX */}

        <a
          href="/"
          className="hidden md:flex mr-2 font-bold tracking-wider text-inherit no-underline"
        >
          <Typography className="text-[#62e048] pl-2 text-lg font-semibold">
            Code_Chronicle
          </Typography>
        </a>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
        <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          LOGO
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
        {status === "authenticated" ? (
          <Box>
            <button
              onClick={async () => {
                await signOut({ callbackUrl: "http://localhost:3000" });
                localStorage.setItem("visited", "false"); // Reset visited flag to false
              }}
              className="bg-black text-white font-semibold text-sm rounded-md px-6 py-2 mr-3"
            >
              Sign Out
            </button>
          </Box>
        ) : (
          <Box>
            <button
              onClick={() => {
                router.push("/login");
              }}
              className="bg-black text-white font-semibold text-sm rounded-md px-6 py-2 mr-3"
            >
              Login
            </button>
          </Box>
        )}
        <Box sx={{ flexGrow: 0 }}>
          <IconButton sx={{ p: 0 }}>
            {status === "authenticated" && session?.user?.image ? (
              <Avatar alt="user" src={session.user.image} />
            ) : (
              <Avatar alt="user" src="/static/images/avatar/2.jpg" />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </Container>
  );
}
export default Navbar;
