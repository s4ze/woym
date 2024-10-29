"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import api from "../hooks/axios";

import Card from "../components/Card";
import Layout from "../components/Layout";

const RegisterPage = () => {
  const registerUrl = "/Authentication/register";
  const loginUrl = "/Authentication/login";
  const router = useRouter();

  const register = async () => {
    const email = document.querySelector("#email").value;
    const name = document.querySelector("#name").value;
    const password = document.querySelector("#password").value;

    toast.success("BRUH");
    try {
      const result = await api.post(registerUrl, {
        email: email,
        name: name,
        password: password,
      });

      if (result.status === 200) {
        toast.success("Register successful");
        toast.loading("Attempting to log in...");

        try {
          const loginResult = await api.post(loginUrl, {
            email: email,
            password: password,
          });

          if (loginResult.status === 200) {
            setToken(loginResult.data.accessToken);
            toast.success("Login succesful");
            router.push("/");
          }
        } catch (e) {
          toast.error("Login failed");
          router.push("/login");
          console.log(e.message);
        }
      }
    } catch (e) {
      toast.error("Register failed");
      console.log(e.message);
    }
  };

  return (
    <Layout hideSidebar={true}>
      <div className="h-screen flex items-center">
        <div className="max-w-sm mx-auto grow -mt-8">
          <h1 className="text-6xl mb-4 text-gray-300">Registration</h1>
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
                  onClick={() => register()}
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
