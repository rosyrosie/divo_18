import { BrowserRouter, Route, Routes } from "react-router-dom";
import CorpAddition from "./routes/CorpAddition";
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
          <Route path="/cid=:corpId" element={<Home />} />
          <Route path="/keyword-analysis" element={<KeywordAnalysisBlank />} />
          <Route path="/keyword-analysis/keyword=:keyword" element={<KeywordAnalysis />} />
          <Route path="/sales-analysis" element={<SalesAnalysis />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/corp-management" element={<CorpManagement />} />
          <Route path="/corp-addition" element={<CorpAddition />} />  */}
          <Route path="/cid=:corpId/keyword-analysis" element={<KeywordAnalysisBlank />} />
          <Route path="/cid=:corpId/keyword-analysis/keyword=:keyword" element={<KeywordAnalysis />} />
          <Route path="/cid=:corpId/sales-analysis" element={<SalesAnalysis />} />
          <Route path="/cid=:corpId/corp-management" element={<CorpManagement />} />
          <Route path="/cid=:corpId/corp-addition" element={<CorpAddition />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}
