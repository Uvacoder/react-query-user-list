import React from "react";
import { ListItem, Text } from "@chakra-ui/react";
import type { User } from "api/users";

const UsersListItem: React.FC<{ user: User; searchPhrase: string }> = ({
  user,
  searchPhrase,
}) => {
  const startOfSearchPhrase = user.name
    .toLowerCase()
    .indexOf(searchPhrase.toLowerCase());
  const characters = user.name.split("");
  const beforeSearchPhrase = characters.slice(0, startOfSearchPhrase).join("");
  const match = characters
    .slice(startOfSearchPhrase, startOfSearchPhrase + searchPhrase.length)
    .join("");
  const afterSearchPhrase = characters
    .slice(startOfSearchPhrase + searchPhrase.length)
    .join("");
  return (
    <ListItem my={1}>
      <Text as="span" color="grey.500">
        {user.id}.
      </Text>
      <Text fontWeight="bold" as="span" display="inline-block" mx={2}>
        {beforeSearchPhrase}
        <Text as="span" textDecoration="underline">
          {match}
        </Text>
        {afterSearchPhrase}
      </Text>
      <Text as="span" color="grey.500">
        @{user.username}
      </Text>
    </ListItem>
  );
};

export { UsersListItem };
