import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <div className="w-[80%] mx-auto">
      Signup
      <SignUp
        appearance={{
          layout: {
            helpPageUrl: "https://clerk.dev/support",
            // logoImageUrl: "/yuz3.JPEG",
            logoPlacement: "inside",
            socialButtonsPlacement: "bottom",
            socialButtonsVariant: "iconButton",
            privacyPageUrl: "https://clerk.dev/privacy",
            termsPageUrl: "https://clerk.dev/terms",
          },
        }}
      />
    </div>
  );
}
