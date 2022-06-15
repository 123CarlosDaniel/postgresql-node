import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material"
import {Link, useNavigate} from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <Box >
      <AppBar position='static' color='transparent'>
        <Container>
          <Toolbar >
            <Typography variant="h5" sx={{flexGrow:1}}>
              <Link to={"/"} style={{ textDecoration:"none", color:"#eee"}}>PERN STACK</Link>
            </Typography>
            <Button variant="contained" color="success" onClick={()=>navigate("/tasks/new")}>
              New Task
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

export default Navbar