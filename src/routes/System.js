import { useEffect, useState } from "react";
import styled from 'styled-components';
import { SYS_GET_REG_URL } from "@api";
import { useFetch } from "@hooks";
import LegalArea from "@/components/system/LegalArea";

export default function System(){
  const [ regionType, setRegionType ] = useState('legal');
  const [ codeList, setCodeList ] = useState({
    ctp: [],
    sig: [],
    emd: []
  });

  const dataInput = codeList.emd.length ? codeList.emd : codeList.sig.length ? codeList.sig : codeList.ctp.length ? codeList.ctp : ['0'];

  return (
    <>
      <S.Toggle>
        <S.Button selected={regionType === 'legal'} onClick={() => setRegionType('legal')}>행정구역</S.Button>
        <S.Button selected={regionType === 'keyword'} onClick={() => setRegionType('keyword')}>키워드상권</S.Button>
      </S.Toggle>
      {regionType==='legal' ? 
        <LegalArea codeList={codeList} setCodeList={setCodeList} />
      : 
        <S.Flex>
          <input placeholder="키워드 상권 검색"/>
        </S.Flex>
      }
    </>
  );
}

const S = {};

S.Label = styled.label`
  margin: 5px 0;
`;

S.RegionList = styled.div`
  display: flex;
  max-height: 300px;
  flex-flow: column;
  overflow-y: auto;
`;

S.Toggle = styled.div`
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
`;

S.Button = styled.div`
  font-size: 14px;
  background: none;
  padding: 8px 10px;
  color: #515154;
  ${props => props.selected && `
    color: black;
    font-weight: bold;
    border-bottom: 1.5px solid;
  `}
  cursor: pointer;
`;

S.Flex = styled.div`
  display: flex;
  width: 60%;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
`;

S.CheckBox = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  padding: 0 10px;
`;

S.Title = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  font-weight: bold;
  color: #1d1d1f;
  border-right: 1px solid #d2d2d7;
`;

S.Region = styled.span`
  margin-left: 5px;
  font-size: 14px;
`;
