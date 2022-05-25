import { useMemo, useState } from "react";
import styled from 'styled-components';
import GrowthTable from "@/components/growth/GrowthTable";
import { useFetch } from "@hooks";
import { GROWTH_URL } from "@api";
import Loading from '@/components/Loading';
import LegalArea from "@/components/system/LegalArea";

export default function Growth(){
  const [ range, setRange ] = useState('day');
  const [ subject, setSubject ] = useState('category');
  const [ trigger, setTrigger ] = useState(true);
  const [ start, setStart ] = useState(0);
  const [ display, setDisplay ] = useState(10);
  const [ codeList, setCodeList ] = useState({
    ctp: [],
    sig: [],
    emd: []
  });

  const regionCode = useMemo(() => {
    if(codeList.emd.length){
      return codeList.emd[0];
    }
    if(codeList.sig.length){
      return codeList.sig[0];
    }
    if(codeList.ctp.length){
      return codeList.ctp[0];
    }
    return 0;
  }, [codeList]);

  const { payload, loading } = useFetch(
    GROWTH_URL(range, subject, start, display, regionCode),
    null,
    'GET',
    [trigger, start, display]
  );

  return (
    <S.Body>
      <S.Flex>
        {loading ? <Loading /> : <GrowthTable subject={payload.data.type} data={payload.data.data} start={start} setStart={setStart} display={display} setDisplay={setDisplay} maxPage={payload.data.maxPage} />}
      </S.Flex>
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
        <button onClick={() => {setTrigger(t => !t); setStart(0);}}>검색</button>
      </S.Flex>
      <LegalArea codeList={codeList} setCodeList={setCodeList} all={false} />
    </S.Body>
  );
}

const S = {};

S.Body = styled.div`
  display: flex;
  flex-flow: column;
  margin-bottom: 40px;
`;

S.Flex = styled.div`
  display: flex;
  margin: 20px auto;
`;