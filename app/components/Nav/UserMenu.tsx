"use client";

import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SaveUser } from "@/types";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    currentUser: SaveUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
      setIsOpen((prev) => !prev);
  }, []);
    
    const router = useRouter();

  return (
    <>
      {!currentUser ? (
       
          <div className="relative z-30">
            <div
              onClick={()=>router.push('/auth')}
              className="flex flex-row items-center gap-1 border border-slate-400 p-2 rounded-full cursor-pointer hover:shadow-md transition text-slate-700 "
            >
              <Avatar />
            </div>
          </div>
    
      ) : (
        <div className="relative z-30">
          <div
            onClick={toggleOpen}
            className="flex flex-row items-center gap-1 border border-slate-400 p-2 rounded-full cursor-pointer hover:shadow-md transition text-slate-700 "
          >
            <Avatar />
            {currentUser && <AiFillCaretDown />}
          </div>
          {isOpen && (
            <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer ">
              <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
              <MenuItem
                onClick={() => {
                  toggleOpen();
                  signOut();
                }}
              >
                Log Out
              </MenuItem>
            </div>
          )}
        </div>
      )}

      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
