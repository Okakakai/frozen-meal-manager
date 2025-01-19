import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="container h-[80dvh] mt-5 flex justify-center items-center">
      <SignUp fallbackRedirectUrl={"/"} />
    </div>
  );
};

export default SignUpPage;
