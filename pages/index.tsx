import React, { useState } from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { fetchUsers, USERS_QUERY_KEY } from "../api/users";
import type { NextPage } from "next";
import { UsersList } from "../components/UsersList";
import Head from "next/head"
import {
  Flex,
  Container,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";

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
  const [searchPhrase, setSearchPhrase] = useState("");
  return (
    <Container pt={16}>
      <Head><title>User List</title></Head>
      <Heading textAlign="center">Users list</Heading>
      <Flex py={6} width="100%" justifyContent="flex-end">
        <InputGroup maxW={250}>
          <InputLeftElement
            color="rgba(0, 0, 0, 0.1)"
            pointerEvents="none"
            children={<SearchIcon />}
          />
          <Input
            variant="flushed"
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e.currentTarget.value)}
          />
          <InputRightElement>
            <IconButton
              variant="link"
              icon={<CloseIcon color="ButtonShadow" />}
              aria-label="Clear input"
              onClick={() => setSearchPhrase("")}
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <UsersList searchPhrase={searchPhrase} />
    </Container>
  );
};

export default Home;
