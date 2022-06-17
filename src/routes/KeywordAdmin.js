import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import CorpRequired from '@/components/errorPage/CorpRequired';
import { PLACE_KEYWORD_URL, UP_LIST_URL } from '@api';
import { useFetch } from '@hooks';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function KeywordAdmin(){
  const { corpId } = useParams();
  const token = localStorage.getItem('token');
  const tokenHeader = token ? {headers: {"Authorization": `Token ${token}`}} : null;
  const { payload, error } = useFetch(
    PLACE_KEYWORD_URL(corpId),
    null,
    'GET',
    [corpId]
  );
  const [ newBrand, setNewBrand ] = useState('');
  const [ newSec, setNewSec ] = useState('');
  const [ newCat, setNewCat ] = useState('');
  const [ newRival, setNewRival ] = useState('');

  const [ isChanging, setIsChanging ] = useState(false);

  const [ keywordSet, setKeywordSet ] = useState({brand: [], rel: [], section: [], category: [], rival: []});

  useEffect(() => {
    setKeywordSet({ brand: payload?.brand, rel: payload?.rel, section: payload?.section, category: payload?.category, rival: payload?.rival });
  }, [payload]);

  const addBrand = e => {
    if(e.key !== 'Enter' || !newBrand || keywordSet.brand.includes(newBrand)) return;
    setKeywordSet(set => ({ ...set, brand: [ newBrand, ...set.brand ]}));
    setNewBrand('');
  }

  const addSec = e => {
    if(e.key !== 'Enter' || !newSec || keywordSet.section.includes(newSec)) return;
    setKeywordSet(set => ({ ...set, section: [ newSec, ...set.section ] }))
    setNewSec('');
  }

  const addCat = e => {
    if(e.key !== 'Enter' || !newCat || keywordSet.category.includes(newCat)) return;
    setKeywordSet(set => ({ ...set, category: [ newCat, ...set.category ] }));
    setNewCat('');
  }

  const addRival = e => {
    if(e.key !== 'Enter' || !newRival || keywordSet.rival.includes(newRival)) return;
    setKeywordSet(set => ({ ...set, rival: [newRival, ...set.rival ] }));
    setNewRival('');
  }

  const delBrand = word => setKeywordSet(set => ({ ...set, brand : [...set.brand].filter(e => e !== word) }));
  const delSec = word => setKeywordSet(set => ({ ...set, section: [...set.section].filter(e => e !== word) }));
  const delCat = word => setKeywordSet(set => ({ ...set, category: [...set.category].filter(e => e !== word) }));
  const delRival = word => setKeywordSet(set => ({ ...set, rival: [...set.rival].filter(e => e !== word) }));

  const onSubmit = e => {
    e.preventDefault();
    setIsChanging(true);
    const body = {
      id: corpId,
      data: keywordSet
    };
    axios.post(UP_LIST_URL, body, tokenHeader).then(res => {
      setIsChanging(false);
      res.data.message === 'success' ? alert('변경이 완료되었습니다') : alert('에러가 발생했습니다\n다시 시도해주세요');
    });
  }

  return (
    <S.Content>
      <S.Flex>
        <S.Box>
          <S.Title>브랜드 키워드</S.Title>
          <S.Words>
            <S.Scroll>
              {keywordSet?.brand?.map(word => (
                <S.Word onClick={() => delBrand(word)} key={word}>{word}</S.Word>
              ))}
            </S.Scroll>
            <S.Input value={newBrand} onChange={e => setNewBrand(e.target.value)} onKeyPress={addBrand} />
          </S.Words>
        </S.Box>
        <S.Box>
          <S.Title>상권 키워드</S.Title>
          <S.Words>
            <S.Scroll>
              {keywordSet?.section?.map(word => (
                <S.Word onClick={() => delSec(word)} key={word}>{word}</S.Word>
              ))}
            </S.Scroll>
            <S.Input value={newSec} onChange={e => setNewSec(e.target.value)} onKeyPress={addSec} />
          </S.Words>
        </S.Box>
        <S.Box>
          <S.Title>업종 키워드</S.Title>
          <S.Words>
            <S.Scroll>
              {keywordSet?.category?.map(word => (
                <S.Word onClick={() => delCat(word)} key={word}>{word}</S.Word>
              ))}
            </S.Scroll>
            <S.Input value={newCat} onChange={e => setNewCat(e.target.value)} onKeyPress={addCat} />
          </S.Words>
        </S.Box>
        <S.Box>
          <S.Title>경쟁 키워드</S.Title>
          <S.Words>
            <S.Scroll>
              {keywordSet?.rival?.map(word => (
                <S.Word onClick={() => delRival(word)} key={word}>{word}</S.Word>
              ))}
            </S.Scroll>
            <S.Input value={newRival} onChange={e => setNewRival(e.target.value)} onKeyPress={addRival} />
          </S.Words>
        </S.Box>
      </S.Flex>
      <S.Button error={isChanging} onClick={!isChanging ? onSubmit : null}>{!isChanging ? '변경' : '변경 중'}</S.Button>
    </S.Content>
  );
}

const S = {};

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
  font-weight: bold;
  padding-bottom: 30px;
  justify-content: center;
  display: flex;
  border-bottom: 1px solid #d2d2d7b3;
`;

S.Words = styled.div`
  display: flex;
  flex-flow: column;
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

S.Input = styled.input`
  width: 180px;
  margin-top: 30px;
  padding: 15px 10px;
  display: flex;
  justify-content: center;
  border: 1px solid #d2d2d7b3;
  &:focus{
    outline-color: #06c;
  }
  border-radius: 10px;
`;

S.Button = styled.button`
  margin-top: 30px;
  padding: 12px 20px;
  border-radius: 5px;
  color: rgba(245, 245, 247, 0.8);
  background: #06c;
  border: none;
  ${props => !props.error ? '&:hover{cursor:pointer; color: #f5f5f7;}' : 'opacity: .3;'};
`;

S.Scroll = styled.div`
  display: flex;
  flex-flow: column;
  max-height: 400px;
  overflow-y: auto;
`;