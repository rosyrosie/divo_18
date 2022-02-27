import { useRoutes } from "react-router-dom";
import Layout from "@/components/layouts/Layout";
import CorpAddition from "@/routes/CorpAddition";
import CorpManagement from "@/routes/CorpManagement";
import Home from "@/routes/Home";
import KeywordAnalysis from "@/routes/KeywordAnalysis";
import KeywordAnalysisBlank from "@/routes/KeywordAnalysisBlank";
import Login from "@/routes/Login";
import SalesAnalysis from "@/routes/SalesAnalysis";
import Signup from "@/routes/Signup";
import KeywordAdmin from "@/routes/KeywordAdmin";
import CorpAuth from "@/routes/CorpAuth";
import SyncYeoshin from "@/routes/SyncYeoshin";

export default function App(){

  const routes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: '/keyword-analysis', element: <KeywordAnalysisBlank /> },
        { path: '/keyword-analysis/keyword=:keyword', element: <KeywordAnalysis /> },
        { path: '/sales-analysis', element: <SalesAnalysis /> },
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <Signup /> },
      ],
    },
    {
      path: '/cid=:corpId',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: '/cid=:corpId/keyword-analysis', element: <KeywordAnalysisBlank /> },
        { path: '/cid=:corpId/keyword-analysis/keyword=:keyword', element: <KeywordAnalysis /> },
        { path: '/cid=:corpId/sales-analysis', element: <SalesAnalysis /> },
        { path: '/cid=:corpId/corp-management', element: <CorpManagement /> },
        { path: '/cid=:corpId/corp-addition', element: <CorpAddition />},
        { path: '/cid=:corpId/keyword-admin', element: <KeywordAdmin />},
        { path: '/cid=:corpId/corp-auth', element: <CorpAuth />},
        { path: '/cid=:corpId/sync-ys', element: <SyncYeoshin />}
      ]
    }
  ];

  return useRoutes(routes);
}