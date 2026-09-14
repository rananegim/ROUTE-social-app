import React from "react";

export default function Notifications() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-3 py-3.5">
        <main className="min-w-0">
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
            <div className="border-b border-slate-200 p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
                    Notifications
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Realtime updates for likes, comments, shares, and follows.
                  </p>
                </div>
                <button
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  disabled
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={15}
                    height={15}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check-check"
                    aria-hidden="true"
                  >
                    <path d="M18 6 7 17l-5-5" />
                    <path d="m22 10-7.5 7.5L13 16" />
                  </svg>
                  Mark all as read
                </button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:items-center">
                <button
                  type="button"
                  className="rounded-full px-4 py-1.5 text-sm font-bold transition bg-[#1877f2] text-white"
                >
                  All
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold transition bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  Unread
                </button>
              </div>
            </div>
            <div className="space-y-2 p-3 sm:p-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-sm font-semibold text-slate-500">
                  No notifications yet.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
