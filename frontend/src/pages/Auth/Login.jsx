import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Form/Auth/LoginForm";

const Login = ({ token, user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (token && user) {
      navigate("/");
    }
  }, []);

  return (
    <section>
      <div className="container">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Login);
