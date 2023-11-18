import React from "react";
import HomePage from "./components/HomePage/home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code_Chronicles",
  description: "Home",
};

export default function Home() {
  return (
    <main>
      <HomePage />
    </main>
  );
}
