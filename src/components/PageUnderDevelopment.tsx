import { Link } from "react-router";
import { schoolLogo } from "@/assets";
export default function PageUnderDevelopment() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center space-y-1">
      <div className="flex flex-col justify-center items-center h-full gap-5">
        <img
          className="w-60"
          src={schoolLogo}
          alt="tmit-logo"
          draggable={false}
        />
        <h1 className="text-center">
          Hello Applicant, Welcome to TMIT core portal!
        </h1>
        <h1 className="text-center text-red-400 font-semibold">
          Please note that this page is still under development by the technical
          team.
        </h1>
        <div className="flex flex-col justify-center items-center gap-5">
          <Link to="profile" className="bg-green-500 p-3 rounded-sm text-white">
            Continue to profile
          </Link>
        </div>
      </div>
    </div>
  );
}
