"use client";
import React, { Fragment, useState } from "react";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "../Navbar/navbar";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import blog1 from "../../../../public/assets/blog1.jpeg";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";

const HomePage = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      // Redirect to dashboard if authenticated
      router.replace("/dashboard");
    }
  }, [status, router]);

  const [isCardVisible, setCardVisible] = useState(false); // Initialize state

  const handlePopover = () => {
    setCardVisible(!isCardVisible); // Toggle the visibility of the card
  };

  return (
    <Fragment>
      <Box className="mb-16">
        <Navbar />
      </Box>
      <Container disableGutters>
        <Grid container rowSpacing={2} spacing={2}>
          <Grid item xs={6}>
            <Box className="bg-transparent">
              <Box className="mb-8">
                <Typography className="text-black text-5xl font-semibold">
                  Your Essential Hub for
                </Typography>
                <Typography className="text-[#62e048] text-5xl py-2 font-semibold">
                  Tech Enthusiasts
                </Typography>
                <Typography className="text-black text-5xl font-semibold">
                  Explore
                </Typography>

                <Typography className="text-black text-5xl py-2 font-semibold">
                  In-Depth Insights Here.
                </Typography>
                <Typography className="text-slate-400 text-xl pt-4 font-medium">
                  Welcome to a world of technical wonder and knowledge.
                </Typography>
                <Typography className="text-slate-400 text-xl font-medium">
                  Dive into our articles to unlock the limitless possibilities
                  of technology.
                </Typography>
              </Box>

              <Box className="flex gap-4">
                <Box>
                  <Button
                    variant="contained"
                    startIcon={<LockIcon />}
                    onClick={() => {
                      router.push("/login");
                    }}
                    className="bg-black text-white font-semibold text-sm rounded-md px-8 py-4 MuiButton-root hover:bg-[#323232]"
                  >
                    Login
                  </Button>
                </Box>
                <Box>
                  <Box>
                    <Button
                      variant="contained"
                      endIcon={<PlayArrowIcon />}
                      onClick={() => {
                        router.push("/signup");
                      }}
                      className="bg-blue-600 text-white font-semibold text-sm rounded-md px-8 py-4"
                    >
                      Sign Up
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Paper elevation={1} className="bg-white relative group">
              <Box className="relative">
                <Image src={blog1} alt="image" height={300} width={600} />
                <Box className="bg-white absolute rounded-lg bottom-2 left-2">
                  <IconButton onClick={handlePopover} className="text-black">
                    <VisibilityIcon />
                  </IconButton>
                </Box>
                {isCardVisible && (
                  <Box className="absolute bottom-2 left-[-220px] ">
                    <Card className="shadow-xl max-w-[345px]">
                      <CardHeader
                        avatar={
                          <Avatar
                            className="mb-4"
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                          >
                            R
                          </Avatar>
                        }
                        title={
                          <Box className="flex flex-col">
                            <Typography className="text-black font-semibold">
                              Saurabh Kumar
                            </Typography>
                            <a href="#">
                              <Typography className="text-blue-600 underline underline-offset-2 font-medium text-sm">
                                Era of Generative AI
                              </Typography>
                            </a>
                          </Box>
                        }
                        subheader={
                          <Typography className="text-slate-400 text-sm font-medium">
                            September 2 2023
                          </Typography>
                        }
                      />
                      <Divider />
                      <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                          <ThumbUpAltIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}></Grid>
          <Grid item xs={4}>
            <Paper elevation={1} className="bg-white">
              <Typography className="text-black font-semibold">
                Newsletter
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper elevation={1} className="bg-white">
              <Typography className="text-black font-semibold">
                Trending Articles
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default HomePage;
