export const metadata = {
  title: {
    template: "%s | Easy Lift & Clean",
    default: "Authentication | Easy Lift & Clean",
  },
  description: "Sign in, sign up, or manage your account access.",
};

export default function AuthLayout({ children }) {
  return <>{children}</>;
}