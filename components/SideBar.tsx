import NextLink from "next/link";

import { useAuth } from "@/contexts/AuthProvider";
import { useTheme } from "@/contexts/ThemeProvider";

import {
  FaHome,
  FaCog,
  FaInfo,
  FaQuestion,
  FaDollarSign,
  FaPaperPlane,
  FaUser,
  FaFileAlt,
  FaDoorOpen,
} from "react-icons/fa";

export default function SideBar() {
  const { sideBarColor } = useTheme();

  function SideRow({ needsUser = false, link, label, icon }) {
    const { user } = useAuth();

    if (needsUser && !user) {
      return null;
    }

    return (
      <NextLink href={link}>
        <a
          className={`flex gap-x-2 items-center ${
            sideBarColor === "pink"
              ? "pink-link"
              : "text-blue-700 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 hover:underline"
          }`}
        >
          <div className="text-lg">{icon}</div>
          <div>{label}</div>
        </a>
      </NextLink>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 widephone:grid-cols-2 sm:grid-cols-1 gap-y-1.5  rounded-xl border p-4 ${
        sideBarColor === "pink"
          ? `bg-pink-100 dark:bg-pink-600/25 border-pink-500`
          : `bg-blue-200 dark:bg-opacity-30 dark:bg-blue-600 border-blue-500`
      }`}
    >
      <SideRow needsUser link="/home" label="Home" icon={<FaHome />} />
      <SideRow needsUser link="/settings" label="Settings" icon={<FaCog />} />
      <SideRow link="/about" label="About" icon={<FaInfo />} />
      <SideRow link="/staff" label="Staff" icon={<FaUser />} />
      <SideRow link="/apply" label="Apply" icon={<FaPaperPlane />} />
      <SideRow link="/payment" label="Payment" icon={<FaDollarSign />} />
      <SideRow link="/resources" label="Resources" icon={<FaFileAlt />} />
      <SideRow link="/faq" label="FAQ" icon={<FaQuestion />} />
      <SideRow
        needsUser
        link="/signout"
        label="Sign Out"
        icon={<FaDoorOpen />}
      />
    </div>
  );
}
