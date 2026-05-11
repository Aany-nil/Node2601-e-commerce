const otpTemplate = (otp) => {

    return `<div style="margin:0; padding:0; background:#f4f4f4; font-family:Arial, sans-serif;">
    <div style="max-width:500px; margin:30px auto; background:#ffffff; border-radius:8px; padding:20px; border:1px solid #e2e2e2;">
      <h2 style="text-align:center; color:#333; margin-bottom:20px;">
        🔐 Email Verification
      </h2>
      <p style="font-size:16px; color:#555;">
        Hello,
      </p>

      <p style="font-size:16px; color:#555; line-height:1.6;">
        Thank you for signing up. Please use the OTP code below to verify your email address.
      </p>
      <div style="
        text-align:center;
        margin:25px 0;
        padding:15px 20px;
        font-size:28px;
        font-weight:bold;
        letter-spacing:5px;
        color:#ffffff;
        background:#007bff;
        display:inline-block;
        border-radius:6px;
      ">
        ${otp}
      </div>
      <p style="font-size:15px; color:#777; line-height:1.6;">
        This OTP is valid for <strong>5 minutes</strong>.  
        If you did not request this, please ignore this email.
      </p>
    </div>
  </div>`;
};

module.exports = { otpTemplate }