"use client";
import Link from "next/link";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
export default function User() {
  const session = useSession();
  const name = session.data?.user?.name;
  const image = session?.data?.user?.image;
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <Disclosure.Button className="relative inline-flex items-center justify-center flex-col rounded-full p-1 ">
            <span className="sr-only">Open main menu</span>
            <Image
              height={55}
              width={55}
              className=" rounded-full"
              src={image || ""}
              alt="User"
            />
            <span>{name}</span>
          </Disclosure.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Disclosure.Panel className="absolute right-0 mt-1 w-48 origin-top-right rounded-md bg-indigo-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <ul>
                <Disclosure.Button as="li">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 cursor-pointer text-white text-sm "
                  >
                    Profile
                  </Link>
                </Disclosure.Button>
                <Disclosure.Button as="li">
                  <Link
                    href="/orders"
                    className="block px-4 py-2 cursor-pointer text-white text-sm "
                  >
                    My orders{" "}
                    <span className="bg-red-500 px-1.5 py-0.5 h-7 rounded">
                      0
                    </span>
                  </Link>
                </Disclosure.Button>
                <Disclosure.Button as="li">
                  <Link
                    href="#"
                    className="block px-4 cursor-pointer  text-white py-2 text-sm "
                  >
                    Settings
                  </Link>
                </Disclosure.Button>
                <Disclosure.Button as="li">
                  <button
                    onClick={() => signOut()}
                    className="block px-4 py-2 text-sm  text-white cursor-pointer"
                  >
                    Sign out
                  </button>
                </Disclosure.Button>
              </ul>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
