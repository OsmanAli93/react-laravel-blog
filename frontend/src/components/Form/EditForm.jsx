import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Label, TextInput, FileInput, Button, Spinner } from "flowbite-react";
import axios from "axios";
import { UPDATE_POST } from "../../constants";
import { connect } from "react-redux";

const EditForm = ({ token, updatePost, onClose, slug }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fields = [
    {
      id: 1,
      label: <Label htmlFor="thumbnail" value="Thumbnail" />,
      element: (
        <FileInput
          {...register("thumbnail")}
          id="file"
          helperText={
            errors?.thumbnail &&
            errors.thumbnail.message && (
              <span className="font-medium text-red-500">
                {errors.thumbnail.message}
              </span>
            )
          }
        />
      ),
    },
    {
      id: 2,
      label: <Label htmlFor="title" value="Title" />,
      element: (
        <TextInput
          id="title"
          {...register("title", { required: "Title is required" })}
          type="text"
          placeholder="Give this post a title"
          defaultValue={post?.title}
          helperText={
            errors?.title &&
            errors.title.message && (
              <span className="font-medium text-red-500">
                {errors.title.message}
              </span>
            )
          }
        />
      ),
    },
    {
      id: 3,
      label: <Label htmlFor="description" value="Description" />,
      element: (
        <TextInput
          id="description"
          {...register("description", { required: "Description is required" })}
          type="text"
          placeholder="A short brief of what this post about"
          defaultValue={post?.description}
          helperText={
            errors?.description &&
            errors.description.message && (
              <span className="font-medium text-red-500">
                {errors.description.message}
              </span>
            )
          }
        />
      ),
    },
    {
      id: 4,
      label: <Label htmlFor="message" value="Message" />,
      element: (
        <>
          <ReactQuill
            theme="snow"
            defaultValue={post?.body}
            onChange={(state) => setValue("body", state)}
            placeholder="Compose an epic"
            modules={modules}
          />
        </>
      ),
    },
  ];

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

    register("body", { required: "Body is required" });
    reset(post);
  }, [register, reset, slug]);

  const onSubmit = (data) => {
    setLoading(true);
    updatePost(token, slug, data);
    setLoading(false);
    onClose();
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  return (
    <div className="relative p-4 w-full max-w-3xl max-h-full">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Edit Post
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="default-modal"
            onClick={onClose}
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
        </div>

        <div className="p-4 md:p-5 space-y-4">
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
            id="edit-form"
          >
            <div className="space-y-12">
              <div className="border-cyan border-gray-900/10">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <TextInput
                    {...register("_method")}
                    type="hidden"
                    defaultValue="PATCH"
                  />

                  {fields.map((field) => {
                    return (
                      <div key={field.id} className="col-span-full">
                        {field.label}
                        <div className="mt-2">{field.element}</div>
                      </div>
                    );
                  })}
                </div>

                {errors?.body && errors.body.message && (
                  <span className="font-medium text-sm block mt-2 text-red-500">
                    {errors.body.message}
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end gap-2 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <Button type="submit" form="edit-form" size="sm" disabled={loading}>
            {loading ? (
              <Spinner alignment="center" size="sm" />
            ) : (
              <span>Save</span>
            )}
          </Button>
          <Button color="gray" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePost: (token, slug, data) => {
      dispatch({ type: UPDATE_POST, token, slug, data });
    },
  };
};

export default connect(null, mapDispatchToProps)(EditForm);
