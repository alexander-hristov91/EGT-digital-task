import { SINGLE_POST } from "./constants";

export const postsApi = {
  update: async (post: {
    id: number;
    title: string;
    body: string;
    userId: number;
  }) => {
    const response = await fetch(SINGLE_POST(post.id), {
      method: "PUT",
      body: JSON.stringify(post),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to update post: ${response.statusText}`);
    }

    return response.json();
  },

  delete: async (postId: number) => {
    const response = await fetch(SINGLE_POST(postId), {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete post: ${response.status}`);
    }

    return postId;
  },
};