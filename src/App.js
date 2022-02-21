import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import GlobalStyles from "./styles/GlobalStyles";

export default function App(){
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
