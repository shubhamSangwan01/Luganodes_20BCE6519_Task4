import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import axios from "axios";
import Web3 from "web3";

const Login = ({ formType, setFormType }) => {
  const navigate = useNavigate();
  const [login, setlogin] = React.useState({
    email: "",
    password: "",
  });
  const [signup, setsignup] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isConnected, setIsConnected] = React.useState(false);
  const [ethBalance, setEthBalance] = React.useState("");

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        console.log(web3.eth, userAccount);
        const account = userAccount[0];
        console.log(account);
        let ethBalance = await web3.eth.getBalance(account);
        setEthBalance(ethBalance);
        sessionStorage.setItem("UserMetaMaskId", account);
        const res = await axios.post(
          "https://luganodes20bce6519task4-production.up.railway.app/eth",
          { account }
        );

        if (res.status === 202 || res.status === 200) {
          alert(res.data.message);
          setTimeout(() => navigate("/dashboard"), 2000);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setlogin({
      ...login,
      [name]: value,
    });
  };
  const handleSignupChange = (e) => {
    const { name, value } = e.target;

    setsignup({
      ...signup,
      [name]: value,
    });
  };
  console.log(login, signup);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!login.email || !login.password) {
      alert("Enter full details");
    }
    try {
      axios
        .post("https://luganodes20bce6519task4-production.up.railway.app/login", {
          user: login,
        })
        .then((response) => {
          if (response.data.status === "ok") {
            localStorage.setItem("token", response.data.token);

            alert(response.data.message);
            setTimeout(() => navigate("/dashboard"), 2000);
          } else {
            alert(response.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (
      !signup.name ||
      !signup.email ||
      !signup.password ||
      !signup.confirmPassword
    ) {
      alert("Enter full details");
    } else if (signup.password !== signup.confirmPassword) {
      alert("Passwords Dont Match");
    } else if (signup.password.length < 6) {
      alert("Password must be atleast 6 characters long");
    } else {
      const newUser = {
        name: signup.name,
        email: signup.email,
        password: signup.password,
      };

      await axios
        .post(
          "https://luganodes20bce6519task4-production.up.railway.app/register",
          newUser
        )
        .then((response) => {
          alert(response.data.message);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        });
    }
  };

  return (
    <div className="container">
      <div class="navBar_container">
        <div class="navBar">
          <ul>
            <img src="/images/logo.webp" alt="logo" />
            <div>
              <li
                onClick={() => {
                  setFormType("login");
                }}
              >
                <span>Login</span>
              </li>
              <li
                onClick={() => {
                  setFormType("signup");
                }}
              >
                <span>Sign Up</span>
              </li>
            </div>
          </ul>
        </div>
      </div>
      {formType === "login" && (
        <form
          style={{ height: "fitContent", width: 300 }}
          onSubmit={handleLogin}
        >
          <h1>User Login</h1>
          <ul className="loginForm__list">
            <li className="loginForm__input">
              <input
                type="email"
                name="email"
                onChange={handleLoginChange}
                value={login.email}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Email"
              />
            </li>
            <li className="loginForm__input">
              <input
                type="password"
                value={login.password}
                onChange={handleLoginChange}
                className="form-control"
                name="password"
                placeholder="Enter Password"
              />
            </li>
            <Link to='/forget'>
            <li id="loginForm__resetPassword">
              <span>Reset Password ?</span>
            </li></Link>
            <li id="loginForm__signIn">
              <button type="submit">Sign In</button>
            </li>
            <li id="loginForm__line__li">
              <div className="loginForm__line"></div>
              <span>Or continue with</span>
              <div className="loginForm__line"></div>
            </li>
            <li id="loginForm__buttons">
              <ul className="loginForm__buttons__list">
                <li id="google">
                  <img
                    src="/images/google.png"
                    alt="Google"
                    onClick={console.log("google")}
                  />
                </li>
                {!isConnected && (
                  <li id="metamask">
                    <img
                      src="/images/metamask.png"
                      alt="metamask"
                      onClick={onConnect}
                    />
                    {/* <button type="button" className="app-button__login" onClick={onConnect}>
                Login
                </button> */}
                  </li>
                )}
                <li id="facebook">
                  <img
                    src="/images/facebook.png"
                    alt="Facebook"
                    onClick={console.log("facebook")}
                  />
                </li>
              </ul>
            </li>
          </ul>
        </form>
      )}
      {formType === "signup" && (
        <form
          style={{ height: "fitContent", width: 300 }}
          onSubmit={handleSignup}
        >
          <h1>User Sign Up</h1>
          <ul className="loginForm__list">
            <li className="loginForm__input">
              <input
                type="text"
                name="name"
                onChange={handleSignupChange}
                value={signup.name}
                className="form-control"
                placeholder="Enter Email"
              />
            </li>
            <li className="loginForm__input">
              <input
                type="email"
                name="email"
                onChange={handleSignupChange}
                value={signup.email}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Email"
              />
            </li>
            <li className="loginForm__input">
              <input
                type="password"
                value={signup.password}
                onChange={handleSignupChange}
                className="form-control"
                name="password"
                placeholder="Enter Password"
              />
            </li>
            <li className="loginForm__input">
              <input
                type="password"
                value={signup.confirmPassword}
                onChange={handleSignupChange}
                className="form-control"
                name="confirmPassword"
                placeholder="Re-enter Password"
              />
            </li>
            <li id="loginForm__signIn">
              <button type="submit">Sign Up</button>
            </li>
            <li id="loginForm__line__li">
              <div className="loginForm__line"></div>
              <span>Or continue with</span>
              <div className="loginForm__line"></div>
            </li>
            <li id="loginForm__buttons">
              <ul className="loginForm__buttons__list">
                <li id="google">
                  <img
                    src="/images/google.png"
                    alt="Google"
                    onClick={console.log("google")}
                  />
                </li>

                <li id="facebook">
                  <img
                    src="/images/facebook.png"
                    alt="Facebook"
                    onClick={console.log("facebook")}
                  />
                </li>
              </ul>
            </li>
          </ul>
        </form>
      )}
    </div>
  );
};

export default Login;
