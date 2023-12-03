import React, { useEffect } from "react";
import RegisterForm from "../../components/Form/Auth/RegisterForm";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Register = ({ token, user }) => {
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
          <RegisterForm />
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

export default connect(mapStateToProps)(Register);
