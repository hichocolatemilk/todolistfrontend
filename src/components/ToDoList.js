import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import { Paper } from "@mui/material";
import css from "./ToDoList.module.css";

export default function ToDoList() {
  const paperStyle = { padding: "50px 20px", width: 500, margin: "20px auto" };
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [ToDos, setToDos] = useState([]);

  // const

  const handleClick = (e) => {
    const ToDo = { name, content };
    fetch("http://localhost:8080/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ToDo),
    }).then(() => {
      console.log("NEW TODO ADD");
    });
    // e.preventDefault();
    window.location.reload();
  };
  const deleteUser = (id) => {
    fetch(`http://localhost:8080/api/add/${id}`, {
      method: "DELETE",
    });
    window.location.reload();
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/getall")
      .then((response) => response.json())
      .then((result) => {
        setToDos(result);
      });
  }, []);

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
          {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" /> */}

          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            fullWidth
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Content"
            variant="standard"
            fullWidth
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
            // TextField.PropTypes = {
            //   name: propTypes.String.isRequired,
            // };
          />

          <Button
            disabled={!name || !content}
            variant="contained"
            color="success"
            onClick={handleClick}
          >
            확인
          </Button>
          {/* <Button variant="outlined" color="error">
            삭제m
          </Button> */}
        </Box>
      </Paper>

      <Paper elevation={3} style={paperStyle}>
        <h1>
          <u>오늘의 할 일</u>
        </h1>
        {ToDos.map((ToDo) => (
          <Paper key={ToDo.id} className={css.ToDo}>
            Name: {ToDo.name} Content: {ToDo.content}
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
                onClick={handleClick}
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
