import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import KeywordReport from "@/components/keywordAnalysis/KeywordReport";
import FloatingBar from "@/components/keywordAnalysis/FloatingBar";

export default function KeywordAnalysis(){
  const { keyword } = useParams();
  //const [ input, setInput ] = useState(keyword);
  const [ evalRef, evalInView ] = useInView({ threshold: 0.01 });
  const [ qtyRef, qtyInView] = useInView({ threshold: 0.01 });
  const [ ctRef, ctInView ] = useInView({ threshold: 0.01 });
  const [ userRef, userInView ] = useInView({ threshold: 0.01 });
  const [ mktRef, mktInView ] = useInView({ threshold: 0.01 });

  //useEffect(() => setInput(keyword), [keyword]);

  const activeTab = () => {
    if(evalInView) return 0;
    else if(qtyInView) return 1;
    else if(ctInView) return 2;
    else if(userInView) return 3;
    else if(mktInView) return 4;
    return -1;
  }

  return (
    <>
      {/* <S.Search>
        <S.InputBox>
          <S.Icon><i className="fas fa-search"></i></S.Icon>
          <S.Input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key==='Enter' && input ? navigate(CORP_URL + `/keyword-analysis/keyword=${input}`) : null} />
        </S.InputBox>
      </S.Search> */}
      <S.TabBox>
        <S.Tabs>
          <S.Tab isSelected={activeTab()===0}><S.Link href="#eval-radar">키워드 평가</S.Link></S.Tab>
          <S.Tab isSelected={activeTab()===1}><S.Link href="#search-qty">키워드 검색량</S.Link></S.Tab>
          <S.Tab isSelected={activeTab()===2}><S.Link href="#ctn-published">컨텐츠 발행량</S.Link></S.Tab>
          <S.Tab isSelected={activeTab()===3}><S.Link href="#user-stat">검색자 특성</S.Link></S.Tab>
          <S.Tab isSelected={activeTab()===4}><S.Link href="#mkt-index">마케팅 데이터</S.Link></S.Tab>
        </S.Tabs>
      </S.TabBox>
      <S.ContentBox>
        <S.Content>
          {keyword ?
          <KeywordReport
            evalRef={evalRef}
            qtyRef={qtyRef}
            qtyInView={qtyInView}
            ctRef={ctRef}
            ctInView={ctInView}
            userRef={userRef}
            userInView={userInView}
            mktRef={mktRef}
          />
          : 
          <S.Empty>
            분석할 키워드를 입력해주세요
          </S.Empty>}
        </S.Content>
      </S.ContentBox>
      <FloatingBar />
    </>
  );
}

const S = {};

S.Link = styled.a`
  color: inherit;
  text-decoration: none;
`;

S.Search = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
  color: #1d1d1f;
`;

S.Icon = styled.div`
  font-size: 12px;
  margin-left: 3px;
`;

S.InputBox = styled.div`
  border: 1px solid #d2d2d7;
  border-radius: 30px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
`;

S.Input = styled.input`
  background: none;
  margin-left: 10px;
  height: 100%;
  width: 300px;
  border: none;
  &:focus{
    outline: none;
  }
  color: #1d1d1f;
`;

S.TabBox = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #d2d2d7;
  position: sticky;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  background: rgba(255, 255, 255, 0.72);
  z-index: 2;
`;

S.Tabs = styled.div`
  width: 60%;
  display: flex;
  font-size: 12px;
  max-width: 1200px;
`;

S.Tab = styled.div`
  padding: 10px 15px;
  color: #1d1d1f;
  opacity: .8;
  transition: opacity 0.3s;
  &:hover{
    opacity: 1;
  }
  ${props => props.isSelected ? 'border-bottom: 1px solid black; opacity: 1;' : ''}
`;

S.ContentBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

S.Content = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  width: 100%;
`;

S.Empty = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  font-weight: bold;
  font-size: 40px;
`;