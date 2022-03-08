import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CorpRequired from "@/components/errorPage/CorpRequired"
import { PLACE_KEYWORD_URL } from "@api";
import { useFetch } from "@hooks";
import NoAccess from "@/components/errorPage/NoAccess";

export default function KeywordAnalysisBlank(){
  const { corpId } = useParams();
  const navigate = useNavigate();

  const { payload: keywordSet, error } = useFetch(
    PLACE_KEYWORD_URL(corpId),
    null,
    'GET',
    [corpId],
    corpId !== '0'
  );

  if(corpId === '0') return (
    <CorpRequired />
  );

  if(keywordSet?.message === 'unauthorized user') return (
    <NoAccess />
  );

  return (
    <>
      <S.Content>
        <S.Intro>분석할 키워드를 선택해주세요</S.Intro>
        <S.Flex>
          <S.Box>
            <S.Title>브랜드 키워드</S.Title>
            <S.Words>
              <S.Scroll>
                {keywordSet?.brand?.map(word => (
                  <S.Word onClick={() => navigate('keyword=' + word)} key={word}>{word}</S.Word>
                ))}
              </S.Scroll>
            </S.Words>
          </S.Box>
          <S.Box>
            <S.Title>상권 키워드</S.Title>
            <S.Words>
              <S.Scroll>
                {keywordSet?.section?.map(word => (
                  <S.Word onClick={() => navigate('keyword=' + word)} key={word}>{word}</S.Word>
                ))}
              </S.Scroll>
            </S.Words>
          </S.Box>
          <S.Box>
            <S.Title>업종 키워드</S.Title>
            <S.Words>
              <S.Scroll>
                {keywordSet?.category?.map(word => (
                  <S.Word onClick={() => navigate('keyword=' + word)} key={word}>{word}</S.Word>
                ))}
              </S.Scroll>
            </S.Words>
          </S.Box>
        </S.Flex>
      </S.Content>
    </>
  );
}

const S = {};

S.Intro = styled.div`
  position: absolute;
  top: 160px;
  font-weight: bold;
  font-size: 36px;
`;

S.Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1d1d1f;
  flex-flow: column;
`;

S.Flex = styled.div`
  display: flex;
`;

S.Box = styled.div`
  display: flex;
  flex-flow: column;
  padding: 20px;
`;

S.Title = styled.div`
  font-weight: 500;
  padding-bottom: 30px;
  justify-content: center;
  display: flex;
  border-bottom: 1px solid #d2d2d7b3;
  width: 180px;
`;

S.Words = styled.div`
  display: flex;
  flex-flow: column;
  color: #515154;
`;

S.Word = styled.div`
  padding: 15px 10px;
  border-bottom: 1px solid #d2d2d7b3;
  display: flex;
  font-size: 14px;
  &:hover{
    cursor: pointer;
    background: #f5f5f7;
  }
  width: 180px;
`;

S.Scroll = styled.div`
  display: flex;
  flex-flow: column;
  max-height: 400px;
  overflow-y: auto;
`;