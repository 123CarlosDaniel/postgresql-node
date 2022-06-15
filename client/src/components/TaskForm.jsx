import {
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Collapse,
  Alert,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TaskForm = () => {
  const [open, setOpen] = useState(false);
  const [edditing, setEdditing] = useState(false)
  const [openError, setOpenError] = useState(false)
  const navigate = useNavigate()
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const params = useParams()
  const handleChange = (e) =>setTask({ ...task, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edditing) {
      fetch(`http://localhost:4000/api/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: task.title,
          descripcion: task.description,
        })
      })
        .then(()=> {
          navigate("/")
        })
        .catch((err) => console.log(err))
    } else {
      fetch("http://localhost:4000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: task.title,
        descripcion: task.description,
      }),
    }).catch((err) => console.log(err));
    setTask({
      title: "",
      description: "",
    });
    setOpen(true)
    }
  };

  useEffect(() => {
    if(params.id) {
      fetch(`http://localhost:4000/api/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setTask({
          title: data.titulo,
          description: data.descripcion,
        });
        setEdditing(true)
      })
      .catch((err) => {
        console.log(err)
        setOpenError(true)
      });
    }
  },[params.id])
  return (
    <Grid
      container
      direction={"column"}
      alignItems="center"
      justifyContent={"center"}
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5, p: 3 }}
          style={{
            backgroundColor: "#1e272e",
          }}
        >
          <Typography
            variant="h5"
            textAlign={"center"}
            sx={{ display: "block" }}
            color="white"
          >
            { edditing ? "Editar":"Crear"} tarea
          </Typography>
          <CardContent sx={{ px: 0 }}>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <TextField
                variant="filled"
                color="success"
                label="Escribe el título"
                name="title"
                value={task.title}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                onChange={handleChange}
              />
              <TextField
                variant="filled"
                color="success"
                label="Descripción"
                multiline
                name="description"
                value={task.description}
                rows={4}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                onChange={handleChange}
              />
              <Button variant="contained" color="success" type="submit" disabled={openError}>
                Guardar
              </Button>
            </form>
          </CardContent>
        </Card>

        <Box sx={{ width: "100%" ,marginTop:"2rem"}}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {edditing ?"Editado":"Subido"} satisfactoriamente
            </Alert>
          </Collapse>
          { openError && (
            <Collapse in={openError}>
            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              No existe el elemento
            </Alert>
          </Collapse>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default TaskForm;
