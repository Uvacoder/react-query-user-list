import React from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { fetchUsers, USERS_QUERY_KEY } from "api/users";
import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "@chakra-ui/react";
import { Users } from "components/Users";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(USERS_QUERY_KEY, () => fetchUsers());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Home: NextPage = () => {
  return (
    <Container pt={16}>
      <Head>
        <title>User List</title>
      </Head>
      <Users />
    </Container>
  );
};

export default Home;
