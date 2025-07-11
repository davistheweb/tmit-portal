import { Link } from "react-router";
import { schoolLogo } from "./assets";

export default function IndexPage() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center space-y-1">
      <div className="flex flex-col justify-center items-center h-full gap-5">
        <img
          className="w-60"
          src={schoolLogo}
          alt="tmit-logo"
          draggable={false}
        />
        <h1>Hello Applicant, Welcome to TMIT core portal!</h1>
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex justify-center items-center h-full gap-5">
            <Link to="auth/register">Register</Link>
            <div className="bg-gray-500 h-8 w-1" />
            <Link to="auth/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="flex flex-col justify-center items-center h-full gap-5">
  <img src={schoolLogo} alt="schoolLogo" className="w-40" />
  <div className="flex justify-center items-center h-full gap-5">
    <Link to="auth/register">Register</Link>
    <div className="bg-gray-500 h-8 w-1" />
    <Link to="auth/login">Login</Link>
  </div>
</div>; */
}
