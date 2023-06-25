import Login from "./components/login-page/login";
import Register from "./components/register-page/register";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/layout";

function App() {
  return (
    <BrowserRouter>
      <Box
        bgImage={"background.jpg"}
        height={"100vh"}
        width={"100vw"}
        w="100%"
        bgRepeat="no-repeat"
        backgroundPosition="center"
        backgroundSize="cover"
      >
        <Routes>
          <Route exact path="/" Component={Login} />
          <Route exact path="/register" Component={Register} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
