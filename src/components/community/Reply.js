import styled from "styled-components";
import { ReactComponent as Delete } from "@/assets/CommunityCommentDelete.svg";
import { COMMUNITY_REPLY_DELETE_URL } from "@api";
import axios from "axios";

export default function ReplyComponent({ reply, i, aa, setAA }) {

  const token = localStorage.getItem('token');

  const _onReplyDeleteClick = () => {
    if(!window.confirm('답글을 삭제하시겠습니까?')) return;
    axios.delete(COMMUNITY_REPLY_DELETE_URL+reply.commentId, {headers: {"Authorization": `Token ${token}`}}).then((res) => {
      setAA(!aa);
    });
  };

  return (
    <S.Reply>
      <S.CommentFirst>
        <S.WriterDateBox>
          <S.CommentWriter>{reply.writer}</S.CommentWriter>
          <S.CommentDate>{reply.lastEdited?.replaceAll('T', ' ').slice(0, -4)}</S.CommentDate>
        </S.WriterDateBox>
        {reply.isMine||(localStorage.getItem('isStaff')==='true') ?<S.ReplyDelete onClick={_onReplyDeleteClick}>
          <Delete width={15} height={15} />
        </S.ReplyDelete> : null}
      </S.CommentFirst>
      <S.ReplyContent>{reply.mainText}</S.ReplyContent>
    </S.Reply>
  );
}

const S = {};

S.ReplyDelete = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;

S.WriterDateBox = styled.div`
  display: flex;
`;

S.Reply = styled.div`
  display: flex;
  flex-flow: column;
  padding: 15px 5px 15px 35px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #d2d2d7;
`;

S.CommentFirst = styled.div`
  display: flex;
  align-items: end;
  padding-bottom: 7px;
  justify-content: space-between;
`;

S.CommentWriter = styled.div`
  font-size: 13px;
  padding-right: 3px;
`;

S.CommentDate = styled.div`
  font-size: 11px;
  color: #aaaaaa;
`;

S.ReplyContent = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding: 4px 0;
  white-space: pre-wrap;
`;