import HomeView from "./components/views/Home";
import Header from "./components/patterns/Header/Header";
import { createTheme } from "@mui/material";

const theme = createTheme();

function App() {
  return (
    <>
      <Header />
      <HomeView />
    </>
  );
}

export default App;
