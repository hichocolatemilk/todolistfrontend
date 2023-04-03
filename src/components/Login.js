import logo from "../img/logo.svg";
import css from "./Login.module.css";
import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { setCookie } from "./Cookie";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = { username, password };
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const register = async () => {
    await axios.post("/api/auth/register", user);
  };

  const authenticate = async () => {
    try {
      const result = await axios.post("/api/auth/authenticate", user, {
        withCredentials: true,
      });
      const jwtToken = result.data;
      if (jwtToken) {
        setCookie("accesstoken", JSON.stringify(jwtToken), {
          path: "/",
          secure: true,
          httpOlny: true,
          samesite: "none",
        });
        localStorage.setItem("accesstoken", jwtToken.token);
        window.location.reload();
      }
    } catch {
      alert("로그인이 실패했습니다. 정보가 올바른지 다시 확인해주세요");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React
        </a>

        <div className="container">
          <form>
            <div className={css.login_form}>
              <input
                type={"text"}
                placeholder="username"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
              <input
                type={"text"}
                placeholder="password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <button type="button" onClick={authenticate}>
                {" "}
                로그인{" "}
              </button>
              <button type="button" onClick={() => setModalIsOpen(true)}>
                Sign Up
              </button>
              <Modal isOpen={modalIsOpen} ariaHideApp={false}>
                <div className="modal_container">
                  <form>
                    <input
                      type={"text"}
                      placeholder="username"
                      value={username || ""}
                      onChange={(e) => setUsername(e.target.value)}
                    ></input>
                    <input
                      type={"text"}
                      placeholder="password"
                      value={password || ""}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <button type="submit" onClick={register}>
                      {" "}
                      Submit{" "}
                    </button>
                    <button type="button" onClick={() => setModalIsOpen(false)}>
                      {" "}
                      EXIT
                    </button>
                  </form>
                </div>
              </Modal>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
}
