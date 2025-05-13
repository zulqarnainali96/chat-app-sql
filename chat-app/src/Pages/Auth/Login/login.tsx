import { Link, useNavigate } from "@tanstack/react-router";
import LayoutWrapper from "../../../Components/LayoutWrapper";
import imageBG from "../../../assets/bg-image.jpg";
import Button from "../../../Components/button";
import React, { useReducer, useState } from "react";
import { Action, initialState, reducer, State } from "../../../store/store";
import { useMutation } from "@tanstack/react-query";
import { handleLogin } from "../../../Api/api-function";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState,
  );
  const { mutate } = useMutation({
    mutationFn: handleLogin,
    onSuccess: (data) => {
      dispatch({ type: "Login", payload: data });
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "socket", payload: data });
      navigate({ to: "/dashboard", from: "/login" });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const loginUser = async () => {
    mutate({ email, password });
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  return (
    <LayoutWrapper>
      <section className="flex h-full w-full items-center justify-between">
        <div
          className="min-h-screen w-full bg-contain bg-no-repeat"
          style={{
            backgroundImage: `url(${imageBG})`,
          }}
        ></div>
        <div className="relative flex w-[39%] flex-col items-center justify-center gap-10">
          <input
            className="text-inputColor h-14 w-96 rounded-md border-indigo-600 bg-inputBG text-lg outline-none"
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={handleChange}
          />
          <input
            className="text-inputColor h-14 w-96 rounded-md border-indigo-600 bg-inputBG text-lg outline-none"
            type="password"
            name="password"
            value={password}
            placeholder="Enter Password"
            onChange={handleChange}
          />
          <Link to="/register" className="absolute top-40">
            <span className="text-md font-medium text-white underline">
              Register
            </span>
          </Link>

          <Button text="Login" position="center" onClick={loginUser} />
        </div>
      </section>
    </LayoutWrapper>
  );
};

export default Login;
