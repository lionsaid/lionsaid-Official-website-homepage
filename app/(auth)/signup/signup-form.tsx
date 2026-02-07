"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

type FormState = {
  error?: string;
};

type Copy = {
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  passwordLabel: string;
  buttonLabel: string;
  haveAccount: string;
  signInLink: string;
  signInHref: string;
  githubCta: string;
  tos: {
    prefix: string;
    middle: string;
    suffix: string;
    terms: string;
    privacy: string;
    termsLink: string;
    privacyLink: string;
  };
};

type Props = {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  copy: Copy;
};

const INITIAL_STATE: FormState = {};

export default function SignUpForm({ action, copy }: Props) {
  const [state, formAction] = useActionState<FormState, FormData>(action, INITIAL_STATE);

  return (
    <>
      <form action={formAction} className="space-y-4">
        <Field label={copy.nameLabel} id="name">
          <input
            id="name"
            name="name"
            className="form-input w-full py-2"
            type="text"
            placeholder="Polaris Labs"
            required
            autoComplete="name"
          />
        </Field>
        <Field label={copy.emailLabel} id="email">
          <input
            id="email"
            name="email"
            className="form-input w-full py-2"
            type="email"
            placeholder="ops@lionsaid.com"
            required
            autoComplete="email"
          />
        </Field>
        <Field label={copy.phoneLabel} id="phone">
          <input
            id="phone"
            name="phone"
            className="form-input w-full py-2"
            type="text"
            placeholder="(+86) 188-0000-0000"
          />
        </Field>
        <Field label={copy.passwordLabel} id="password">
          <input
            id="password"
            name="password"
            className="form-input w-full py-2"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            required
          />
        </Field>
        {state?.error && (
          <p className="text-sm text-rose-500" role="alert">
            {state.error}
          </p>
        )}
        <div className="space-y-3 pt-2">
          <SubmitButton>{copy.buttonLabel}</SubmitButton>
          <button
            type="button"
            className="btn w-full bg-linear-to-t from-gray-900 to-gray-700 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%]"
            disabled
          >
            {copy.githubCta}
          </button>
        </div>
      </form>
      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        {copy.tos.prefix}
        <Link
          className="whitespace-nowrap font-medium text-gray-700 underline hover:no-underline dark:text-gray-200"
          href={copy.tos.termsLink}
        >
          {copy.tos.terms}
        </Link>{" "}
        {copy.tos.middle}
        <Link
          className="whitespace-nowrap font-medium text-gray-700 underline hover:no-underline dark:text-gray-200"
          href={copy.tos.privacyLink}
        >
          {copy.tos.privacy}
        </Link>
        {copy.tos.suffix}
      </div>
      <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        {copy.haveAccount}{" "}
        <Link className="font-medium text-gray-700 underline hover:no-underline dark:text-gray-200" href={copy.signInHref}>
          {copy.signInLink}
        </Link>
      </p>
    </>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
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
