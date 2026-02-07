"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

type FormState = {
  error?: string;
};

type Copy = {
  emailLabel: string;
  passwordLabel: string;
  buttonLabel: string;
  noAccount: string;
  signUpLink: string;
  signUpHref: string;
  forgotPassword: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  forgotHref: string;
};

type Props = {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  copy: Copy;
};

const INITIAL_STATE: FormState = {};

export default function SignInForm({ action, copy }: Props) {
  const [state, formAction] = useActionState<FormState, FormData>(action, INITIAL_STATE);

  return (
    <>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
            {copy.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            className="form-input w-full py-2"
            type="email"
            placeholder={copy.emailPlaceholder}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
            {copy.passwordLabel}
          </label>
          <input
            id="password"
            name="password"
            className="form-input w-full py-2"
            type="password"
            autoComplete="current-password"
            placeholder={copy.passwordPlaceholder}
            required
          />
        </div>
        {state?.error && (
          <p className="text-sm text-rose-500" role="alert">
            {state.error}
          </p>
        )}
        <SubmitButton>{copy.buttonLabel}</SubmitButton>
      </form>
      <div className="mt-6 text-center">
        <div className="space-y-2 text-sm">
          <Link className="text-gray-700 underline hover:no-underline dark:text-gray-300" href={copy.forgotHref}>
            {copy.forgotPassword}
          </Link>
          <p className="text-gray-500 dark:text-gray-400">
            {copy.noAccount}{" "}
            <Link className="font-medium text-gray-700 underline hover:no-underline dark:text-gray-200" href={copy.signUpHref}>
              {copy.signUpLink}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn w-full bg-linear-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%] disabled:opacity-70"
    >
      {pending ? "…" : children}
    </button>
  );
}
