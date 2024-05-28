import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha"; // Import the reCAPTCHA component
import { useTranslation } from "react-i18next";

const MyForm = ({ onFormSubmit }) => {
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const [isVerified, setIsVerified] = useState(false); // State to track verification status
  const { t } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form submission logic
    if (isVerified) {
      // Proceed with form submission
      onFormSubmit(); // Notify the parent component
    } else {
      console.log("reCAPTCHA verification failed.");
    }
  };

  const handleRecaptchaChange = (value) => {
    console.log("reCAPTCHA value:", value);
    setRecaptchaValue(value);
    setIsVerified(true); // Update verification status
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Other form fields */}
      <div className="d-flex justify-content-start">
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          onChange={handleRecaptchaChange}
          hl={localStorage.getItem("i18nextLng")}
          theme="dark"
        />
        <button className="btn btn-purple rounded-pill " type="submit">
          {t("landing.contact.verify_btn")}
        </button>
      </div>
    </form>
  );
};

export default MyForm;
