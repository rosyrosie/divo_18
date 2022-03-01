import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useFetch } from '@hooks';
import { PLACE_KEYWORD_URL } from '@api';

export default function FloatingBar(){
  const { corpId } = useParams();
  const navigate = useNavigate();
  const CORP_URL = !corpId ? '' : `/cid=${corpId}`;
  
  const { payload, error } = useFetch(
    PLACE_KEYWORD_URL(corpId),
    null,
    'GET',
    [corpId]
  );

  return (
    <S.KwList>
      <details open>
        <S.KwCat>브랜드 키워드</S.KwCat>
        <S.KwScroll>
          {payload?.brand.map(word => (
            <S.Kw key={word} onClick={() => navigate(CORP_URL + '/keyword-analysis/keyword=' + word)}>{word}</S.Kw>
          ))}
        </S.KwScroll>
      </details>
      <details open>
        <S.KwCat>상권 키워드</S.KwCat>
        <S.KwScroll>
          {payload?.section.map(word => (
            <S.Kw key={word} onClick={() => navigate(CORP_URL + '/keyword-analysis/keyword=' + word)}>{word}</S.Kw>
          ))}
        </S.KwScroll>
      </details>
      <details open>
        <S.KwCat>업종 키워드</S.KwCat>
        <S.KwScroll>
          {payload?.category.map(word => (
            <S.Kw key={word} onClick={() => navigate(CORP_URL + '/keyword-analysis/keyword=' + word)}>{word}</S.Kw>
          ))}
        </S.KwScroll>
      </details>
    </S.KwList>
  );
}

const S = {};

S.KwList = styled.div`
  position: fixed;
  top: 120px;
  right: 3%;
  width: 12%;
  background: #000000b3;
  border-radius: 20px;
  backdrop-filter: saturate(180%) blur(20px);
  color: #f5f5f7;
  display: flex;
  flex-flow: column;
  padding-bottom: 20px;
`;

S.KwCat = styled.summary`
  padding: 20px;
  font-size: 14px;
  border-bottom: 1px solid #f5f5f733;
  font-weight: bold;
  &:hover{
    cursor: pointer;
  }
`;

S.KwScroll = styled.div`
  display: flex;
  flex-flow: column;
  overflow-y: auto;
  max-height: 20vh;
  &::-webkit-scrollbar {
    background: none;
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(245, 245, 247, 0.5);
  }
`;

S.Kw = styled.div`
  padding: 15px 20px;
  display: flex;
  justify-content: center;
  font-size: 14px;
  border-bottom: 1px solid #f5f5f733;
  opacity: .8;
  transition: opacity 0.3s;
  &:hover{
    cursor: pointer;
    opacity: 1;
  }
`;