import { zodResolver } from "@hookform/resolvers/zod";
import { createLazyRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { FaMinusCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook } from "react-icons/im";
import { z } from "zod";
import "../styles/login.css";

// Define the validation schema using Zod
const schema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
});

export const Route = createLazyRoute("/login")({
  component: Login,
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: { email: string; password: string }) => {
    // Handle form submission here
    console.log(data);
  };

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div
        className="bg-image max-h-[33vh] min-h-[33vh] w-full flex-shrink-0 bg-cover bg-center"
        role="img"
        aria-label="Rainforest"
      ></div>
      <div className="mt-[-12%] flex w-[40%] flex-grow flex-col rounded-lg bg-white p-8">
        <div className="shadow-bottom mb-4 mt-2 flex h-16">
          <img
            src="/amazon.png"
            alt="Amazon Logo"
            className="mx-auto my-auto w-24 pt-2"
          />
        </div>
        <div className="mx-24 border-b-[1px] border-b-gray-800">
          <h1 className="pt-2 text-center text-4xl font-normal text-green-600">
            Login
          </h1>
          <img
            src="/tree.png"
            alt="Tree"
            className="mx-auto my-auto w-56 pt-8"
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-24 mt-8 flex flex-col space-y-6"
        >
          <input
            type="text"
            placeholder="Email"
            {...register("email")}
            className={`text-regular border-b-2 p-2 text-lg ${errors.email ? "border-red-500" : "border-gray-300"} text-green-600 placeholder-green-600`}
          />
          {errors.email && (
            <p className="flex items-center text-sm text-red-500">
              <span className="pr-2 text-red-500">
                <FaMinusCircle />
              </span>
              {errors.email.message}
            </p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={`text-regular mb-2 border-b-2 p-2 text-lg ${errors.password ? "border-red-500" : "border-gray-300"} text-green-600 placeholder-green-600`}
          />
          {errors.password && (
            <p className="flex items-center text-sm text-red-500">
              <span className="pr-2 text-red-500">
                <FaMinusCircle />
              </span>
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="text-regular w-full rounded-full bg-green-600 py-4 text-lg text-white"
          >
            Sign In
          </button>
          <div className="flex justify-between text-sm font-semibold">
            <a href="#" className="text-black">
              Forgot Password?
            </a>
            <a href="#" className="text-pink-700">
              New User? Sign Up.
            </a>
          </div>
          <p className="text-center text-sm font-semibold text-gray-600">or</p>
          <button className="mb-2 flex w-full items-center bg-blue-500 font-semibold text-white">
            <div className="my-2 ml-2 rounded-md bg-white p-1 text-2xl">
              <FcGoogle />
            </div>
            <div className="mx-auto flex">LOGIN WITH GOOGLE</div>
          </button>
          <button className="mb-2 flex w-full items-center bg-blue-500 font-semibold capitalize text-white">
            <div className="my-2 ml-2 justify-end rounded-md bg-white py-1 pl-2 pr-0 text-2xl text-blue-500">
              <ImFacebook />
            </div>
            <div className="mx-auto flex">LOGIN WITH FACEBOOK</div>
          </button>
        </form>
      </div>
    </div>
  );
}
