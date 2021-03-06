import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { menuList  } from '@constants';
import CorpListModal from '@/components/CorpListModal';
import { useDetectOutsideClick, useFetch } from '@hooks';
import { IS_ADMIN_URL } from "@api";

export default function Header({ sticky = false, dark = false, corpName }){
  const { corpId } = useParams();
  const [ input, setInput ] = useState('');
  let token = localStorage.getItem('token');
  const navigate = useNavigate();

  const { payload: isAdmin } = useFetch(
    IS_ADMIN_URL,
    null,
    'GET',
    [token]
  );

  const searchRef = useRef(null);
  const dropDownRef = useRef(null);
  const modalRef = useRef(null);
  const [ isSearching, setIsSearching ] = useDetectOutsideClick(searchRef, false);
  const [ showDropDown, setShowDropDown ] = useDetectOutsideClick(dropDownRef, false);
  const [ showModal, setShowModal ] = useDetectOutsideClick(modalRef, false);

  const CORP_URL = corpId === undefined ? '' : `/cid=${corpId}`;

  const handleLogin = e => {
    e.preventDefault();
    navigate('/login');
    setShowDropDown(false);
  }

  const handleSignup = e => {
    e.preventDefault();
    navigate('/signup');
    setShowDropDown(false);
  }

  const handleLogout = e => {
    e.preventDefault();
    localStorage.clear();
    token = null;
    navigate('/');
    setShowDropDown(false);
  }

  const handleSearch = e => {
    e.preventDefault();
    if(input){
      navigate(`keyword-analysis/keyword=${input}`);
      setIsSearching(false);
      setInput('');
    }
  }

  const handleKeyPressSearch = e => {
    if(e.key !== 'Enter') return;
    if(input){
      navigate(`keyword-analysis/keyword=${input}`);
      setIsSearching(false);
      setInput('');
    }
  }

  return (
    <>
      <S.Flex sticky={sticky}>
        {!isSearching ? 
        <S.Header dark={dark}>
            <S.Logo onClick={() => navigate(corpId!==undefined ? `/cid=${corpId}` : '/')}>Divo</S.Logo>
          <S.Left>
            {menuList.map((menuObj, i) => (
              <S.Menu dark={dark} key={menuObj.title} onClick={() => navigate(CORP_URL + menuObj.url)}>{menuObj.title}</S.Menu>
            ))}
            {isAdmin?.isAdmin && <S.Logo onClick={() => {setIsSearching(true);}}><i className="fas fa-search"></i></S.Logo>}
            <S.LogoBox>
              <S.Logo onClick={() => setShowDropDown(d => !d)}>
                <i className="fas fa-user"></i>
                <S.Brand>{corpName}</S.Brand>
              </S.Logo>
              {showDropDown && 
                (!token ?
                <S.Dropdown ref={dropDownRef}>
                  <S.Drop onClick={handleLogin}>?????????</S.Drop>
                  <S.Drop onClick={handleSignup}>????????????</S.Drop>
                </S.Dropdown> :
                <S.Dropdown ref={dropDownRef}>
                  <S.Drop onClick={() => setShowModal(true)}>????????? ??????</S.Drop>
                  <S.Drop onClick={() => { navigate('corp-management'); setShowDropDown(false); }}>????????? ??????</S.Drop>
                  {isAdmin?.isAdmin && <S.Drop onClick={() => { navigate('user-management'); setShowDropDown(false); }}>?????? ??????</S.Drop>}
                  <S.Drop onClick={handleLogout}>????????????</S.Drop>
                </S.Dropdown>)
              }
            </S.LogoBox>
          </S.Left>
        </S.Header> :
        <S.Header dark={dark} ref={searchRef} align={true}>
          <S.Left>
            <S.Logo onClick={handleSearch}><i className="fas fa-search"></i></S.Logo>
            <S.Input dark={dark} placeholder="????????? ???????????? ???????????????" value={input} onChange={e => setInput(e.target.value)} onKeyPress={handleKeyPressSearch} />
            <S.Logo onClick={() => setIsSearching(false)}><i className="fas fa-times"></i></S.Logo>
          </S.Left>
        </S.Header>}
      </S.Flex>
      {showModal && <CorpListModal setShowModal={setShowModal} modalRef={modalRef} />} 
    </>
  );
}

const S = {};

S.Flex = styled.div`
  z-index: 3;
  ${props => props.sticky ? 'position: sticky; top: 0;' : ''}
`;

S.Left = styled.div`
  display: flex;
`;

S.SubMenus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
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
  justify-content: space-between;
  ${props => props.dark ? 'background: rgba(0, 0, 0, 0.7); color: #f5f5f7;' : 'background: rgba(245, 245, 247, 0.7); color: #1d1d1f;'}
  backdrop-filter: saturate(180%) blur(20px);
  padding: 0 20px;
  ${props => props.align && 'justify-content: center;'}
`;

S.Menu = styled.div`
  margin: 0 20px;
  opacity: .8;
  transition: opacity 0.3s;
  font-weight: bold;
  font-size: 13px;
  &:hover{
    cursor: pointer;
    opacity: 1;
  }
  display: flex;
  align-items: center;
`;

S.Logo = styled(S.Menu)`
  font-family: 'Montserrat', 'Pretendard';
  font-size: 18px;
  font-weight: 800;
  display: flex;
  align-items: center;
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
  background: white;
  border: 1px solid #d2d2d7;
  top: 45px;
  border-radius: 15px;
  &::before{
    position: absolute;
    height: 10px;
    width: 10px;
    top: 0;
    transform: translateX(38px) translateY(-6px) rotate(45deg);
    background: white;
    border-top: 1px solid #d2d2d7;
    border-left: 1px solid #d2d2d7;
    content: '';
  }
`;

S.Drop = styled.div`
  padding: 20px 5px;
  width: 90px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  opacity: .8;
  color: #1d1d1f;
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

S.Brand = styled.div`
  font-size: 12px;
  margin-left: 10px;
  max-width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;