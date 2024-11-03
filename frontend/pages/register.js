"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../hooks/axios";

import Card from "../components/Card";
import Layout from "../components/Layout";
import InputForm from "../components/InputForm";
import { useAuth } from "../hooks/AuthProvider";

const RegisterPage = () => {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);

  const router = useRouter();

  const register = async () => {
    const { setUser } = useAuth();

    try {
      const result = await api.post("/Authentication/register", {
        email: email,
        name: name,
        password: password,
      });

      if (result.status === 200) {
        toast.success("Register successful");

        try {
          const loginResult = await api.post("/Authentication/login", {
            email: email,
            password: password,
          });

          if (loginResult.status === 200) {
            setToken(loginResult.data.accessToken);
            setUser(loginResult.data.user);
            toast.success("Login succesful");
            router.push("/");
          }
        } catch (e) {
          toast.error("Login failed");
          router.push("/login");
        }
      }
    } catch (e) {
      toast.error("Register failed");
    }
  };

  return (
    <Layout hideSidebar={true}>
      <div className="h-screen flex items-center">
        <div className="max-w-sm mx-auto grow -mt-8">
          <h1 className="text-6xl mb-4 text-gray-300">Registration</h1>
          <Card>
            <div className="m-2">
              <InputForm
                name="Email"
                setValue={setEmail}
                type="email"
                size="md"
              />
              <InputForm name="Name" setValue={setName} size="md" />
              <InputForm
                name="Password"
                setValue={setPassword}
                type="password"
                size="md"
              />
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
