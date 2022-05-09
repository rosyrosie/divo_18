import { useEffect, useState } from "react";
import styled from 'styled-components';
import { SYS_GET_REG_URL } from "@api";
import { useFetch } from "@hooks";

export default function System(){
  const [ regionType, setRegionType ] = useState('legal');
  const [ codeList, setCodeList ] = useState({
    ctp: [],
    sig: [],
    emd: []
  });
  const [ sigCode, setSigCode ] = useState(null);
  const [ ctpCode, setCtpCode ] = useState(null);

  const { payload: ctpList } = useFetch(
    SYS_GET_REG_URL + '0',
    null,
    'GET'
  );

  const { payload: sigList } = useFetch(
    SYS_GET_REG_URL + ctpCode,
    null,
    'GET',
    [ctpCode],
    ctpCode
  );

  const { payload: emdList } = useFetch(
    SYS_GET_REG_URL + sigCode,
    null,
    'GET',
    [sigCode],
    sigCode
  );

  useEffect(() => {
    if(codeList.ctp.length === 1) setCtpCode(codeList.ctp[0]);
    else{
      setCtpCode(null);
    }
    if(codeList.sig.length === 1) setSigCode(codeList.sig[0]);
    else{
      setSigCode(null);
    }
  }, [codeList]);

  const onClickRegion = (e, type) => {
    setCodeList(c => ({...c, [type]: c[type].includes(e.target.value) ? c[type].filter(s => s !== e.target.value) : [...c[type], e.target.value]}));
  }

  const onClickWhole = (e, type) => {
    const regionList = type === 'ctp' ? ctpList.subset : type === 'sig' ? sigList.subset : emdList.subset;
    console.log(regionList);
    setCodeList(c => ({...c, [type]: e.target.checked ? regionList.map(region => region.regionCode) : []}));
  }

  return (
    <>
      <S.Toggle>
        <S.Button selected={regionType === 'legal'} onClick={() => setRegionType('legal')}>행정구역</S.Button>
        <S.Button selected={regionType === 'keyword'} onClick={() => setRegionType('keyword')}>키워드상권</S.Button>
      </S.Toggle>
      {regionType==='legal' ? 
        <S.Flex>
          <S.CheckBox>
            <S.Title>전국</S.Title>
            <S.RegionList>
              <S.Label>
                <input type="checkbox" value={'0'} checked={!(codeList.ctp.length || codeList.sig.length || codeList.emd.length)} />
                <S.Region>전국</S.Region>
              </S.Label>
            </S.RegionList>
          </S.CheckBox>
          <S.CheckBox>
            <S.Title>시.도</S.Title>
            <S.RegionList>
              <S.Label>
                <input type="checkbox" onClick={e => onClickWhole(e, 'ctp')}/>
                <S.Region>전체</S.Region>
              </S.Label>
              {ctpList?.subset?.map(ctp => (
                <S.Label key={ctp.regionCode}>
                  <input type="checkbox" value={ctp.regionCode} checked={codeList.ctp.includes(ctp.regionCode)} onChange={e => onClickRegion(e, 'ctp')}/>
                  <S.Region>{ctp.regionName}</S.Region>
                </S.Label>
              ))}
            </S.RegionList>
          </S.CheckBox>
          <S.CheckBox>
            <S.Title>시.군.구</S.Title>
            <S.RegionList>
              {ctpCode && 
              <>
                <S.Label>
                  <input type="checkbox" onClick={e => onClickWhole(e, 'sig')}/>
                  <S.Region>전체</S.Region>
                </S.Label>
                {sigList?.subset?.map(sig => (
                  <S.Label key={sig.regionCode}>
                    <input type="checkbox" value={sig.regionCode} checked={codeList.sig.includes(sig.regionCode)} onChange={e => onClickRegion(e, 'sig')}/>
                    <S.Region>{sig.regionName}</S.Region>
                  </S.Label>
                ))}
              </>
              }
            </S.RegionList>
          </S.CheckBox>
          <S.CheckBox>
            <S.Title>읍.면.동</S.Title>
            <S.RegionList>
              {sigCode && 
              <>
                <S.Label>
                  <input type="checkbox"  onClick={e => onClickWhole(e, 'emd')}/>
                  <S.Region>전체</S.Region>
                </S.Label>
                {emdList?.subset?.map(emd => (
                  <S.Label key={emd.regionCode}>
                    <input type="checkbox" value={emd.regionCode} checked={codeList.emd.includes(emd.regionCode)} onChange={e => onClickRegion(e, 'emd')}/>
                    <S.Region>{emd.regionName}</S.Region>
                  </S.Label>
                ))}
              </>
              }
            </S.RegionList>
          </S.CheckBox>
        </S.Flex>
      : <></>}
      HolyMoly..
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
