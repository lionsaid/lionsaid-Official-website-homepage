"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useActionState, useId, useState } from "react";
import { useFormStatus } from "react-dom";

type FormState = { error?: string };

type Props = {
  title: string;
  openLabel: string;
  submitLabel: string;
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  children: React.ReactNode;
  variant?: "primary" | "danger";
  triggerClassName?: string;
};

const INITIAL_STATE: FormState = {};

export default function ActionModal({
  title,
  openLabel,
  submitLabel,
  action,
  children,
  variant = "primary",
  triggerClassName,
}: Props) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState<FormState, FormData>(action, INITIAL_STATE);
  const labelId = useId();

  return (
    <>
      <button
        type="button"
        className={
          triggerClassName ??
          (variant === "danger"
            ? "rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500/20"
            : "rounded-full border border-transparent bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:scale-[1.01]")
        }
        onClick={() => setOpen(true)}
      >
        {openLabel}
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-slate-950">
            <DialogTitle id={labelId} className="text-lg font-semibold text-slate-900 dark:text-white">
              {title}
            </DialogTitle>
            <form action={formAction} className="mt-4 space-y-4">
              {children}
              {state?.error && (
                <p className="text-sm text-rose-600 dark:text-rose-300" role="alert">
                  {state.error}
                </p>
              )}
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  className="rounded-full border border-slate-200/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <SubmitButton variant={variant}>{submitLabel}</SubmitButton>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

function SubmitButton({ children, variant }: { children: React.ReactNode; variant: "primary" | "danger" }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={
        variant === "danger"
          ? "rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:opacity-70"
          : "rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70 dark:bg-white dark:text-slate-900 dark:hover:bg-white/90"
      }
    >
      {pending ? "…" : children}
    </button>
  );
}
