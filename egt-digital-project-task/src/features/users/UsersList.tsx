import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchUsers, type User } from "./userSlice";
import SingleUser from "./SingleUser";

export function UsersList() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (loading === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, loading]);

  if (loading === "pending") {
    return <div>Loading users...</div>;
  }

  if (loading === "failed") {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => dispatch(fetchUsers())}>Retry</button>
      </div>
    );
  }
  console.log(items);
  return (
    <>
      <h1>{items.length}</h1>
      <div>
        {items.map((user: User) => (
          <SingleUser key={user.id} user={user} />
        ))}
      </div>
    </>
  );
}
