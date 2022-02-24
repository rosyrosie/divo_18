import { BrowserRouter, Route, Routes } from "react-router-dom";
import CorpManagement from "./routes/CorpManagement";
import Home from "./routes/Home";
import KeywordAnalysis from "./routes/KeywordAnalysis";
import KeywordAnalysisBlank from "./routes/KeywordAnalysisBlank";
import Login from "./routes/Login";
import SalesAnalysis from "./routes/SalesAnalysis";
import Signup from "./routes/Signup";
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/corp-management" element={<CorpManagement />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
