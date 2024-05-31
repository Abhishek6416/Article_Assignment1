import { Box, Typography, TextField, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER, REGISTER_USER } from "../Api/user-api";
import { loginContext } from "../context/MyContext";
const Login_Signup = () => {
  const [toggle, setToggle] = useState("register");

  console.log(setToggle);
  const initValue = {
    ...(toggle === "register" && { name: "" }),
    email: "",
    password: "",
  };

  const [formInput, setFormInput] = useState(initValue);
  const toggleDiv = (toggled) => {
    setToggle(toggled);
  };
  const handleInputChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setFormInput(initValue);
  }, [toggle]);
  const navigate = useNavigate();
  const { name, email, password } = formInput;
  // const formData = new FormData();
  // formData.append("image", file);
  // formData.append("user", JSON.stringify(formInput));
  const RegisterFormSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password)
      return alert("Please fill all the detauls..");
    console.log(formInput);
    const result = await REGISTER_USER(formInput);
    const error = result?.response?.data?.message;
    return result?.status === 200
      ? (alert("User register succesfull"),
        setToggle("login"),
        setFormInput(initValue))
      : alert(error);

  };
  const { setLoginAuth } = useContext(loginContext);
  const LoginFormSubmit = async (e) => {
    e.preventDefault();
    const result = await LOGIN_USER(formInput);
    const error = result?.response?.data?.message;
    const res = result?.data?.User;
    return result?.status === 200
      ? (alert("user login successfull"),
        navigate("/"),
        localStorage.setItem("User", JSON.stringify(res)),
        setLoginAuth(true))
      : alert(error);
  };

  return (
    <Box>
      <Box
        sx={{
          width: "25vmax",
          boxShadow: "0 0 5px grey",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1vmax",
          margin: "8rem auto",
        }}
      >
        <Typography variant="h5">
          {toggle === "register" ? "REGISTER USER" : "LOGIN USER"}
        </Typography>
        <Box sx={{ display: "flex", gap: "2vmax" }}>
          <Button
            variant={toggle === "register" ? "contained" : "outlined"}
            fullWidth
            size="small"
            sx={{ fontWeight: "600" }}
            onClick={() => toggleDiv("register")}
          >
            REGISTER
          </Button>
          <Button
            variant={toggle === "login" ? "contained" : "outlined"}
            fullWidth
            sx={{ fontWeight: "600" }}
            size="small"
            onClick={() => toggleDiv("login")}
          >
            LOGIN
          </Button>
        </Box>
        <form
          onSubmit={toggle === "login" ? LoginFormSubmit : RegisterFormSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1vmax" }}
        >
          {toggle === "register" && (
            <TextField
              type="text"
              size="small"
              label="Enter name"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          )}
          <TextField
            type="email"
            size="small"
            label="Enter email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
          <TextField
            type="password"
            size="small"
            name="password"
            value={password}
            label="Enter password"
            onChange={handleInputChange}
          />

       
          <Button
            type="submit"
            variant="contained"
            size="small"
            sx={{ fontWeight: "600" }}
          >
            {toggle === "login" ? "LOGIN" : "REGISTER"}
          </Button>
        </form>
        <Typography>
          {toggle === "login"
            ? "If don't have an account"
            : "Already have an account"}{" "}
          <Link
            style={{ textDecoration: "none" }}
            onClick={() => toggleDiv(toggle === "login" ? "register" : "login")}
          >
            {toggle === "login" ? "Register" : "Login"}
          </Link>{" "}
        </Typography>
      </Box>
    </Box>
  );
};

export default Login_Signup;
