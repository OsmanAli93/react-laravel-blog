import React, { useEffect } from "react";
import ProfileForm from "../../components/Form/ProfileForm";
import Toast from "../../components/Toast";
import { connect } from "react-redux";

const Profile = ({ success }) => {
  return (
    <section className="flex justify-center py-[90px]">
      <ProfileForm />

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
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    success: state.auth.successMessage,
  };
};

export default connect(mapStateToProps)(Profile);
