export const metadata = {
  title: "Reset Password - Simple",
  description: "Page description",
};

import { getI18n } from "@/lib/i18n/server";

export default async function ResetPassword() {
  const { t } = await getI18n();
  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">{t.auth.resetPasswordTitle}</h1>
      </div>

      {/* Form */}
      <form>
        <div className="space-y-4">
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="email"
            >
              {t.auth.email}
            </label>
            <input
              id="email"
              className="form-input w-full py-2"
              type="email"
              placeholder="corybarker@email.com"
              required
            />
          </div>
        </div>
        <div className="mt-6">
          <button className="btn w-full bg-linear-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%]">
            {t.auth.resetPasswordButton}
          </button>
        </div>
      </form>
    </>
  );
}
