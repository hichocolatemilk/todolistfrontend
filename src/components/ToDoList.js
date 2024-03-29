import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import { Paper } from "@mui/material";
import css from "./ToDoList.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ToDoList() {
  const paperStyle = { padding: "50px 20px", width: 500, margin: "20px auto" };
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [ToDos, setToDos] = useState([]);
  const ToDo = { name, content };

  // const

  let navigate = useNavigate();

  //let

  const postUser = async () => {
    await axios
      .post("/api/add", ToDo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          withCredentials: true,
        },
      })
      .then((result) => {
        console.log(result.data.Authorization);
      });

    window.location.reload();
  };

  const deleteUser = async (id) => {
    await axios.delete(`/api/add/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        withCredentials: true,
      },
    });
    loadUser();
    window.location.reload();
  };

  const loadUser = async () => {
    const result = await axios.get("/api/getall", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        withCredentials: true,
      },
    });
    setToDos(result.data);
  };
  useEffect(() => {
    loadUser();
  }, []);

  const onEdit = (id) => {
    navigate(`/edittodo/${id}`);
  };

  return (
    <Container>
      <Paper elevation={3}>
        <h1>
          <u>Add ToDo</u>
        </h1>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "20ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            fullWidth
            value={name || ""}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Content"
            variant="standard"
            fullWidth
            value={content || ""}
            required
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            disabled={!name || !content}
            variant="contained"
            color="success"
            onClick={postUser}
          >
            확인
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3} style={paperStyle}>
        <h1>
          <u>오늘의 할 일</u>
        </h1>
        {ToDos.map((ToDo) => (
          <Paper key={ToDo.id} className={css.ToDo}>
            ID: {ToDo.id} Name: {ToDo.name} Content: {ToDo.content}
            <div className={css.btn}>
              <Button
                className="btn"
                variant="contained"
                color="error"
                onClick={() => deleteUser(ToDo.id)}
              >
                Delete
              </Button>

              <Button
                className="btn"
                variant="contained"
                color="success"
                onClick={() => onEdit(ToDo.id)}
              >
                Edit
              </Button>
            </div>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
