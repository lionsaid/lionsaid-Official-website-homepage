export const metadata = {
  title: "Sign In - Simple",
  description: "Page description",
};

import { redirect } from "next/navigation";
import SignInForm from "./signin-form";
import { signInWithPassword } from "@/lib/system-api";
import { setSessionToken } from "@/lib/auth/session";
import { getI18n } from "@/lib/i18n/server";

type FormState = {
  error?: string;
};

export default async function SignIn() {
  const { t } = await getI18n();
  const copy = {
    title: t.auth.signInTitle,
    emailLabel: t.auth.email,
    passwordLabel: t.auth.password,
    buttonLabel: t.auth.signInButton,
    noAccount: t.auth.noAccount,
    signUpLink: t.auth.signUpLink,
    signUpHref: "/signup",
    emailPlaceholder: "lionsaid@team.com",
    passwordPlaceholder: "••••••••",
    forgotPassword: t.auth.forgotPassword,
    forgotHref: "/reset-password",
  };

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">{copy.title}</h1>
      </div>
      <SignInForm action={handleSignIn} copy={copy} />
    </>
  );
}

async function handleSignIn(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  "use server";
  const { locale } = await getI18n();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      error: locale === "zh" ? "请输入邮箱和密码。" : "Email and password are required.",
    };
  }

  const authResult = await signInWithPassword({ username: email, password });
  if (!authResult?.token) {
    return {
      error:
        locale === "zh"
          ? "登录失败，请检查账号或稍后再试。"
          : "Sign-in failed. Please verify your credentials and try again.",
    };
  }

  await setSessionToken(authResult.token, authResult.expiresIn);
  redirect("/console/dashboard");
}
