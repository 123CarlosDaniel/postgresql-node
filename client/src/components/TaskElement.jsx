import { Button, Grid } from "@mui/material"
import { useNavigate } from "react-router-dom";
import "./styles.css";
const TaskElement = (props) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    fetch(`http://localhost:4000/api/${props.id}`, {
      method: "DELETE",
    })
    .then(() => {
      props.setData(props.data.filter((task) => task.id !== props.id))
    })
    .catch((err) => console.log(err));
  }
  return (
    <Grid container spacing={2} mt={2}>
              <Grid item xs={3} md={2}>
                <span className="grid-headers">ID</span>
                <p>{props.id}</p>
              </Grid>
              <Grid item xs={6} md={3}>
                <span className="grid-headers">Titulo</span>
                <p>{props.title}</p>
              </Grid>
              <Grid item xs={3} md={3} order={{ md:"4" }}>
                <span className="grid-headers">Acciones</span>
                <p style={{display:"flex", justifyContent:"space-around"}}>
                  <Button variant="contained" color="error" onClick={handleDelete}>Borrar</Button>
                  <Button variant="contained" color="warning" onClick={()=> navigate(`/tasks/edit/${props.id}`)}>Editar</Button>
                </p>
              </Grid>
              <Grid item xs={12} md={4} order={{md:"3"}}>
                <span className="grid-headers">Descripcion</span>
                <p>{props.description}</p>
              </Grid>
            </Grid>
  )
}

export default TaskElement