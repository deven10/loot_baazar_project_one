import React from "react";
import memeImage from "../../images/cirkit_meme.jpg";

import "./ForgotPassword.css";

export const ForgotPassword = () => {
  return (
    <div>
      <div className="forgot-password-main default-bg-color">
        <div className="message">
          <p>User: Bhai mera password yaad hai 😢?</p>
        </div>
        <div className="reply">
          <p>Reply: </p>
          <img src={memeImage} alt="Mereko kya malum bhai" />
        </div>
      </div>
    </div>
  );
};
