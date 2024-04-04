import type { Metadata } from "next";
import { ChakraProvider } from '@chakra-ui/react';
import { getServerSession } from "next-auth";
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';

import Provider from "./provider";
import Navbar from "../components/Navbar";
import { options } from "./api/auth/[...nextauth]/options";


export const metadata: Metadata = {
  title: "Github Issue Blog",
  description: "",
};

export default async function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  return (
    <Provider session={session}>
        <html lang="en">
          <body>
            <header className="bg-blue-500 text-white">
              <Navbar />
            </header>

            <main className="container mx-auto">{children}</main>
          </body>
        </html>
    </Provider>
  );
}
