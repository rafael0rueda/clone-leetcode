import { authModalState } from "@/atoms/authModelAtom";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebse";
import { useRouter } from "next/router";

type SingUpProps = {};

const SingUp: React.FC<SingUpProps> = () => {
  const setAuthMOdalState = useSetRecoilState(authModalState);
  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthMOdalState((prev) => ({ ...prev, type }));
  };
  //Calls router
  const router = useRouter();
  // Handle the inputs of the user
  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  // Firebase hook for Authentication
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.displayName || !inputs.email || !inputs.password)
      return alert("Please fill all the fields");
    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
      <h3 className="text-x1 font-medium text-white">Register to LeetClone</h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Email
        </label>
        <input
          onChange={handleChangeInput}
          type="email"
          name="email"
          id="email"
          className="
              boder-2 outline-none sm:text-sm rounded-lg focus:border-blue-500 block w-full p-2.5
              bg-gray-300 border-gray-500 placeholder-gray-500 text-white
              "
          placeholder="example@email.com"
        />
      </div>
      <div>
        <label
          htmlFor="displayName"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Display Name
        </label>
        <input
          type="displayName"
          name="displayName"
          id="displayName"
          className="
              boder-2 outline-none sm:text-sm rounded-lg focus:border-blue-500 block w-full p-2.5
              bg-gray-300 border-gray-500 placeholder-gray-500 text-white
              "
          placeholder="Joe Doe"
          onChange={handleChangeInput}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="
              boder-2 outline-none sm:text-sm rounded-lg focus:border-blue-500 block w-full p-2.5
              bg-gray-300 border-gray-500 placeholder-gray-500 text-white
              "
          placeholder="**********"
          onChange={handleChangeInput}
        />
      </div>
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg
          text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <div className="text-sm font-medium text-gray-200">
        Aready have an account?{" "}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={() => handleClick("login")}
        >
          Log In
        </a>
      </div>
    </form>
  );
};
export default SingUp;
