import ky from "ky-universal";
import { useQuery } from "react-query";

const USERS_QUERY_KEY = "users";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const fetchUsers = (): Promise<User[]> => {
  return ky("https://jsonplaceholder.typicode.com/users").json();
};

const useUsers = () => {
  return useQuery(USERS_QUERY_KEY, () => fetchUsers());
};

export { useUsers, fetchUsers, USERS_QUERY_KEY };
