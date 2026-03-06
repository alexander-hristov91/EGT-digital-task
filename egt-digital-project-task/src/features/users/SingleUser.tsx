import type { User } from "./userSlice";

interface SingleUserProps {
  user: User;
}

export default function SingleUser({ user }: SingleUserProps) {
  return (
    <>
    <h2>This is {user.id}</h2>
      <h3>{user.name}</h3>
      <h3>{user.username}</h3>
      <h3>{user.email}</h3>
      <h3>{user.address.street}</h3>
      <h3>{user.address.suite}</h3>
      <h3>{user.address.city}</h3>
    </>
  );
}
