import React, { useState } from "react";
import { UsersList } from "../components/UsersList";
import {
  Center,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";

const Users = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  return (
    <React.Fragment>
      <Heading textAlign="center">Users list</Heading>
      <Center py={16}>
        <InputGroup maxW={250}>
          <InputLeftElement color="rgba(0, 0, 0, 0.1)" pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input
            aria-label="Type in user's name and results will get filtered"
            placeholder="Search users"
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
      </Center>
      <UsersList searchPhrase={searchPhrase} />
    </React.Fragment>
  );
};

export { Users };
