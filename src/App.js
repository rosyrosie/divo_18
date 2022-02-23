import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import KeywordAnalysis from "./routes/KeywordAnalysis";
import GlobalStyles from "./styles/GlobalStyles";

export default function App(){
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/keyword-analysis/keyword=:keyword" element={<KeywordAnalysis />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
