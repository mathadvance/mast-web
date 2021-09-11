import NextLink from "next/link";

import { AiOutlineInfoCircle, AiOutlineDollar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { IoMdPaperPlane } from "react-icons/io";

function SideRow({ link, label, icon }) {
  return (
    <NextLink href={link}>
      <a className="flex gap-x-2 items-center text-pink-700 hover:text-pink-600 hover:underline">
        <div className="text-lg">{icon}</div>
        <div>{label}</div>
      </a>
    </NextLink>
  );
}

function SideBar() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-1 gap-y-1.5 bg-pink-50 rounded-xl border border-pink-500 shadow-lg p-4">
      <SideRow link="/about" label="About" icon={<AiOutlineInfoCircle />} />
      <SideRow link="/staff" label="Staff" icon={<BsPersonFill />} />
      <SideRow link="/apply" label="Apply" icon={<IoMdPaperPlane />} />
      <SideRow link="/payment" label="Payment" icon={<AiOutlineDollar />} />
    </div>
  );
}

export default SideBar;
