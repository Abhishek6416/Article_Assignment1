import {
  Box,
  Toolbar,
  AppBar,
  Button,
  Typography,

} from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  loadingContext,
  loginContext,
} from "../context/MyContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { loginAuth, setLoginAuth } = useContext(loginContext);

  const LoginUser = () => {
    navigate("/register-login");

  };
  const LogoutUser = () => {

    localStorage.clear();
    setLoginAuth(false);
  };
  const User = JSON.parse(localStorage.getItem("")) || "";

  const { name } = User;

  return (
    <AppBar>
      <Box sx={{ padding: "0 4rem" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {loginAuth && <Link className="link" to={"/"}>
            ALL ARTICLES
          </Link>}
          {loginAuth && (
            <Box sx={{ display: "flex", gap: "3vmax" }}>

              <Link
                className="link"
                to={"/form"}
              >
                ADD ARTICLE
              </Link>
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {loginAuth && (
              <>
                <Typography sx={{ fontWeight: "550" }}>
                  {name}
                </Typography>

              </>
            )}
            <Button
              variant="contained"
              color={loginAuth ? "error" : "secondary"}
              size="small"
              onClick={loginAuth ? LogoutUser : LoginUser}
            >
              {loginAuth ? "LOGOUT" : "LOGIN / SIGNUP"}
            </Button>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
