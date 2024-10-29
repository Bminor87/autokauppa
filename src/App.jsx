import CarList from "./components/CarList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container, Toolbar, AppBar, Typography } from "@mui/material";
import "./App.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth="xl">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Car Shop</Typography>
          </Toolbar>
        </AppBar>
        <CarList />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
