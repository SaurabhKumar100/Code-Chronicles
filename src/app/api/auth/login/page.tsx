import Login from "@/app/components/AuthLogin/Login/login";
import React from "react";

interface PageProps {
  serverDate: string;
}

export const getServerSideProps = async () => {
  return {
    props: {
      serverDate: new Date().toISOString(),
    },
  };
};

const page: React.FC<PageProps> = ({ serverDate }) => {
  return <Login serverDate={serverDate} />;
};

export default page;
