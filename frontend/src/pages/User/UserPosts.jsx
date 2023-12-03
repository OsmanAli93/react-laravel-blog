import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, Alert, TextInput } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useForm } from "react-hook-form";
import ReactPaginate from "react-paginate";
import Toast from "../../components/Toast";
import Modal from "../../components/Modal";
import Posts from "../../components/Posts";
import EditForm from "../../components/Form/EditForm";
import { DELETE_POST } from "../../constants";

const UserPosts = ({ token, success, error, deletePost }) => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchUserPosts = async (page) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/users/${id}?page=${currentPage}`
    );

    const data = await response.data.posts;

    return data;
  };

  const hanldePageClick = async (page) => {
    const currentPage = page.selected + 1;

    const pageFormPagination = await fetchUserPosts(currentPage);

    setPosts(pageFormPagination);
  };

  const onEdit = (slug) => {
    console.log(slug);
    setSearchParams({ type: "edit", slug: slug });
    setOpenModal(true);
  };

  const onDelete = (slug) => {
    console.log(id);
    setSearchParams({ type: "delete", slug: slug });
    setOpenModal(true);
  };

  const onClose = () => {
    searchParams.delete("type");
    searchParams.delete("slug");

    setSearchParams(searchParams);

    setOpenModal(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    deletePost(token, searchParams.get("slug"), data);
    onClose();
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/${id}`
        );

        setPosts(response.data.posts);

        console.log(token);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [id, success, error]);

  console.log(error);

  return (
    <section className="py-[90px]">
      {error && (
        <Alert color="failure" icon={HiInformationCircle}>
          <span className="font-medium">Info alert!</span> {error}
        </Alert>
      )}

      {success !== "" && (
        <Toast success={true} message={success} seconds={3000}>
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
          <div className="pl-4 text-sm font-normal">{success}</div>
        </Toast>
      )}

      <Modal open={openModal}>
        {searchParams.get("type") === "edit" && (
          <EditForm
            onClose={onClose}
            slug={searchParams.get("slug")}
            token={token}
          />
        )}

        {searchParams.get("type") === "delete" && (
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product?
                </h3>
                <div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex justify-center gap-4"
                  >
                    <TextInput
                      type="hidden"
                      {...register("_method")}
                      defaultValue="DELETE"
                    />

                    <Button type="submit" color="failure">
                      {"Yes, I'm sure"}
                    </Button>
                    <Button color="gray" onClick={onClose}>
                      No, cancel
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <div className="container">
        {posts && (
          <>
            <Posts
              posts={posts}
              userPage={true}
              onEdit={onEdit}
              onDelete={onDelete}
            />

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
    token: state.auth.token,
    success: state.post.successMessage,
    error: state.post.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (token, slug, data) =>
      dispatch({ type: DELETE_POST, token, slug, data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
