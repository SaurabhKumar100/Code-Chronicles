// import { GetServerSideProps } from "next";
import Login from "@/app/components/AuthLogin/Login/login";
// import { GetServerSideProps } from "next/types";
import React from "react";

// interface PageProps {
//   serverDate: string;
// }

// export const getServerSideProps = async () => {
//   return {
//     props: {
//       serverDate: new Date().toISOString(),
//     },
//   };
// };

const Page = () => {
  return <Login />;
};

export default Page;
