import React, { useEffect } from "react";
import { connect } from "react-redux";
import Toast from "../components/Toast";
import { Spinner, Avatar } from "flowbite-react";
import Posts from "../components/Posts";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import axios from "axios";

const Home = ({ successMessage }) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async (currentPage) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/home?page=${currentPage}`
    );

    const data = await response.data.posts;

    return data;
  };

  const hanldePageClick = async (page) => {
    const currentPage = page.selected + 1;

    const pageFormPagination = await fetchPosts(currentPage);

    setPosts(pageFormPagination);
  };

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/home`);

        setPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-12">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  return (
    <section>
      {successMessage !== "" && (
        <Toast success={true} message={successMessage} seconds={3000}>
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="pl-4 text-sm font-normal">{successMessage}</div>
        </Toast>
      )}

      <div className="container py-[90px]">
        {posts && (
          <>
            <Posts posts={posts} />

            <div className="flex justify-center items-center py-24">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={Math.ceil(posts.total / 9)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={hanldePageClick}
                containerClassName="inline-flex -space-x-px text-base h-10"
                pageLinkClassName="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                previousLinkClassName="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                nextLinkClassName="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                breakLinkClassName="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                activeLinkClassName="flex items-center justify-center px-4 h-10 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:outline-none hover:text-white"
                renderOnZeroPageCount={null}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    successMessage: state.auth.successMessage,
  };
};

export default connect(mapStateToProps)(Home);
