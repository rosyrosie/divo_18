import styled from 'styled-components';
import LoginRequired from '@/components/errorPage/LoginRequired';
import NotReady from '@/components/errorPage/NotReady';

export default function Community(){
  const token = localStorage.getItem('token');

  if(!token) return <LoginRequired />;

  return (
    <S.Content>
      <S.Scroll>
        <S.CHeader>
          <S.Title>
            자유게시판
          </S.Title>
          <S.Flex>
            <S.Category>
              <S.First>전체</S.First>
              <S.Board>정보</S.Board>
              <S.Board>질문</S.Board>
              <S.Board selected>자유</S.Board>
              <S.Board>버그</S.Board>
              <S.Board>공지사항</S.Board>
            </S.Category>
            <S.Alarm><i class="fas fa-bell"></i></S.Alarm> 
          </S.Flex>
        </S.CHeader>
        <S.Posts>
          <S.Post>
            <S.PostTitle>요즘 강남 장사 잘 안되던데 다들 그러신가요..</S.PostTitle>
            <S.PostContent>제목 그대로에요...월 매출이 반토막났어요ㅠㅠ 요즘 다 그런가요</S.PostContent>
            <S.PostAuthor>강남맛집워너비</S.PostAuthor>
          </S.Post>
          <S.Post>
            <S.PostTitle>요즘 강남 장사 잘 안되던데 다들 그러신가요..</S.PostTitle>
            <S.PostContent>제목 그대로에요...월 매출이 반토막났어요ㅠㅠ 요즘 다 그런가요</S.PostContent>
            <S.PostAuthor>강남맛집워너비</S.PostAuthor>
          </S.Post>
          <S.Post>
            <S.PostTitle>요즘 강남 장사 잘 안되던데 다들 그러신가요..</S.PostTitle>
            <S.PostContent>제목 그대로에요...월 매출이 반토막났어요ㅠㅠ 요즘 다 그런가요</S.PostContent>
            <S.PostAuthor>강남맛집워너비</S.PostAuthor>
          </S.Post>
          <S.Post>
            <S.PostTitle>요즘 강남 장사 잘 안되던데 다들 그러신가요..</S.PostTitle>
            <S.PostContent>제목 그대로에요...월 매출이 반토막났어요ㅠㅠ 요즘 다 그런가요</S.PostContent>
            <S.PostAuthor>강남맛집워너비</S.PostAuthor>
          </S.Post>
          <S.Post>
            <S.PostTitle>요즘 강남 장사 잘 안되던데 다들 그러신가요..</S.PostTitle>
            <S.PostContent>제목 그대로에요...월 매출이 반토막났어요ㅠㅠ 요즘 다 그런가요</S.PostContent>
            <S.PostAuthor>강남맛집워너비</S.PostAuthor>
          </S.Post>
          <S.Post>
            <S.PostTitle>요즘 강남 장사 잘 안되던데 다들 그러신가요..</S.PostTitle>
            <S.PostContent>제목 그대로에요...월 매출이 반토막났어요ㅠㅠ 요즘 다 그런가요</S.PostContent>
            <S.PostAuthor>강남맛집워너비</S.PostAuthor>
          </S.Post>
          <S.Post>
            <S.PostTitle>요즘 강남 장사 잘 안되던데 다들 그러신가요..</S.PostTitle>
            <S.PostContent>제목 그대로에요...월 매출이 반토막났어요ㅠㅠ 요즘 다 그런가요</S.PostContent>
            <S.PostAuthor>강남맛집워너비</S.PostAuthor>
          </S.Post>
          <S.Post>
            <S.PostTitle>요즘 강남 장사 잘 안되던데 다들 그러신가요..</S.PostTitle>
            <S.PostContent>제목 그대로에요...월 매출이 반토막났어요ㅠㅠ 요즘 다 그런가요</S.PostContent>
            <S.PostAuthor>강남맛집워너비</S.PostAuthor>
          </S.Post>
        </S.Posts>
      </S.Scroll>
      <S.CFooter>
        <S.Footer>
          <S.Search>
            <S.SearchIcon>
              <i class="fas fa-search"></i>
            </S.SearchIcon>
            <S.Input placeholder="검색어를 입력하세요"/>
          </S.Search>
          <S.Button>글쓰기</S.Button>
        </S.Footer>
      </S.CFooter>
    </S.Content>
  );
}

const S = {};

S.Search = styled.div`
  display: flex;
  background: white;
  align-items: center;
  height: 100%;
  padding: 0;
  border-radius: 10px;
`;

S.SearchIcon = styled.div`
  font-size: 14px;
  padding: 0 10px 0 15px;
`;

S.Input = styled.input`
  border: none;
  &:focus{
    outline: none;
  }
  width: 200px;
`;

S.Scroll = styled.div`
  display: flex;
  flex-flow: column;
  overflow-y: auto;
`;

S.Content = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  color: #1d1d1f;
  max-height: calc(100vh - 48px);
`;

S.CHeader = styled.div`
  width: 100%;
  background: #f5f5f7b3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  padding: 40px 0 20px 0;
`;

S.Title = styled.div`
  width: 40%;
  max-width: 1200px;
  font-size: 24px;
  font-weight: 500;
`;

S.Category = styled.div`
  display: flex;
  color: #515154;
`;

S.Alarm = styled.div`
  font-size: 16px;
  &:hover{
    cursor: pointer;
  }
  color: #1d1d1f;
  padding-right: 5px;
`;

S.Flex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  align-items: center;
  padding-top: 20px;
`;

S.Board = styled.div`
  padding: 0 15px;
  border-left: 1px solid #d2d2d7;
  font-size: 12px;
  ${props => props.selected ? 'font-weight: bold;' : ''}
`;

S.First = styled.div`
  padding-right: 15px;
  font-size: 12px;
`;

S.Posts = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

S.Post = styled.div`
  display: flex;
  flex-flow: column;
  width: 40%;
  border-bottom: 1px solid #d2d2d7;
  padding: 20px 0;
  &:hover{
    cursor: pointer;
    opacity: 1;
  }
  opacity: .8;
`;

S.PostTitle = styled.div`
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 15px;
`;

S.PostContent = styled.div`
  font-size: 14px;
  color: #515154;
  margin-bottom: 25px;
`;

S.PostAuthor = styled.div`
  font-size: 12px;
`;

S.CFooter = styled.div`
  background: #f5f5f7b3;
  display: flex;
  justify-content: center;
  padding: 15px 0;
  color: #1d1d1f;
`;

S.Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
`;

S.Icon = styled.div`
  &:hover{
    cursor: pointer;
  }
  font-size: 20px;
`;

S.Button = styled.button`
  padding: 12px 20px;
  border-radius: 5px;
  color: rgba(245, 245, 247, 0.8);
  background: #06c;
  border: none;
  ${props => !props.error ? '&:hover{cursor:pointer; color: #f5f5f7;}' : 'opacity: .3;'};
`;