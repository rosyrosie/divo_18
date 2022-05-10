import { useState } from "react";
import styled from 'styled-components';
import LegalArea from "@/components/system/LegalArea";
import KeywordArea from "@/components/system/KeywordArea";
import Table from "@/components/system/Table";
import { sampleData } from "@constants";
import { IM_RG_URL } from "@api";
import { useFetch } from "@hooks";

export default function System(){
  const [ regionType, setRegionType ] = useState('legal');
  const [ codeList, setCodeList ] = useState({
    ctp: [],
    sig: [],
    emd: []
  });
  const [ tableInput, setTableInput ] = useState(['0']);
  const [ keywordList, setKeywordList ] = useState([]);

  const onSubmit = () => {
    const legalInput = codeList.emd.length ? codeList.emd : codeList.sig.length ? codeList.sig : codeList.ctp.length ? codeList.ctp : ['0'];
    setTableInput(regionType === 'legal' ? legalInput : keywordList);
  };

  const { payload: tableData } = useFetch(
    IM_RG_URL + '0',
    {
      regionCodes: tableInput
    },
    'POST',
    [tableInput],
    tableInput.length
  );

  return (
    <>
      <S.Table>
        {tableData && <Table data={tableData.data} />}
      </S.Table>
      <S.Toggle>
        <S.Button selected={regionType === 'legal'} onClick={() => setRegionType('legal')}>행정구역</S.Button>
        <S.Button selected={regionType === 'keyword'} onClick={() => setRegionType('keyword')}>키워드상권</S.Button>
      </S.Toggle>
      {regionType==='legal' ? 
        <LegalArea codeList={codeList} setCodeList={setCodeList} />
      : 
        <KeywordArea keywordList={keywordList} setKeywordList={setKeywordList} />
      }
      <S.Submit onClick={onSubmit}>상권 분석</S.Submit>
    </>
  );
}

const S = {};

S.Table = styled.div`
  margin: 20px auto 0 auto;
`;

S.Toggle = styled.div`
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
`;

S.Submit = styled.button`
  width: 100px;
  margin: 20px auto;
  padding: 10px 0;
  border-radius: 20px;
  background: #06c;
  color: #f5f5f7;
  border: none;
  cursor: pointer;
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