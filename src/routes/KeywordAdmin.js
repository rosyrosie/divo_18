import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import CorpRequired from '@/components/CorpRequired';
import { PLACE_KEYWORD_URL, UP_LIST_URL } from '@api';
import { useFetch } from '@hooks';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { tokenHeader } from '@constants';

export default function KeywordAdmin(){
  const { corpId } = useParams();
  const { payload, error } = useFetch(
    PLACE_KEYWORD_URL(corpId),
    null,
    'GET',
    [corpId]
  );
  const [ newBrand, setNewBrand ] = useState('');
  const [ newRel, setNewRel ] = useState('');
  const [ newSec, setNewSec ] = useState('');
  const [ newCat, setNewCat ] = useState('');

  const [ keywordSet, setKeywordSet ] = useState({brand: [], rel: [], section: [], category: []});

  useEffect(() => {
    setKeywordSet({ brand: payload?.brand, rel: payload?.rel, section: payload?.section, category: payload?.category });
  }, [payload]);

  const addBrand = e => {
    if(e.key !== 'Enter' || !newBrand || keywordSet.brand.includes(newBrand)) return;
    setKeywordSet(set => Object.assign(set, { brand: [ newBrand, ...set.brand ] }));
    setNewBrand('');
  }

  const addRel = e => {
    if(e.key !== 'Enter' || !newRel || keywordSet.rel.includes(newRel)) return;
    setKeywordSet(set => Object.assign(set, { rel: [ newRel, ...set.rel ] }));
    setNewRel('');
  }

  const addSec = e => {
    if(e.key !== 'Enter' || !newSec || keywordSet.section.includes(newSec)) return;
    setKeywordSet(set => Object.assign(set, { section: [ newSec, ...set.section ] }));
    setNewSec('');
  }

  const addCat = e => {
    if(e.key !== 'Enter' || !newCat || keywordSet.category.includes(newCat)) return;
    setKeywordSet(set => Object.assign(set, { category: [ newCat, ...set.category ] }));
    setNewCat('');
  }

  const delBrand = word => setKeywordSet(set => Object.assign({}, Object.assign(set, { brand : [...set.brand].filter(e => e !== word) })))
  const delRel = word => setKeywordSet(set => Object.assign({}, Object.assign(set, { rel: [...set.rel].filter(e => e !== word) })))
  const delSec = word => setKeywordSet(set => Object.assign({}, Object.assign(set, { section: [...set.section].filter(e => e !== word) })))
  const delCat = word => setKeywordSet(set => Object.assign({}, Object.assign(set, { category: [...set.category].filter(e => e !== word) })))

  const onSubmit = e => {
    e.preventDefault();
    const body = {
      id: corpId,
      data: keywordSet
    };
    axios.post(UP_LIST_URL, body, tokenHeader).then(res => console.log(res));
  }

  if(corpId === '0'){
    return (
      <CorpRequired />
    );
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
          <S.Title>연관 키워드</S.Title>
          <S.Words>
            <S.Scroll>
              {keywordSet?.rel?.map(word => (
                <S.Word onClick={() => delRel(word)} key={word}>{word}</S.Word>
              ))}
            </S.Scroll>
            <S.Input value={newRel} onChange={e => setNewRel(e.target.value)} onKeyPress={addRel} />
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
      </S.Flex>
      <S.Button onClick={onSubmit}>변경</S.Button>
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
  border-bottom: 1px solid #d2d2d7;
`;

S.Words = styled.div`
  display: flex;
  flex-flow: column;
`;

S.Word = styled.div`
  padding: 15px 10px;
  border-bottom: 1px solid #d2d2d7;
  display: flex;
  font-size: 14px;
  &:hover{
    cursor: pointer;
    background: #f5f5f7;
  }
`;

S.Input = styled.input`
  margin-top: 30px;
  padding: 15px 10px;
  display: flex;
  justify-content: center;
  border: 1px solid #d2d2d7;
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