import Link from "next/link";
import { SettingsIcon } from "../public/icons";
import Card from "./Card";
import { useAuth } from "../hooks/AuthProvider";
import Separator from "./Separator";

const AboutTab = () => {
  const { user } = useAuth();

  return (
    <div>
      <Card>
        <p className="mb-2">About: Can't be added now</p>
        <Separator />
        <h2 className="text-3xl mb-2">About me</h2>
        <p className="mb-2">{`UserID: ${user?.userId || ""}`}</p>
        <p className="mb-2">{`E-mail: ${user?.email || ""}`}</p>
        <p className="mb-2">{`Name: ${user?.name || ""}`}</p>
        <p className="mb-2">{`Created at: ${user?.createdAt || ""}`}</p>
        <p className="mb-2">{`Birth date: ${user?.birthDate || ""}`}</p>
        <p className="mb-2">{`City: ${user?.city || ""}`}</p>
        <div className="flex">
          <Link
            href="/profile/edit"
            className="border border-2 rounded-lg flex ml-auto mt-4 gap-1 px-4 py-2"
          >
            <SettingsIcon />
            Edit
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default AboutTab;
