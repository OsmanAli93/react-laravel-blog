import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "flowbite-react";

const Post = ({ post, user, userPage, onEdit, onDelete }) => {
  const estimateReadingTimes = (post) => {
    const wordsPerMinute = 225;
    const words = post.body.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return `${time} min read`;
  };

  return (
    <article className="flex flex-col mb-12">
      <div className="h-[240px]">
        <Link to={`/post/${post.slug}`}>
          <img
            src={`http://localhost:8000/images/thumbnails/${post.thumbnail}`}
            alt=""
            className="w-full h-full"
          />
        </Link>
      </div>
      <div className="h-[260px] relative">
        <div className="flex items-center justify-between py-4">
          <Link to={`/users/${post.user_id}`} className="flex items-center">
            <img
              className="w-8 h-8 rounded-full mr-2"
              src={`http://localhost:8000/images/avatars/${post.user.profile.avatar}`}
              alt="Rounded avatar"
            ></img>
            <p className="text-sm text-gray-900 dark:text-white">
              <span>{post.user.profile.first_name}</span>

              <span> {post.user.profile.last_name}</span>
            </p>
          </Link>

          <div>
            <p className="text-sm ">
              <span className="text-gray-500">
                {estimateReadingTimes(post)}
              </span>
              <span className="px-2">&#8226;</span>
              <span className="text-gray-500">
                {moment(post.created_at).format("MMM DD, YYYY")}
              </span>
            </p>
          </div>
        </div>
        <h2 className="mb-3 text-xl font-bold text-gray-900 cutoff-text dark:text-white">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="mb-12 text-md font-normal text-gray-500 dark:text-gray-400 cutoff-text">
          {post.description}
        </p>
        <div className="absolute right-0 bottom-0">
          {userPage && post.user_id === user.id ? (
            <div className="flex flex-wrap gap-2">
              <Button
                gradientMonochrome="failure"
                onClick={() => onDelete(post.slug)}
              >
                Delete
              </Button>
              <Button
                gradientMonochrome="info"
                onClick={() => onEdit(post.slug)}
              >
                Edit
              </Button>
            </div>
          ) : (
            <Link
              to={`/post/${post.slug}`}
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Read More
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

const mapStateTopProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateTopProps)(Post);
