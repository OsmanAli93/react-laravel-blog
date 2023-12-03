import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOADING, LOGIN_USER } from "../../../constants";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { Button, Spinner, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

const LoginForm = ({ loading, error, loginUser, inProgress }) => {
  const [visible, setVisible] = useState({
    password: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const fields = [
    {
      label: "Your Email",
      for: "email",
      type: "email",
      name: "email",
      placeholder: "name@company.com",
    },
    {
      label: "Password",
      for: "password",
      type: visible.password ? "text" : "password",
      name: "password",
      placeholder: "••••••••",

      icon: visible.password ? (
        <EyeIcon className="h-4 w-4" />
      ) : (
        <EyeSlashIcon className="h-4 w-4" />
      ),
    },

    {
      label: "Remember Me",
      for: "remember",
      type: "checkbox",
      name: "remember",
    },
  ];

  const toggleVisibility = (name) => {
    setVisible((prevState) => ({ ...prevState, [name]: !prevState[name] }));
  };

  const onSubmit = (user) => {
    console.log(user);
    inProgress(true);
    loginUser(user, navigate);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>

        {error && (
          <Alert color="failure" icon={HiInformationCircle} rounded>
            <span>
              <p>{error}</p>
            </span>
          </Alert>
        )}

        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {fields.map((field, index) => {
            return field.icon ? (
              <div key={index}>
                {field.label && (
                  <label
                    htmlFor={field.for}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {field.label}
                  </label>
                )}
                <div className="relative">
                  <input
                    type={field.type}
                    {...register(field.name, {
                      required: `${field.label} is required`,
                    })}
                    placeholder={field?.placeholder}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <span
                    className="absolute top-[13px] right-[15px] cursor-pointer z-50"
                    onClick={() => toggleVisibility(field.name)}
                  >
                    <i className="icon">{field.icon}</i>
                  </span>

                  {errors[field.name]?.type === "required" && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              </div>
            ) : field.name === "remember" ? (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type={field.type}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-cyan-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Forgot password?
                </a>
              </div>
            ) : (
              <div key={index}>
                <label
                  htmlFor={field.for}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  {...register(field.name, {
                    required: `${field.label} is required`,
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={field.placeholder}
                />

                {errors[field.name]?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors[field.name].message}
                  </p>
                )}
              </div>
            );
          })}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Spinner aria-label="Spinner button example" size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              <>Sign in</>
            )}
          </Button>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              to="/register"
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user, navigate) =>
      dispatch({ type: LOGIN_USER, user, navigate }),
    inProgress: (status) => dispatch({ type: LOADING, status }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
