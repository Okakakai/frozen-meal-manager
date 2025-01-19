import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="container h-[80dvh] mt-5 flex justify-center items-center">
      <SignIn fallbackRedirectUrl={"/"} />
    </div>
  );
};

export default SignInPage;
