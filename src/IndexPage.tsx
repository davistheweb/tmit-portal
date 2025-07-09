import { Link } from "react-router";

export default function IndexPage() {
  return (
    <div className="flex justify-center items-center h-full gap-5">
      <Link to="auth/register">Register</Link>
      <div className="bg-gray-500 h-8 w-1"/>
      <Link to="auth/login">Login</Link>
    </div>
  );
}
