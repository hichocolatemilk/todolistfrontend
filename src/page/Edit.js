import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import { Paper } from "@mui/material";
import css from "./Edit.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ToDoList() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const ToDo = { name, content };
  const { id } = useParams();

  // const

  let navigate = useNavigate();

  //let

  function onHome() {
    navigate("/");
  }

  const updateUser = async () => {
    await axios.put(`/api/add/${id}`, ToDo, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    });
    navigate("/");
  };

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
            <Button
              className="btn"
              variant="contained"
              color="error"
              onClick={onHome}
            >
              Cancel
            </Button>

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
