import React, { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";
import { email } from "zod/v4";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../PostCard/PostCard";

export default function Profile() {
  function getProfilePosts() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${userData._id}/posts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["getProfilePosts"],
    queryFn: getProfilePosts,
  });
  // console.log(data?.data.data.posts);

  let { userData } = useContext(AuthContext);
  return (
    <div>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,.06)] sm:rounded-[28px]">
        <div className="group/cover relative h-44 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)] sm:h-52 lg:h-60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(255,255,255,.14)_0%,rgba(255,255,255,0)_36%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(186,230,253,.22)_0%,rgba(186,230,253,0)_44%)]" />
          <div className="absolute -left-16 top-10 h-36 w-36 rounded-full bg-white/8 blur-3xl" />
          <div className="absolute right-8 top-6 h-48 w-48 rounded-full bg-[#c7e6ff]/10 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/25 to-transparent" />
          <div className="pointer-events-none absolute right-2 top-2 z-10 flex max-w-[90%] flex-wrap items-center justify-end gap-1.5 opacity-100 transition duration-200 sm:right-3 sm:top-3 sm:max-w-none sm:gap-2 sm:opacity-0 sm:group-hover/cover:opacity-100 sm:group-focus-within/cover:opacity-100">
            <label className="pointer-events-auto inline-flex cursor-pointer items-center gap-1 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={13}
                height={13}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-camera"
                aria-hidden="true"
              >
                <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
                <circle cx={12} cy={13} r={3} />
              </svg>
              Add cover
              <input accept="image/*" className="hidden" type="file" />
            </label>
          </div>
        </div>
        <div className="relative -mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 sm:pb-6">
          <div className="rounded-3xl border border-white/60 bg-white/92 p-5  backdrop-blur-xl sm:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <div className="flex items-end gap-4">
                  <div className="group/avatar relative shrink-0">
                    <button
                      type="button"
                      className="cursor-zoom-in rounded-full"
                    >
                      <img
                        className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-[#dbeafe]"
                        src={userData?.photo}
                      />
                    </button>
                    <button
                      type="button"
                      className="absolute bottom-1 left-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#1877f2] opacity-100 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:bg-slate-50 sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100"
                      title="View profile photo"
                      aria-label="View profile photo"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-expand"
                        aria-hidden="true"
                      >
                        <path d="m15 15 6 6" />
                        <path d="m15 9 6-6" />
                        <path d="M21 16v5h-5" />
                        <path d="M21 8V3h-5" />
                        <path d="M3 16v5h5" />
                        <path d="m3 21 6-6" />
                        <path d="M3 8V3h5" />
                        <path d="M9 9 3 3" />
                      </svg>
                    </button>
                    <label className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#1877f2] text-white opacity-100 shadow-sm transition duration-200 hover:bg-[#166fe5] sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={17}
                        height={17}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-camera"
                        aria-hidden="true"
                      >
                        <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
                        <circle cx={12} cy={13} r={3} />
                      </svg>
                      <input accept="image/*" className="hidden" type="file" />
                    </label>
                  </div>
                  <div className="min-w-0 pb-1">
                    <h2 className="truncate text-2xl font-black tracking-tight text-slate-900 sm:text-4xl" />
                    <p className="mt-1 text-lg font-semibold text-slate-500 sm:text-xl">
                      {userData?.name}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d7e7ff] bg-[#eef6ff] px-3 py-1 text-xs font-bold text-[#0b57d0]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={13}
                        height={13}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-users"
                        aria-hidden="true"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <circle cx={9} cy={7} r={4} />
                      </svg>
                      Route Posts member
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid w-full grid-cols-3 gap-2 lg:w-130">
                <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                    Followers
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                    {userData?.followersCount}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                    Following
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                    {userData?.followingCount}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                    Bookmarks
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                    {userData?.bookmarksCount}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-extrabold text-slate-800">About</h3>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <p className="flex items-center gap-2">
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
                      className="lucide lucide-mail text-slate-500"
                      aria-hidden="true"
                    >
                      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                      <rect x={2} y={4} width={20} height={16} rx={2} />
                    </svg>
                    {userData?.email}
                  </p>
                  <p className="flex items-center gap-2">
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
                      className="lucide lucide-users text-slate-500"
                      aria-hidden="true"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <circle cx={9} cy={7} r={4} />
                    </svg>
                    Active on Route Posts
                  </p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
                    My posts
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-900">{data?.data.data.posts.length ?? 0}</p>
                </div>
                <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
                    Saved posts
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-900">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            {data?.data.data.posts.map((post) => {return <PostCard  post = {post}/>})}
          </div>
        </div>
      </section>
    </div>
  );
}
