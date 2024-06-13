import React from "react";
import Image from "next/image";
import InputGroup from "@/app/_components/inputGroup";
import ButtonLink from "@/app/_components/Link";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Metadata } from "next";
import { auth } from "@/app/auth";

const Page = async () => {
  const session = await auth();
  const email = session?.user?.email;
  const name = session?.user?.name;
  const image = session?.user?.image;
  return (
    <div className="flex justify-center  w-full sm:w-7/12 mx-auto">
      <div className="border mx-auto  w-full rounded-md p-4">
        <div className="flex justify-center items-center rounded-xl">
          <Image src={image} alt={name} width={100} height={100} />
        </div>
        <div className=" ml-10 mr-10">
          <div className=" flex-col justify-center items-center ">
            <InputGroup
              type="email"
              Inputvalue={email}
              label="email"
              readonly={true}
            />
          </div>
          <div className=" flex-col justify-center items-center ">
            <InputGroup
              type="text"
              Inputvalue={name}
              label="names"
              readonly={true}
            />
          </div>

          {/* <ButtonLink to="/profile/password" name="Change password" icon={<LockClosedIcon/>}/> */}
          <Link
            href="/profile/password"
            className="flex gap-1 btn btn-primary text-sm"
          >
            <LockClosedIcon width={25} height={25} />
            Change password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
export const metadata: Metadata = {
  title: "Profile",
};
