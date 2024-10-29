"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import api from "../hooks/axios";
import { useAuth } from "../hooks/AuthProvider";
import Card from "../components/Card";
import Layout from "../components/Layout";

const LoginPage = () => {
  const router = useRouter();
  const { user, setUser, setToken } = useAuth();

  const url = "/Authentication/login";

  useEffect(() => {
    if (user != null) {
      toast.success("Already logged in");
      router.push("/");
    }
  }, []);

  const login = async () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
      const result = await api.post(url, {
        email: email,
        password: password,
      });

      if (result.status === 200) {
        setToken(result.data.accessToken);
        setUser(result.data.user);
        toast.success("Login succesful");
        router.push("/");
      }
    } catch {
      toast.error("Login failed");
    }
  };

  return (
    <Layout hideSidebar={true}>
      <div className="h-screen flex items-center">
        <div className="max-w-sm mx-auto grow -mt-24">
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
                  Password
                </h2>
                <input
                  id="password"
                  className="border-2 rounded-md p-2 w-full"
                  type="password"
                />
              </div>
              <div className="mx-2 mt-3 mb-0">
                <button
                  onClick={() => login()}
                  className="bg-woymBlue text-white text-lg py-2 rounded-lg w-full"
                >
                  Login
                </button>
              </div>
              <div className="m-2 mt-0 text-center">
                <Link
                  href="/register"
                  className="hover:text-woymBlue hover:underline text-xs"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
