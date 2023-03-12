import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import { Paper } from "@mui/material";
import css from "./Edit.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ToDoList() {
  //   const paperStyle = { padding: "50px 20px", width: 500, margin: "20px auto" };
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [todo, setToDo] = useState("");
  const ToDo = { name, content };
  const { id } = useParams();

  // const onInputChange = (e) => {
  //   setToDo({ ...toDo, [e.target.name]: e.target.value });
  // };

  // const

  let navigate = useNavigate();

  //let

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/api/add/${id}`);
    setToDo(result.data);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/add/${id}`, ToDo);
    navigate("/");
    // <Link to="/"></Link>;
  };

  useEffect(() => {
    loadUser();
  });

  return (
    <Container>
      <Paper>
        <h1>
          <u>Edit ToDo</u>
        </h1>
        <div>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 5, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              className={css.text}
              id="standard-basic"
              label="Name"
              variant="standard"
              fullWidth
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              className={css.text}
              id="cssstandard-basic"
              label="Content"
              variant="standard"
              fullWidth
              value={content || ""}
              onChange={(e) => setContent(e.target.value)}
            />
          </Box>
          <div className="btn_btn">
            <Link className="btn btn-outline-primary mx-2" to="/">
              {" "}
              <Button className="btn" variant="contained" color="error">
                Cancel
              </Button>
            </Link>

            <Button
              className="btn"
              variant="contained"
              color="success"
              onClick={updateUser}
            >
              수정
            </Button>
          </div>
        </div>
      </Paper>
    </Container>
  );
}
