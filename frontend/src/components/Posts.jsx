import React from "react";
import Post from "./Post";

const Posts = ({ posts, userPage, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
      {posts.data?.map((post) => {
        return (
          <Post
            key={post.id}
            post={post}
            userPage={userPage}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default Posts;
