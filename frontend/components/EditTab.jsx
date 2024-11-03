import { useState } from "react";
import toast from "react-hot-toast";

import Card from "./Card";
import InputForm from "./InputForm";

import api from "../hooks/axios";
import { useAuth } from "../hooks/AuthProvider";
import { useRouter } from "next/router";
import { BackIcon, SendIcon } from "../public/icons";
import Link from "next/link";
import fetchUser from "../hooks/fetchUser";

const EditTab = () => {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [city, setCity] = useState(null);

  const { user, setUser } = useAuth();
  const router = useRouter();

  const edit = async () => {
    try {
      const result = await api.put(
        "/Authentication/edit",
        {
          email: email,
          name: name,
          password: password,
          birthdate: birthdate,
          city: city,
        },
        {
          params: {
            userId: user.userId,
          },
        }
      );

      if (result.status === 200) {
        toast.success("Edit successful");
        router.push("/profile/about");

        if (user) setUser(fetchUser(user));
      }
    } catch {
      toast.error("Editing profile failed");
    }
  };

  return (
    <Card>
      <InputForm name="Email" setValue={setEmail} textSize="sm" />
      <InputForm name="Name" setValue={setName} textSize="sm" />
      <InputForm name="Password" setValue={setPassword} textSize="sm" />
      <InputForm name="Birth date" setValue={setBirthdate} textSize="sm" />
      <InputForm name="City" setValue={setCity} textSize="sm" />

      <div className="flex">
        <div className="mr-auto ">
          <Link
            href="/profile/about"
            className="border border-2 rounded-lg flex ml-auto gap-1 px-4 py-2"
          >
            <BackIcon />
            Back
          </Link>
        </div>
        <div className="ml-auto">
          <button
            className="bg-woymBlue flex text-white gap-2 px-4 py-2 rounded-md"
            onClick={() => edit()}
          >
            Send
            <SendIcon />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default EditTab;
