import HomeView from "./components/views/Home";
import Header from "./components/patterns/Header/Header";
import AppThemeProvider from "./context/theme/theme";

function App() {
  return (
    <AppThemeProvider>
      <Header />
      <HomeView />
    </AppThemeProvider>
  );
}

export default App;
