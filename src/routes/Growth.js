import { useState } from "react";
import styled from 'styled-components';
import GrowthTable from "@/components/growth/GrowthTable";
import { useFetch } from "@hooks";
import { GROWTH_URL } from "@api";
import Loading from '@/components/Loading';

export default function Growth(){
  const [ range, setRange ] = useState('day');
  const [ subject, setSubject ] = useState('category');
  const [ trigger, setTrigger ] = useState(true);

  const { payload, loading } = useFetch(
    GROWTH_URL(range, subject),
    null,
    'GET',
    [trigger]
  );

  return (
    <>
      <S.Flex>
        <select onChange={e => setRange(e.target.value)}>
          <option value="day">일</option>
          <option value="week">주</option>
          <option value="month">월</option>
          <option value="quarter">분기</option>
          <option value="year">년</option>
        </select>
        <select onChange={e => setSubject(e.target.value)} defaultValue="category">
          <option value="keyword">키워드</option>
          <option value="area">행정구역</option>
          <option value="category">업종</option>
          <option value="omrank">음식점</option>
        </select>
      </S.Flex>
      <S.Flex><button onClick={() => setTrigger(t => !t)}>검색</button></S.Flex>
      <S.Flex>
        {loading ? <Loading /> : <GrowthTable subject={payload.data.type} data={payload.data.data} />}
      </S.Flex>
    </>
  );
}

const S = {};

S.Flex = styled.div`
  display: flex;
  margin: 20px auto;
`;