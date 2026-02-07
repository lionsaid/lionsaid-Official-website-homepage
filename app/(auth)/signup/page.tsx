export const metadata = {
  title: "Sign Up - Simple",
  description: "Page description",
};

import { redirect } from "next/navigation";
import SignUpForm from "./signup-form";
import { registerAccount, signInWithPassword } from "@/lib/system-api";
import { setSessionToken } from "@/lib/auth/session";
import { getI18n } from "@/lib/i18n/server";

type FormState = { error?: string };

export default async function SignUp() {
  const { t } = await getI18n();
  const copy = {
    title: t.auth.signUpTitle,
    nameLabel: t.auth.fullName,
    emailLabel: t.auth.email,
    phoneLabel: t.auth.phone,
    passwordLabel: t.auth.password,
    buttonLabel: t.auth.registerButton,
    haveAccount: t.auth.haveAccount,
    signInLink: t.auth.signInLink,
    signInHref: "/signin",
    githubCta: t.auth.continueWithGithub,
    tos: {
      prefix: t.auth.tosPrefix,
      middle: t.auth.tosMiddle,
      suffix: t.auth.tosSuffix ?? "",
      terms: t.auth.termsOfService,
      privacy: t.auth.privacyPolicy,
      termsLink: "/terms",
      privacyLink: "/privacy",
    },
  };

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">{copy.title}</h1>
      </div>
      <SignUpForm action={handleSignUp} copy={copy} />
    </>
  );
}

async function handleSignUp(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  "use server";
  const { locale } = await getI18n();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return {
      error: locale === "zh" ? "请填写必填信息以完成注册。" : "Please fill in all required fields.",
    };
  }

  const registerResult = await registerAccount({
    fullName: name,
    email,
    phone,
    password,
  });

  const token = registerResult?.token ?? (await fallbackSignIn(email, password))?.token;
  if (!token) {
    return {
      error:
        locale === "zh"
          ? "注册失败，请稍后重试。"
          : "We couldn’t complete the registration. Please try again.",
    };
  }

  await setSessionToken(token, registerResult?.expiresIn);
  redirect("/console/dashboard");
}

async function fallbackSignIn(email: string, password: string) {
  if (!email || !password) return null;
  return signInWithPassword({ username: email, password });
}
