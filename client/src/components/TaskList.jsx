import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TaskElement from "./TaskElement";

const TaskList = () => {
  const url = "http://localhost:4000/api";
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });

    return () => {
      console.log("cleanup");
    };
  }, []);

  return (
    <Container sx={{ pt: 3 }}>
      <Typography variant="h5" textAlign={"center"}>
        TaskList
      </Typography>
      <Box mt={4} textAlign="center">
        {data.map((task) => {
          return (
            <TaskElement
              title={task.titulo}
              id={task.id}
              description={task.descripcion}
              key={task.id}
              data={data}
              setData={setData}
            ></TaskElement>
          );
        })}
      </Box>
    </Container>
  );
};

export default TaskList;
