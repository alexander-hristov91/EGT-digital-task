import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks';

import { fetchUsers, selectUsers } from './userSlice';
import SingleUser from './components/SingleUser';
import type { User } from '../../shared/types';

export function UsersList() {
  const dispatch = useAppDispatch();
  const { items, loading, error, hasFetched } = useAppSelector(selectUsers);

  useEffect(() => {
    if (!hasFetched && !loading) {
      dispatch(fetchUsers());
    }
  }, [dispatch, hasFetched, loading]);

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => dispatch(fetchUsers())}>Retry</button>
      </div>
    );
  }

  return (
    <>
      <h1>Fetched Users: {items.length}</h1>
      <div>
        {items.map((user: User) => (
          <SingleUser key={user.id} user={user} />
        ))}
      </div>
    </>
  );
}