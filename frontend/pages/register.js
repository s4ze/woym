import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

import Card from "../components/Card";
import Layout from "../components/Layout";
import "../styles/globals.css";

const RegisterPage = () => {
  const url = "http://localhost:5149/api/Authentication/register";
  const router = useRouter();

  const register = async () => {
    const registerEmail = document.querySelector("#email").value;
    const registerName = document.querySelector("#name").value;
    const registerPassword = document.querySelector("#password").value;

    const newRegister = {
      email: registerEmail,
      name: registerName,
      password: registerPassword,
    };

    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newRegister),
    };

    const result = await fetch(url, options);
    if (result.ok) {
      toast.success("Register successful");
      router.push("/login");
    } else {
      toast.error("Register failed");
    }
  };

  return (
    <Layout hideSidebar={true}>
      <div className="h-screen flex items-center">
        <div className="max-w-sm mx-auto grow -mt-8">
          <h1 className="text-6xl mb-4 text-gray-300">Login</h1>
          <Card>
            <div className="m-2">
              <div className="m-2">
                <h2 className="text-2xl mb-0 font-medium text-gray-600">
                  E-mail
                </h2>
                <input
                  id="email"
                  className="border-2 rounded-md p-2 w-full"
                  type="email"
                />
              </div>
              <div className="m-2">
                <h2 className="text-2xl mb-0 font-medium text-gray-600">
                  Name
                </h2>
                <input
                  id="name"
                  className="border-2 rounded-md p-2 w-full"
                  type="text"
                />
              </div>
              <div className="m-2">
                <h2 className="text-2xl mb-0 font-medium text-gray-600">
                  Password
                </h2>
                <input
                  id="password"
                  className="border-2 rounded-md p-2 w-full"
                  type="text"
                />
              </div>
              <div className="m-2">
                <h2 className="text-2xl mb-0 font-medium text-gray-600">
                  Confirm password
                </h2>
                <input className="border-2 rounded-md p-2 w-full" type="text" />
              </div>
              <div className="mx-2 mt-3 mb-0">
                <button
                  onClick={register}
                  className="bg-woymBlue text-white text-lg py-2 rounded-lg w-full"
                >
                  Sign up
                </button>
              </div>
              <div className="m-2 mt-0 text-center">
                <Link
                  href="/login"
                  className="hover:text-woymBlue hover:underline text-xs"
                >
                  Login
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
