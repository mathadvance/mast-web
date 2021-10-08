import NextLink from "next/link";

import { useAuth } from "@/contexts/AuthProvider";

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
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function SideRow({ needsUser = false, link, label, icon }) {

  const { asPath } = useRouter();

  const { user } = useAuth();

  if (needsUser && !user) {
    return null;
  }

  return (
    <NextLink href={link}>
      <a className="flex gap-x-2 items-center pink-link">
        <div className="text-lg">{icon}</div>
        <div>{label}</div>
      </a>
    </NextLink>
  );
}

export default function SideBar() {
  return (
    <div className="grid grid-cols-1 widephone:grid-cols-2 sm:grid-cols-1 gap-y-1.5 bg-pink-100 dark:bg-opacity-25 dark:bg-pink-600 rounded-xl border border-pink-500 p-4">
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
