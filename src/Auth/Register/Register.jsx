import React, { useContext, useState } from "react";
import { Button } from "@heroui/react";
import { Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { email, refine } from "zod/v4";
import { schema } from "../../schema/SchemaRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";
import Login from "../Login/Login";

export default function Register() {
  let { setuserToken } = useContext(AuthContext);

  // error el response lel account
  const [apiError, setapiError] = useState(null);
  //tn2ol user
  let navigate = useNavigate();
  //loading for response
  const [isLoading, setisLoading] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  function submitForm(userdata) {
    setisLoading(true);

    console.log(userdata);
    // call API
    axios
      .post("https://route-posts.routemisr.com/users/signup", userdata)
      .then((response) => {
        console.log(response.data.data.token);

        if (response.data.message === "account created") {
          setuserToken(response.data.data.token);
          // save el token
          localStorage.setItem("token", response.data.data.token);
          // navigate to login
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);

        setapiError(error.response.data.message);
      })
      .finally(() => {
        setisLoading(false);
      });
  }

  return (
    <div className="bg-gray-200 min-h-screen p-3 mt-4">
      <div className="w-1/2 bg-white rounded-md mx-auto p-5">
        <div className="w-fit m-auto px-3">
          <ul className="flex gap-3 justify-center border-2 rounded-4xl">
            <li className="rounded-4xl">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block p-3 rounded-4xl transition-colors ${
                    isActive ? "bg-blue-600 text-white" : "text-black"
                  }`
                }
              >
                <h4>sign Up</h4>
              </NavLink>
            </li>

            <li className="rounded-4xl">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `block p-3 rounded-4xl transition-colors ${
                    isActive ? "bg-blue-600 text-white" : "text-black"
                  }`
                }
              >
                <h4>login</h4>
              </NavLink>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit(submitForm)}>
          {/* name */}
          <div>
            <Input
              {...register("name")}
              aria-label="Name"
              className="w-full my-4"
              placeholder="Enter your name"
            />
            {formState.errors.name && formState.touchedFields.name ? (
              <p className="bg-gray-200 text-red-400 py-2 text-center">
                {formState.errors.name?.message}
              </p>
            ) : null}
          </div>

          {/* username */}
          <div>
            <Input
              {...register("username")}
              aria-label="username"
              className="w-full my-4"
              placeholder="Enter your username"
            />
            {formState.errors.username && formState.touchedFields.username ? (
              <p className="bg-gray-200 text-red-400 py-2 text-center">
                {formState.errors.username?.message}
              </p>
            ) : null}
          </div>

          {/*email  */}
          <div>
            <Input
              {...register("email")}
              aria-label="Email"
              className="w-full my-4"
              placeholder="Enter your email"
            />
            {formState.errors.email && formState.touchedFields.email ? (
              <p className="bg-gray-200 text-red-400 py-2 text-center">
                {formState.errors.email?.message}
              </p>
            ) : null}
          </div>

          {/* password */}
          <div>
            <Input
              {...register("password")}
              type="password"
              aria-label="password"
              className="w-full my-4"
              placeholder="Enter your password"
            />
            {formState.errors.password && formState.touchedFields.password ? (
              <p className="bg-gray-200 text-red-400 py-2 text-center">
                {formState.errors.password?.message}
              </p>
            ) : null}
          </div>

          {/* repassword */}
          <div>
            <Input
              {...register("rePassword")}
              type="password"
              aria-label="repassword"
              className="w-full my-4"
              placeholder="Enter your password"
            />
            {formState.errors.rePassword &&
            formState.touchedFields.rePassword ? (
              <p className="bg-gray-200 text-red-400 py-2 text-center">
                {formState.errors.rePassword?.message}
              </p>
            ) : null}
          </div>

          <div className="flex gap-3">
            {/* birth data */}
            <div className="w-full">
              <Input
                {...register("dateOfBirth")}
                type="date"
                aria-label="dateOfBirth"
                className="w-full my-4"
                placeholder="Enter your date of birth"
              />
              {formState.errors.dateOfBirth &&
              formState.touchedFields.dateOfBirth ? (
                <p className="bg-gray-200 text-red-400 py-2 text-center">
                  {formState.errors.dateOfBirth?.message}
                </p>
              ) : null}
            </div>

            {/* gender */}
            <div className="w-full">
              <select
                {...register("gender")}
                defaultValue={"choose a geneder"}
                className="block w-full my-3 px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-2xl focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
              >
                <option value="female"> female</option>
                <option value="male">male</option>
              </select>
              {formState.errors.gender && formState.touchedFields.gender ? (
                <p className="bg-gray-200 text-red-400 py-2 text-center">
                  {formState.errors.gender?.message}
                </p>
              ) : null}
            </div>
          </div>

          {apiError && (
            <div className="bg-red-300 text-white text-center font-bold py-2 my-3 rounded-lg">
              {" "}
              {apiError}
            </div>
          )}

          <Button type="submit" isDisabled={isLoading} className="my-4 w-full ">
            {isLoading ? "loading" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
