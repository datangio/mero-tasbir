"use client";
import React, { useState } from "react";

export const SignUp = () => {
  const [page, setPage] = useState<number>(1);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpError, setOtpError] = useState("");
  const [resendMessage, setResendMessage] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleResend = () => {
    setResendMessage(true);
    setTimeout(() => setResendMessage(false), 3000);
  };

  const handleContinue = () => {
    if (!email.trim()) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
      setPage(2);
    }
  };

  const handleVerify = () => {
    setTimeout(() => setOtpError(" "), 3000);
    if (otp.some(digit => digit === "")) {
      setOtpError("Code is required");
    } else {
      setOtpError("");
      setPage(3);
    }
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        return (
          <div className="flex flex-col items-center">
            <img src="#" alt="logo" className="mb-6 h-12 w-12" />

            <h1 className="mb-2 text-center text-2xl font-bold text-black">
              Welcome to Mero Tasbir
            </h1>
            <h2 className="text-m mb-8 text-center text-black">
              Create your account and discover world-class
              <br /> design talent.
            </h2>

            <button className="rounded-4xl mb-6 flex w-full items-center justify-center gap-3 border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-blue-100 ">
              <img src="/google.png" alt="Google" className="h-5 w-5 " />
              Continue with Google
            </button>

            <div className="mb-6 w-full items-center">
              <span className="mx-3 ml-40 text-sm text-gray-500">or</span>
            </div>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="mb-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            {emailError && (
              <p className="mb-3 text-sm text-red-500">{emailError}</p>
            )}
            <br />

            <button
              onClick={handleContinue}
              className="w-full rounded-3xl bg-gray-900 py-3 font-medium text-white transition hover:bg-gray-600"
            >
              Continue
            </button>

            <p className="mt-5 text-center text-sm leading-relaxed text-gray-500">
              By signing up, you agree to our{" "}
              <a href="#" className="underline hover:text-gray-700">
                Terms{" "}
              </a>
              and{" "}
              <a href="#" className="underline hover:text-gray-700">
                Privacy Policy
              </a>
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="#"
                className="text-gray-500 underline hover:text-gray-700"
              >
                Sign in
              </a>
            </p>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col items-center">
            <img src="#" alt="logo" className="mb-6 h-12 w-12" />

            <h1 className="mb-2 text-center text-2xl font-bold text-black">
              Create your account
            </h1>
            <h2 className="text-m mb-8 text-center text-black">
              We’ve sent a passcode to your email
            </h2>

            <div className="mb-2 flex justify-center gap-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(index, e.target.value)}
                  className="h-12 w-12 rounded-lg border border-gray-300 text-center text-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              ))}
            </div>

            {otpError && (
              <p className="mt-2 text-center text-sm text-red-500">
                {otpError}
              </p>
            )}

            {resendMessage && (
              <p className="mt-2 text-center text-sm text-blue-500">
                Code successfully resent to your email.
              </p>
            )}

            <button
              onClick={handleVerify}
              className="mt-4 w-full rounded-3xl bg-gray-900 py-3 font-medium text-white transition hover:bg-gray-600"
            >
              Verify
            </button>

            <p className="mt-5 text-sm text-gray-500">
              <button
                type="button"
                onClick={handleResend}
                className="text-gray-500 underline hover:text-gray-900"
              >
                Resend code
              </button>
            </p>
          </div>
        );

      default:
        return (
          <div className="text-center text-4xl">
            <h1 className="text-blue-700">Final</h1>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      {renderPage()}
    </div>
  );
};
