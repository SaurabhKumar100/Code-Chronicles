"use client";
import React, { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "../../../../public/assets/Logo.svg";
import { useSession } from "next-auth/react";
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
  const [isCardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  const handlePopover = () => {
    setCardVisible(!isCardVisible);
  };

  return (
    <Fragment>
      <Container className="mt-10">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box p={4}>
              <Image
                src={Logo}
                alt="Logo"
                height={150}
                width={150}
                className="pb-8"
              />
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                className="text-[#62e048]"
              >
                Welcome to Code<span>_Chronicle</span>
              </Typography>
              <Typography variant="h2" component="h1" gutterBottom>
                Your Essential Hub for
              </Typography>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                style={{ color: "#62e048" }}
              >
                Tech Enthusiasts
              </Typography>
              <Typography variant="body1" gutterBottom>
                Welcome to a world of technical wonder and knowledge. Dive into
                our articles to unlock the limitless possibilities of
                technology.
              </Typography>
              <Box className="flex items-center mt-5">
                <Button
                  variant="contained"
                  className="bg-black text-white font-semibold text-sm rounded-md px-6 py-2 mr-3 normal-case hover:bg-slate-700"
                  startIcon={<LockIcon />}
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  className="bg-black text-white font-semibold text-sm rounded-md px-6 py-2 mr-3 normal-case hover:bg-slate-700"
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} className="md:mt-8">
            <Paper elevation={1} className="relative group">
              <Box className="relative">
                <Image
                  src={blog1}
                  alt="image"
                  layout="responsive"
                  width={600}
                  height={300}
                />
                <Box className="absolute rounded-lg bottom-2 left-2">
                  <IconButton onClick={handlePopover}>
                    <VisibilityIcon className="text-white" />
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

          <Grid item xs={12} md={4}>
            <Paper elevation={1} className="p-4">
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                style={{ color: "#000", fontWeight: "bold" }}
              >
                Newsletter
              </Typography>
              {/* Newsletter Content */}
              {/* ... */}
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper elevation={1} className="p-4">
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                style={{ color: "#000", fontWeight: "bold" }}
              >
                Trending Articles
              </Typography>
              {/* Trending Articles Content */}
              {/* ... */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default HomePage;
