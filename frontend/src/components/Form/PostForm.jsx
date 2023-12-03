import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Label, TextInput, FileInput, Button } from "flowbite-react";
import { CREATE_POST } from "../../constants";

const PostForm = ({ token, addPost }) => {
  const navigate = useNavigate();

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

  const editorContent = watch("body");

  const fields = [
    {
      id: 1,
      label: <Label htmlFor="thumbnail" value="Thumbnail" />,
      element: (
        <FileInput
          {...register("thumbnail", { required: "Thumbnail is required" })}
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
            value={editorContent}
            onChange={(state) => setValue("body", state)}
            placeholder="Compose an epic"
            modules={modules}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    register("body", { required: "Body is required" });
  }, [register]);

  const onSubmit = (data) => {
    console.log(data);
    addPost(token, data, navigate);
    reset();
  };

  return (
    <form
      className="bg-white w-6/12 p-10 rounded-md"
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-12">
        <div className="border-cyan border-gray-900/10">
          <h2 className="text-xl font-semibold leading-7 text-gray-900">
            Write An Article
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (token, data, navigate) =>
      dispatch({ type: CREATE_POST, token, data, navigate }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
