"use client";
import { Box } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import useDebounce from "@/hooks/useDebounce";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../../../../public/assets/Logo.svg";
import { Popover, List, ListItem } from "@mui/material";

export interface Notices {
  forename: string;
  date_of_birth: string;
  entity_id: string;
  nationalities: string[];
  name: string;
  _links: Links;
}

export interface Links {
  self: Images;
  images: Images;
  thumbnail: Images;
}

export interface Images {
  href: string;
}

const Dashboard = () => {
  // const [notices, setNotice] = useState<Notices[]>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [popoverData, setPopoverData] = useState<Notices[]>([]);

  // const debouncedSearch = useDebounce(search, 500);
  // useEffect(() => {
  //   async function fetchBlogs() {
  //     setLoading(true);

  //     const data = await fetch(
  //       `https://ws-public.interpol.int/notices/v1/red?forename=${debouncedSearch}&resultPerPage=160&page=200`
  //     ).then((res) => res.json());

  //     // setNotice(data._embedded.notices);
  //     setPopoverData(data._embedded.notices); // Update popover data
  //     setLoading(false);
  //   }

  //   if (debouncedSearch) fetchBlogs();
  // }, [debouncedSearch]);

  return (
    <Box>
      <Box className="bg-primary flex items-center mb-12 h-[4rem] px-[15px] shadow-md ">
        <Box className="flex items-center">
          <Box className="">
            <Image src={Logo} alt="Logo" height={50} width={50} />
          </Box>
          <Box className="ml-4">
            <Box className="bg-white flex items-center w-96 rounded-md h-[2.5rem] shadow-lg pl-2 gap-1">
              <SearchIcon className="pt-1 text-blue-400" />
              <input
                ref={inputRef}
                className="bg-transparent font-semibold text-black text-sm w-80 h-full outline-none"
                placeholder="Type to search..."
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </Box>

            <Popover
              open={Boolean(inputRef.current && popoverData.length > 0)}
              anchorEl={inputRef.current}
              onClose={() => setPopoverData([])}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              className="mt-1"
            >
              <List>
                {popoverData.slice(0, 5).map((person) => (
                  <ListItem key={person.entity_id}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setSearch(person.forename);
                        setPopoverData([]); // Clear popover data
                      }}
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      {person.forename}
                    </a>
                  </ListItem>
                ))}
              </List>
            </Popover>
          </Box>
        </Box>
      </Box>
      <Box>
        {popoverData.map((person) => {
          return (
            <ul key={person.entity_id}>
              <li>
                <Image
                  src={person._links.thumbnail?.href}
                  height={100}
                  width={100}
                  alt="image"
                ></Image>
              </li>
            </ul>
          );
        })}
      </Box>
    </Box>
  );
};

export default Dashboard;
