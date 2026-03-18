import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../shared/hooks";
import { fetchPostsByUserId, selectPosts, resetPostsState } from "./postsSlice";
import { Typography, Empty, Descriptions } from "antd";
import SinglePost from "./components/SinglePost";
import { selectUsers } from "../UserList/userSlice";
import type { User } from "../../shared/types";
import SingleUser from "../UserList/components/SingleUser";
import { UserPostsButton } from "./components/UserPostsButton";

const { Title } = Typography;

export default function UserPosts() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { postsItems, loading, error } = useAppSelector(selectPosts);
  const { userItems } = useAppSelector(selectUsers);
  const currentUser = userItems.find((user: User) => user.id === Number(id));

  useEffect(() => {
    if (id) {
      dispatch(fetchPostsByUserId(Number(id)));
    }

    return () => {
      dispatch(resetPostsState());
    };
  }, [id, dispatch]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 48 }}>
        <Descriptions size="small" title="Loading posts..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <UserPostsButton />
        <div style={{ color: "red" }}>Error: {error}</div>
      </div>
    );
  }
  
  return (
    <div style={{ padding: 24 }}>
      <UserPostsButton />
      <Title level={2}>Posts for User {id}</Title>

      {currentUser && (
        <div style={{ marginBottom: 24 }}>
          <SingleUser user={currentUser} />
        </div>
      )}

      {postsItems.length === 0 ? (
        <Empty description="No posts found for this user" />
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {postsItems.map((post) => (
            <SinglePost key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
