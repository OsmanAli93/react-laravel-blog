import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import axios from "axios";
import moment from "moment";
import parse from "html-react-parser";

const Article = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://127.0.0.1:8000/api/post/${slug}`
        );

        setPost(response.data?.post);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  console.log(post?.comments[0].replies[0].replies);

  if (loading) {
    return (
      <div className="text-center pt-[90px]">
        <Spinner aria-label="Center-aligned spinner example" size="md" />
      </div>
    );
  }

  return (
    <section className="py-[90px]">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
        <article className="mx-auto w-full max-w-4xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <div className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <img
                  className="mr-4 w-16 h-16 rounded-full"
                  src={`http://127.0.0.1:8000/images/avatars/${post?.user.profile.avatar}`}
                  alt={post?.user.profile.first_name}
                />

                <div>
                  <a
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {post?.user.profile.first_name}{" "}
                    {post?.user.profile.last_name}
                  </a>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    {post?.user.profile.about}
                  </p>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    <span>
                      {moment(post?.created_at).format("MMM DD, YYYY")}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </header>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
            {post?.title}
          </h1>
          <p className="lead mb-6">{post?.description}</p>

          <div className="body mb-12">{parse(`${post?.body}`)}</div>

          <div className="comments-container">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                Discussion
              </h2>
            </div>

            {post?.comments.map((comment) => {
              return (
                <div
                  key={comment.id}
                  className={`comment-${comment.id} p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900`}
                >
                  <div className="flex items-center mb-2">
                    <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src={`http://127.0.0.1:8000/images/avatars/${comment.user.profile.avatar}`}
                        alt=""
                      />
                      {comment.user.profile.first_name}{" "}
                      {comment.user.profile.last_name}
                    </p>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span>
                        {moment(comment.created_at).format("MMM DD, YYYY")}
                      </span>
                    </p>
                  </div>

                  <p>{comment.comment}</p>

                  <div className="flex items-center mt-4 space-x-4">
                    <button
                      type="button"
                      className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400"
                    >
                      <svg
                        className="mr-1.5 w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                      </svg>
                      Reply
                    </button>
                  </div>

                  {comment.replies &&
                    comment.replies.map((reply) => {
                      return (
                        <>
                          <div
                            key={reply.id}
                            className="replies p-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900"
                          >
                            <div className="flex items-center mb-2">
                              <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
                                <img
                                  className="mr-2 w-6 h-6 rounded-full"
                                  src={`http://127.0.0.1:8000/images/avatars/${reply.user.profile.avatar}`}
                                  alt=""
                                />
                                {reply.user.profile.first_name}{" "}
                                {reply.user.profile.last_name}
                              </p>

                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                <span>
                                  {moment(reply.created_at).format(
                                    "MMM DD, YYYY"
                                  )}
                                </span>
                              </p>
                            </div>

                            <p>{reply.comment}</p>

                            <div className="flex items-center mt-4 space-x-4">
                              <button
                                type="button"
                                className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400"
                              >
                                <svg
                                  className="mr-1.5 w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 18"
                                >
                                  <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                                </svg>
                                Reply
                              </button>
                            </div>
                          </div>

                          {reply.replies &&
                            reply.replies.map((nested) => {
                              return (
                                <div
                                  key={nested.id}
                                  className="replies p-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900"
                                >
                                  <div className="flex items-center mb-2">
                                    <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
                                      <img
                                        className="mr-2 w-6 h-6 rounded-full"
                                        src={`http://127.0.0.1:8000/images/avatars/${nested.user.profile.avatar}`}
                                        alt=""
                                      />
                                      {nested.user.profile.first_name}{" "}
                                      {nested.user.profile.last_name}
                                    </p>

                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      <span>
                                        {moment(nested.created_at).format(
                                          "MMM DD, YYYY"
                                        )}
                                      </span>
                                    </p>
                                  </div>

                                  <p>{nested.comment}</p>

                                  <div className="flex items-center mt-4 space-x-4">
                                    <button
                                      type="button"
                                      className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400"
                                    >
                                      <svg
                                        className="mr-1.5 w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 18"
                                      >
                                        <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                                      </svg>
                                      Reply
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                        </>
                      );
                    })}
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
};

export default Article;
