import NextLink from "next/link";

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

function SideRow({ needsUser = false, link, label, icon }) {
  if (needsUser) {
    // do some checking
    return null;
  }
  return (
    <NextLink href={link}>
      <a className="flex gap-x-2 items-center text-pink-700 hover:text-pink-600 dark:text-pink-300 dark:hover:text-pink-400 hover:underline">
        <div className="text-lg">{icon}</div>
        <div>{label}</div>
      </a>
    </NextLink>
  );
}

function SideBar() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-1 gap-y-1.5 bg-pink-50 dark:bg-pink-800 rounded-xl border border-pink-500 dark:border-0 p-4">
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

export default SideBar;
