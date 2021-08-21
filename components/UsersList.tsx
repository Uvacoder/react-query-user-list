import { List, Spinner, Text } from "@chakra-ui/react";
import { useUsers } from "api/users";
import { UsersListItem } from "./UsersListItem";

const UsersList: React.FC<{ searchPhrase: string }> = ({ searchPhrase }) => {
    const { data, status, error } = useUsers();

    switch (status) {
        case "loading":
            return <Spinner />;
        case "error":
            return <Text>Error fetching data from API.</Text>;
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
        case "idle":
            return null;
    }
};

export { UsersList };
