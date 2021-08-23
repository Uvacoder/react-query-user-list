import fetch from "cross-fetch";
import wretch from "wretch";
import { useQuery, UseQueryOptions } from "react-query";

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

const fetchUsers = async (): Promise<User[]> => {
  const response = await wretch("https://jsonplaceholder.typicode.com/users")
    .polyfills({ fetch })
    .get();
  return response.json();
};

const useUsers = (options?: UseQueryOptions<User[]>) => {
  return useQuery(USERS_QUERY_KEY, () => fetchUsers(), options);
};

export { useUsers, fetchUsers, USERS_QUERY_KEY };
