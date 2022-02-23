import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import KeywordAnalysis from "./routes/KeywordAnalysis";
import KeywordAnalysisBlank from "./routes/KeywordAnalysisBlank";
import SalesAnalysis from "./routes/SalesAnalysis";
import GlobalStyles from "./styles/GlobalStyles";

export default function App(){
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/keyword-analysis" element={<KeywordAnalysisBlank />} />
          <Route path="/keyword-analysis/keyword=:keyword" element={<KeywordAnalysis />} />
          <Route path="/sales-analysis" element={<SalesAnalysis />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
