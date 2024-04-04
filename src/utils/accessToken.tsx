import { useSession } from "next-auth/react";

export const getToken = () => {
  const { data: session } = useSession();
  return session?.access_token!;
};

export default getToken;
