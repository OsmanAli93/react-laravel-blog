import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOADING, REGISTER_USER } from "../../../constants";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { HiInformationCircle } from "react-icons/hi";
import { Alert, Button } from "flowbite-react";
import Spinner from "../../Spinner";

const RegisterForm = ({ loading, error, addUser, inProgress }) => {
  const [visible, setVisible] = useState({
    password: false,
    password_confirmation: false,
  });

  const {
    register,
    handleSubmit,
    getValues,
    watch,
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
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Please enter a valid email",
      },
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
      label: "Confirm password",
      for: "password_confirmation",
      type: visible.password_confirmation ? "text" : "password",
      name: "password_confirmation",
      placeholder: "••••••••",
      icon: visible.password_confirmation ? (
        <EyeIcon className="h-4 w-4" />
      ) : (
        <EyeSlashIcon className="h-4 w-4" />
      ),
    },
    {
      for: "terms",
      type: "checkbox",
      name: "terms",
    },
  ];

  const toggleVisibility = (name) => {
    setVisible((prevState) => ({ ...prevState, [name]: !prevState[name] }));
  };

  const onSubmit = (user) => {
    console.log(user);
    inProgress(true);
    addUser(user, navigate);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create and account
        </h1>

        {error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">{error}</span>
          </Alert>
        )}

        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <>
            {fields.map((field, index) => {
              return field.name === "terms" ? (
                <div key={index}>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        {...register(field.name, {
                          required:
                            "You must agree with the terms & conditions",
                        })}
                        type={field.type}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-500 dark:text-gray-300"
                      >
                        I accept the{" "}
                        <a
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          href="#"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                  {errors[field.name] && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              ) : (
                <div key={index}>
                  {field.label && (
                    <label
                      htmlFor={field.for}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {field.label}
                    </label>
                  )}

                  {field.icon ? (
                    <div className="relative">
                      <input
                        type={field.type}
                        {...register(field.name, {
                          required: `${field.label} is required`,
                        })}
                        placeholder={field?.placeholder}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

                      {field.name === "password_confirmation" && (
                        <>
                          {watch("password_confirmation") !==
                            watch("password") &&
                            getValues("password_confirmation") && (
                              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                Password don't match
                              </p>
                            )}
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      <input
                        key={index}
                        type={field.type}
                        {...register(field.name, {
                          required: `${field.label} is required`,
                          pattern: field.pattern,
                        })}
                        placeholder={field?.placeholder}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />

                      {errors[field.name] && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                          {errors[field.name].message}
                        </p>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </>

          <Button type="submt" className="w-full" disabled={loading}>
            {loading ? (
              <Spinner alignment="center" />
            ) : (
              <span> Create an account</span>
            )}
          </Button>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login here
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
    addUser: (user, navigate) =>
      dispatch({ type: REGISTER_USER, user, navigate }),
    inProgress: (status) => dispatch({ type: LOADING, status }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
