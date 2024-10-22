import CarList from "./components/CarList";
import { Container, Toolbar, AppBar, Typography } from "@mui/material";
import "./App.css";

function App() {
  return (
    <Container maxWidth="xl">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Car Shop</Typography>
        </Toolbar>
      </AppBar>
      <CarList />
    </Container>
  );
}

export default App;
