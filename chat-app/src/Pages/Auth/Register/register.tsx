import { Link, useNavigate } from "@tanstack/react-router";
import LayoutWrapper from "../../../Components/LayoutWrapper";
import imageBG from "../../../assets/bg-image.jpg";
import Button from "../../../Components/button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { handleRegister } from "../../../Api/api-function";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: handleRegister,
    onSuccess: (response) => {
      console.log(response);
      navigate({ to: "/login", from: "/register" });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const registerUser = () => {
    mutate({ email, password, username });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "username") setUsername(value);
  };
  
  if (isPending) {
    return <h1>Loading...</h1>;
  }

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
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Enter username"
          />
          <input
            className="text-inputColor h-14 w-96 rounded-md border-indigo-600 bg-inputBG text-lg outline-none"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          <input
            className="text-inputColor h-14 w-96 rounded-md border-indigo-600 bg-inputBG text-lg outline-none"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter Password"
          />
          <Link to="/login" className="absolute top-64">
            <span className="text-md font-medium text-white underline">
              Login
            </span>
          </Link>

          <Button text="Register" position="center" onClick={registerUser} />
        </div>
      </section>
    </LayoutWrapper>
  );
};

export default Register;
