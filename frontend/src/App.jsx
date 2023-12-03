import React from "react";
import { Dropdown, Navbar, Avatar, Button, Spinner } from "flowbite-react";
import { lazy, Suspense } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLinkClickHandler,
  useLocation,
} from "react-router-dom";
import { connect } from "react-redux";
import { LOGOUT_USER } from "./constants";
import RequireAuth from "./components/RequireAuth";
import { useState } from "react";

const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Profile = lazy(() => import("./pages/User/Profile"));
const Post = lazy(() => import("./pages/User/Post"));
const Article = lazy(() => import("./pages/Article"));
const UserPosts = lazy(() => import("./pages/User/UserPosts"));

const App = ({ token, user, logoutUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const clickHandler = useLinkClickHandler();

  const routes = [
    {
      path: "/",
      element: <Home />,
      requireAuth: false,
    },
    {
      path: "/register",
      element: <Register />,
      requireAuth: false,
    },
    {
      path: "/login",
      element: <Login />,
      requireAuth: false,
    },
    {
      path: "/profile",
      element: <Profile />,
      requireAuth: true,
    },
    {
      path: "/create/posts",
      element: <Post />,
    },
    {
      path: "/post/:slug",
      element: <Article />,
    },
    {
      path: "/users/:id",
      element: <UserPosts />,
    },
  ];

  const navlinks = [
    {
      path: "/",
      name: "Home",
      show: "all",
    },
    {
      path: "/about",
      name: "About",
      show: "all",
    },
    {
      path: "/services",
      name: "Services",
      show: "all",
    },
    {
      path: "/login",
      name: "Login",
      show: "onlyUnAuth",
    },
    {
      path: token && user ? "/create/posts" : "/login",
      name: "Write",
      show: "onlyAuth",
    },
  ];

  const dropDownLinks = [
    {
      path: "/profile",
      name: "Profile",
    },
    {
      path: "/setting",
      name: "Setting",
    },
    {
      path: "/earnings",
      name: "Earnings",
    },
    {
      name: "Divider",
    },
    {
      name: "Sign Out",
    },
  ];

  console.log(token);

  return (
    <>
      <Navbar rounded>
        <Navbar.Brand href="/">
          <img
            src="/favicon.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite React
          </span>
        </Navbar.Brand>
        {token && user && (
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={true}
              inline
              label={
                user.profile.avatar ? (
                  <Avatar
                    img={`http://localhost:8000/images/avatars/${user.profile.avatar}`}
                    rounded
                  />
                ) : (
                  <Avatar rounded />
                )
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {user.profile.first_name} {user.profile.last_name}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              {dropDownLinks.map((link, index) => {
                return link.name === "Divider" ? (
                  <Dropdown.Divider key={index} />
                ) : link.name === "Sign Out" ? (
                  <Dropdown.Item
                    key={index}
                    onClick={() => logoutUser(token, navigate)}
                  >
                    {link.name}
                  </Dropdown.Item>
                ) : (
                  <span key={index} onClick={() => clickHandler(link.path)}>
                    <Dropdown.Item href={link.path}>{link.name}</Dropdown.Item>
                  </span>
                );
              })}
            </Dropdown>
            <Navbar.Toggle />
          </div>
        )}
        <Navbar.Collapse>
          {token && user
            ? navlinks
                .filter((link) => link.show !== "onlyUnAuth")
                .map((link, index) => (
                  <span
                    key={index}
                    onClick={() => clickHandler(link.path)}
                    className="flex items-center"
                  >
                    <Navbar.Link
                      href={link.path}
                      active={location.pathname === link.path}
                    >
                      {link.name}
                    </Navbar.Link>
                  </span>
                ))
            : navlinks
                .filter((link) => link.show !== "onlyAuth")
                .map((link, index) => (
                  <span
                    key={index}
                    onClick={() => clickHandler(link.path)}
                    className="flex items-center"
                  >
                    <Navbar.Link
                      href={link.path}
                      active={location.pathname === link.path}
                    >
                      {link.name}
                    </Navbar.Link>
                  </span>
                ))}
        </Navbar.Collapse>
      </Navbar>

      <Suspense
        fallback={
          <div className="fixed top-0 left-0 w-full h-full z-[999] flex items-center justify-center bg-white">
            <Spinner color="info" className="relative" />
          </div>
        }
      >
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.requireAuth ? (
                  <RequireAuth token={token}>{route.element}</RequireAuth>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Routes>
      </Suspense>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: (token, navigate) =>
      dispatch({ type: LOGOUT_USER, token, navigate }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
