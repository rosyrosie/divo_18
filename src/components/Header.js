import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { menuList, subMenuList, subMenuUrlList } from '../environments/Variables';

export default function Header(){
  const [ isSearching, setIsSearching ] = useState(false);
  const [ input, setInput ] = useState('');
  //const [ menu, setMenu ] = useState(-1);

  const navigate = useNavigate();

  return (
    <S.Flex>
      {!isSearching ? 
      <S.Header>
        <S.Logo onClick={() => navigate('/')}>Divo</S.Logo>
        {menuList.map((menuObj, i) => (
          <S.Menu key={menuObj.title} onClick={() => navigate(menuObj.url)}>{menuObj.title}</S.Menu>
        ))}
        <S.Logo onClick={() => {setIsSearching(true);}}><i className="fas fa-search"></i></S.Logo>
        <S.Logo><i className="fas fa-user"></i></S.Logo>
      </S.Header> :
      <S.Header>
        <S.Logo><i className="fas fa-search"></i></S.Logo>
        <S.Input placeholder="분석할 키워드를 입력하세요" value={input} onChange={e => setInput(e.target.value)}/>
        <S.Logo onClick={() => setIsSearching(false)}><i class="fas fa-times"></i></S.Logo>
      </S.Header>}
      {/* {menu>=0 && 
      <S.SubMenus>
        {subMenuList[menu].map((subMenu, i) => (
          <S.SubMenu key={subMenu} onClick={() => navigate(subMenuUrlList[menu][i])}>{subMenu}</S.SubMenu>
        ))}
      </S.SubMenus>} */}
    </S.Flex>  
  );
}

const S = {};

S.Flex = styled.div`
`;

S.SubMenus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  //background: rgba(245, 245, 247, 0.7);
  background: rgba(0, 0, 0, 0.7);
  //color: #1d1d1f;
  color: #f5f5f7;
  padding: 20px 0;
  font-size: 12px;
  position: absolute;
  top: 48px;
`;

S.SubMenu = styled.div`
  margin: 0 20px;
  transition: opacity 0.3s;
  opacity: .8;
  &:hover{
    cursor: pointer;
    opacity: 1;
  }
`;

S.Header = styled.div`
  height: 48px;
  min-height: 48px;
  flex: 1;
  //background: rgba(0, 0, 0, 0.7);
  background: rgba(225, 225, 227, 0.7);
  //color: #f5f5f7;
  color: #1d1d1f;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

S.Menu = styled.div`
  margin: 0 20px;
  opacity: .8;
  transition: opacity 0.3s;
  font-weight: bold;
  &:hover{
    cursor: pointer;
    color: black;
    opacity: 1;
  }
`;

S.Logo = styled(S.Menu)`
  font-family: 'Montserrat';
  font-size: 17px;
  font-weight: 
`;

S.Input = styled.input`
  width: 320px;
  height: 24px;
  line-height: 24px;
  background: none;
  border: none;
  &:focus{
    outline: none;
  }
  &::placeholder{
    //color: #f5f5f7;
    color: #1d1d1f;
    opacity: .8;
    font-size: 14px;
  }
  font-size: 16px;
`;