
import { Link } from "react-router-dom";

const SignupHeader = () => {
  return (
    <div className="text-center">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-gray-900 mx-0 my-[25px]">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-artswarit-purple hover:text-artswarit-purple-dark">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignupHeader;
