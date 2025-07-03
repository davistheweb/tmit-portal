import * as React from "react";
import { authBackground } from "@/assets";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthFormLayout } from "@/components/layouts/AuthFormLayout";
import { Link } from "react-router";

export const Login: React.FC = () => {
  return (
    <div className="flex gap-5 justify-between w-full">
      <div className="mt-5 mr-5 ml-5">
        <AuthFormLayout
          heading="Welcome to TMIT"
          subtitle="Login to access the student portal"
        >
          <LoginForm />
        </AuthFormLayout>
      </div>
      <div className="bg-green-500 h-screen w-[700px]">
        <div className="">
          <img
            className=" w-[900px] h-screen"
            src={authBackground}
            alt="background"
            loading="lazy"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
};

const LoginForm: React.FC = () => {
  return (
    <div>
      <form action="" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
        <div className="flex flex-col gap-8">
          <div>
            <Label htmlFor="username" className="mb-4">
              Username
            </Label>
            <Input
              className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
              type="text"
              placeholder="Username"
              id="username"
            ></Input>
          </div>
          <div>
            <Label htmlFor="passoword" className="mb-4">
              Password
            </Label>
            <Input
              className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
              type="password"
              placeholder="Passowrd"
              id="password"
            ></Input>
            <div className="flex justify-end mt-1 mb-2">
              <Link
                className="flex text-end text-green-400 font-light text-[12px] underline"
                to=""
              >
                Forgotten password?
              </Link>
            </div>
          </div>
          <div className="w-full h-[0.3px] bg-gray-400 z-10" />
        </div>
        <button className="cursor-pointer" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
