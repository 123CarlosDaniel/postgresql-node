import { Container } from "@mui/material"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Container>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/tasks/new" element={<TaskForm />} />
        <Route path="/tasks/edit/:id" element={<TaskForm />} />
      </Routes>
      </Container>
    </Router>
  )
}

export default App
