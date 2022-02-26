import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { menuList } from '@constants';
import CorpListModal from '@/components/CorpListModal';
import { useDetectOutsideClick } from '../../utils/hooks';

export default function Header({ dark = false }){
  const { corpId } = useParams();
  const [ isSearching, setIsSearching ] = useState(false);
  const [ input, setInput ] = useState('');
  
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const dropDownRef = useRef(null);
  const modalRef = useRef(null);
  const [ showDropDown, setShowDropDown ] = useDetectOutsideClick(dropDownRef, false);
  const [ showModal, setShowModal ] = useDetectOutsideClick(modalRef, false);

  const handleLogout = e => {
    e.preventDefault();
    navigate('/');
    localStorage.clear();
  }

  const CORP_URL = !corpId ? '' : `/cid=${corpId}`;

  return (
    <>
      <S.Flex>
        {!isSearching ? 
        <S.Header dark={dark}>
          <S.Logo onClick={() => navigate(corpId!==undefined ? `/cid=${corpId}` : '/')}>Divo</S.Logo>
          {menuList.map((menuObj, i) => (
            <S.Menu dark={dark} key={menuObj.title} onClick={() => navigate(CORP_URL + menuObj.url)}>{menuObj.title}</S.Menu>
          ))}
          <S.Logo onClick={() => {setIsSearching(true);}}><i className="fas fa-search"></i></S.Logo>
          <S.LogoBox>
            <S.Logo onClick={() => setShowDropDown(d => !d)}><i className="fas fa-user"></i></S.Logo>
            {showDropDown && 
              (!token ?
              <S.Dropdown ref={dropDownRef}>
                <S.Drop onClick={() => navigate('/login')}>로그인</S.Drop>
                <S.Drop onClick={() => navigate('/signup')}>회원가입</S.Drop>
              </S.Dropdown> :
              <S.Dropdown ref={dropDownRef}>
                {corpId && <S.Drop onClick={() => setShowModal(true)}>브랜드 전환</S.Drop>}
                <S.Drop onClick={() => navigate(CORP_URL + '/corp-management')}>브랜드 관리</S.Drop>
                <S.Drop onClick={handleLogout}>로그아웃</S.Drop>
              </S.Dropdown>)
            }
          </S.LogoBox>
        </S.Header> :
        <S.Header dark={dark}>
          <S.Logo><i className="fas fa-search"></i></S.Logo>
          <S.Input dark={dark} placeholder="분석할 키워드를 입력하세요" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key==='Enter' && input ? navigate(CORP_URL + `/keyword-analysis/keyword=${input}`) : null} />
          <S.Logo onClick={() => setIsSearching(false)}><i class="fas fa-times"></i></S.Logo>
        </S.Header>}
        {/* {menu>=0 && 
        <S.SubMenus>
          {subMenuList[menu].map((subMenu, i) => (
            <S.SubMenu key={subMenu} onClick={() => navigate(subMenuUrlList[menu][i])}>{subMenu}</S.SubMenu>
          ))}
        </S.SubMenus>} */}
      </S.Flex>
      {showModal && <CorpListModal setShowModal={setShowModal} modalRef={modalRef} />} 
    </>
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
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  //${props => props.dark ? 'box-shadow: 1px 1px 5px rgba(255, 255, 255, 0.3);' : 'box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);'}
  ${props => props.dark ? 'background: rgba(0, 0, 0, 0.7); color: #f5f5f7;' : 'background: rgba(225, 225, 227, 0.7); color: #1d1d1f;'}
`;

S.Menu = styled.div`
  margin: 0 20px;
  opacity: .8;
  transition: opacity 0.3s;
  font-weight: bold;
  &:hover{
    cursor: pointer;
    opacity: 1;
  }
`;

S.Logo = styled(S.Menu)`
  font-family: 'Montserrat', 'SUIT';
  font-size: 17px;
  font-weight: bold;
`;

S.LogoBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
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
  ${props => props.dark ? 'color: white; &::placeholder{color:#f5f5f7;}' : ''}
`;

S.Dropdown = styled.div`
  position: absolute;
  display: flex;
  flex-flow: column;
  backdrop-filter: saturate(180%) blur(20px);
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid #d2d2d7;
  top: 0;
  transform: translateY(40px);
  z-index: 2;
  border-radius: 15px;
`;

S.Drop = styled.div`
  padding: 20px 5px;
  width: 80px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  opacity: .8;
  color: #1d1d1f;
  font-weight: bold;
  &:hover{
    cursor: pointer;
    opacity: 1;
  }
`;

S.Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #d2d2d7;
`;