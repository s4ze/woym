"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../hooks/axios";
import { useAuth } from "../hooks/AuthProvider";
import Card from "../components/Card";
import Layout from "../components/Layout";
import InputForm from "../components/InputForm";

const LoginPage = () => {
  const router = useRouter();
  const { user, setUser, setToken } = useAuth();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    if (user != null) {
      toast.success("Already logged in");
      router.push("/");
    }
  }, []);

  const login = async () => {
    try {
      const result = await api.post("/Authentication/login", {
        email: email,
        password: password,
      });

      if (result.status === 200) {
        setToken(result.data.accessToken);
        setUser(result.data.user);
        toast.success("Login succesful");
        router.push("/");
      }
    } catch (e) {
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
              <InputForm name="Email" setValue={setEmail} type="email" />
              <InputForm
                name="Password"
                setValue={setPassword}
                type="password"
              />
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
