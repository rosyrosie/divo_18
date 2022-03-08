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
import Rank from "@/routes/Rank";
import Community from "@/routes/Community";
import ViewPlaceRank from "@/routes/ViewPlaceRank";
import FindIdPw from "@/routes/FindIdPw";
import Inspection from "@/components/errorPage/Inspection";
import LoginRequired from "@/components/errorPage/LoginRequired";
import CorpRequired from "@/components/errorPage/CorpRequired";

export default function App(){

  const routes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/keyword-analysis', element: <LoginRequired /> },
        { path: '/keyword-analysis/keyword=:keyword', element: <LoginRequired /> },
        { path: '/sales-analysis', element: <LoginRequired /> },
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <Signup /> },
        { path: '/rank', element: <LoginRequired /> },
        { path: '/community', element: <LoginRequired /> },
        { path: '/vp-rank', element: <LoginRequired /> },
        { path: '/findidpw', element: <FindIdPw /> }
      ],
    },
    {
      path: '/cid=:corpId',
      element: <Layout />,
      children: [
        { path: '/cid=:corpId/keyword-analysis', element: <KeywordAnalysisBlank /> },
        { path: '/cid=:corpId/keyword-analysis/keyword=:keyword', element: <KeywordAnalysis /> },
        { path: '/cid=:corpId/sales-analysis', element: <SalesAnalysis /> },
        { path: '/cid=:corpId/corp-management', element: <CorpManagement /> },
        { path: '/cid=:corpId/corp-addition', element: <CorpAddition /> },
        { path: '/cid=:corpId/keyword-admin', element: <KeywordAdmin /> },
        { path: '/cid=:corpId/corp-auth', element: <CorpAuth /> },
        { path: '/cid=:corpId/sync-ys', element: <SyncYeoshin /> },
        { path: '/cid=:corpId/rank', element: <Rank /> },
        { path: '/cid=:corpId/community', element: <Community /> },
        { path: '/cid=:corpId/vp-rank', element: <ViewPlaceRank /> },
      ]
    },
    {
      path: '/',
      element: <Layout sticky />,
      children: [
        { index: true, element: <Home /> },
      ],
    },
    {
      path: '/cid=:corpId',
      element: <Layout sticky />,
      children: [
        { index: true, element: <Home /> },
      ]
    },
  ];

  return useRoutes(routes);
}