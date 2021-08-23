import React from "react";
import { List, Spinner, Text } from "@chakra-ui/react";
import { useUsers } from "../api/users";
import { UsersListItem } from "./UsersListItem";

const UsersList: React.FC<{ searchPhrase: string }> = ({ searchPhrase }) => {
  const { data, status } = useUsers();

  switch (status) {
    case "success":
      return (
        <List>
          {data
            ?.filter((u) => u.name.match(new RegExp(searchPhrase, "i")))
            .map((user) => (
              <UsersListItem
                searchPhrase={searchPhrase}
                user={user}
                key={user.id}
              />
            ))}
        </List>
      );
    case "error":
      return (
        <Text>
          Error fetching data. Check your connection, try again in a little
          while - and if nothing works, shoot us a message:
          this.email.address@doesnt.exist.com
        </Text>
      );
    case "loading":
    default:
      return <Spinner />;
  }
};

export { UsersList };
