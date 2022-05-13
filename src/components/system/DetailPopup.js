import styled from "styled-components";
import { detailCols, searchQtyCols, qtyData, detailRankCsvHeader } from "@constants";
import Table from "@/components/system/Table";
import { useFetch } from "@hooks";
import { SYS_DETAIL_URL } from "@api";
import Loading from "@/components/Loading";

export default function DetailPopup({ popupCode, setPopupCode }){
  const { payload, loading } = useFetch(
    SYS_DETAIL_URL + popupCode,
    null,
    'GET',
    [popupCode],
    popupCode
  );

  return (
    <S.Popup>
      <S.Title>
        {payload?.name}
        <S.Close onClick={() => setPopupCode(null)}><i className="fas fa-times"></i></S.Close>
      </S.Title>
      <S.Tables>
        <S.TableBox wide>
          <S.SubTitle>주요 상권·지역·업종·점포</S.SubTitle>
          {loading ? <Loading /> : <Table column={detailCols} data={payload?.data} csvHeaders={detailRankCsvHeader} />}
        </S.TableBox>
        <S.TableBox>
          <S.SubTitle>고객관심도</S.SubTitle>
          <Table column={searchQtyCols} data={qtyData} />
        </S.TableBox>
      </S.Tables>
    </S.Popup>
  );
}

const S = {};

S.SubTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
`;

S.Popup = styled.div`
  position: fixed;
  top: 60px;
  left: 24px;
  right: 24px;
  bottom: 12px;
  background: #ffffff;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-flow: column;
`;

S.Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 30px;
  padding: 10px;
`;

S.Close = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  font-size: 24px;
`;

S.Tables = styled.div`
  display: flex;
  padding: 40px 10px;
  height: 100%;
`;

S.TableBox = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  margin-right: 20px;
  height: 100%;
  ${props => props.wide && 'flex: 2'}
`;