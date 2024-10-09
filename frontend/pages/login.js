import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

import Card from "../components/Card";
import Layout from "../components/Layout";

import "../styles/globals.css";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState();

  const url = "http://localhost:5149/api/Authentication/login";
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");
  // console.log(jwt);

  useEffect(() => {
    if (accessToken || refreshToken) router.push("/");
  });

  const logIn = async () => {
    const loginEmail = document.querySelector("#email").value;
    const loginPassword = document.querySelector("#password").value;

    const newLogin = {
      email: loginEmail,
      password: loginPassword,
    };

    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newLogin),
    };

    const result = await fetch(url, options);
    if (result.ok) {
      const tokens = await result.json();
      // const parsedTokens = JSON.stringify(tokens);
      console.log(tokens.AccessToken);
      const decodedAccessToken = jwtDecode(tokens.accessToken);
      const decodedRefreshToken = jwtDecode(tokens.refreshToken);

      cookies.set("refreshToken", decodedRefreshToken, {
        expires: new Date(decodedRefreshToken.exp * 1000),
      });

      cookies.set("accessToken", decodedAccessToken, {
        expires: new Date(decodedRefreshToken.exp * 1000),
      });

      toast.success("Login succesful");
      router.push("/");
    } else {
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
                  onClick={logIn}
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
                <div className="w-3/4 mx-auto">
                  <div className="my-3 border border-gray-200 rounded-md">
                    <Link href="/">
                      <Card noBottomMargin={true} hoverEffect={true}>
                        <div className="flex gap-3 items-center justify-center rounded-md">
                          <svg
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 326667 333333"
                            shape-rendering="geometricPrecision"
                            text-rendering="geometricPrecision"
                            image-rendering="optimizeQuality"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          >
                            <path
                              d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
                              fill="#4285f4"
                            />
                            <path
                              d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
                              fill="#34a853"
                            />
                            <path
                              d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
                              fill="#fbbc04"
                            />
                            <path
                              d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
                              fill="#ea4335"
                            />
                          </svg>
                          Login with Google
                        </div>
                      </Card>
                    </Link>
                  </div>
                  <div className="my-3 border border-gray-200 rounded-md">
                    <Link href="/">
                      <Card noBottomMargin={true} hoverEffect={true}>
                        <div className="flex gap-3 items-center justify-center rounded-md">
                          <svg
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 333333 333333"
                            shape-rendering="geometricPrecision"
                            text-rendering="geometricPrecision"
                            image-rendering="optimizeQuality"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          >
                            <path
                              d="M333328 63295c-12254 5480-25456 9122-39241 10745 14123-8458 24924-21861 30080-37819-13200 7807-27871 13533-43416 16596-12499-13281-30252-21537-49919-21537-37762 0-68336 30591-68336 68330 0 5326 591 10537 1748 15562-56820-2880-107194-30081-140915-71467-6049 10435-9250 22300-9250 34367v8c0 23696 12031 44654 30389 56876-11202-333-21739-3457-30991-8519v854c0 33138 23554 60789 54852 67039-5734 1557-11787 2417-18023 2417-4417 0-8673-455-12905-1224 8742 27139 33975 46923 63857 47500-23430 18356-52858 29286-84939 29286-5537 0-10931-339-16318-984 30326 19458 66251 30727 104844 30727 125735 0 194551-104198 194551-194543 0-3002-67-5911-191-8852 13354-9553 24932-21609 34097-35333l31-31-6 4z"
                              fill="#1da1f2"
                            />
                          </svg>
                          Login with Twitter
                        </div>
                      </Card>
                    </Link>
                  </div>
                  <div className="my-3 border border-gray-200 rounded-md">
                    <Link href="/">
                      <Card noBottomMargin={true} hoverEffect={true}>
                        <div className="flex gap-3 items-center justify-center rounded-md">
                          <svg
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            shape-rendering="geometricPrecision"
                            text-rendering="geometricPrecision"
                            image-rendering="optimizeQuality"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            viewBox="0 0 640 640"
                          >
                            <path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z" />
                          </svg>
                          Login with Github
                        </div>
                      </Card>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
