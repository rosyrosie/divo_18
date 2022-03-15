import { ReactComponent as Like } from "@/assets/CommunityLike.svg";
import { ReactComponent as Delete } from "@/assets/CommunityCommentDelete.svg";
import styled from "styled-components";
import { useState, useMemo } from "react";
import ReplyComponent from "@/components/community/Reply";
import { useFetch } from "@hooks";
import axios from "axios";
import { COMMUNITY_REPLY_LIST_URL, COMMUNITY_COMMENT_LIKE_URL, COMMUNITY_COMMENT_DELETE_URL } from "@api";

export default function CommentComponent({ comment, i, contentId, aa, setAA }) {
  const [like, setLike] = useState(comment.isLiked);
  const [showReply, setShowReply] = useState(false);
  const [writeReply, setWriteReply] = useState(false);
  const [a, setA] = useState(false);
  const [text, setText] = useState("");
  const token = localStorage.getItem('token');

  const { payload: result, error } = useFetch(COMMUNITY_REPLY_LIST_URL + comment.commentId, null, "GET", [a], token);

  const _onLikeClick = () => {
    axios.post(COMMUNITY_COMMENT_LIKE_URL + comment.commentId, null, {headers: {"Authorization": `Token ${token}`}});
    setLike(!like);
  };

  const _onWriteReplyClick = () => {
    if (!showReply && !writeReply) setShowReply(!showReply);
    setWriteReply(!writeReply);
  };

  const _onReplyPostClick = () => {
    axios.post(COMMUNITY_REPLY_LIST_URL + comment.commentId, { mainText: text }, {headers: {"Authorization": `Token ${token}`}});
    setText("");
    setLike(false);
    setA(!a);
  };

  const _onCommentDeleteClick = () => {
    if(!window.confirm('댓글을 삭제하시겠습니까?')) return;
    axios.delete(COMMUNITY_COMMENT_DELETE_URL + contentId + "&comment_id=" + comment.commentId, {headers: {"Authorization": `Token ${token}`}}).then(() => {
      setAA(!aa);
    });
  };

  const replyCommentList = useMemo(() => result?.replyCommentList, [result]);
  const replyCommentCount = useMemo(() => comment.replyCommentCount, [result]);

  return error ? (
    <S.Error>Error Occured on Comment</S.Error>
  ) : (
    <>
      <S.Comment>
        <S.CommentFirst>
          <S.CommentFirstBox>
            <S.CommentWriter>{comment.writer}</S.CommentWriter>
            <S.CommentDate>{comment.lastEdited?.replaceAll('T', ' ')}</S.CommentDate>
          </S.CommentFirstBox>
          {comment.isMine ? (
            <S.CommentDelete onClick={_onCommentDeleteClick}>
              <Delete width={15} height={15} />
            </S.CommentDelete>
          ) : null}
        </S.CommentFirst>
        <S.CommentContent>{comment.mainText}</S.CommentContent>
        <S.CommentSecond>
          <S.CommentLike onClick={_onLikeClick}>
            <Like fill={like ? "#111111" : "none"} stroke={like ? "white" : "black"} width="18" height="18" />
          </S.CommentLike>
          <S.CommentBottomS>{comment.isLiked ? (like ? comment.likeCount : comment.likeCount - 1) : like ? comment.likeCount + 1 : comment.likeCount}</S.CommentBottomS>
          <S.CommentBottomS> · </S.CommentBottomS>
          {replyCommentCount ? (
            <>
              <S.CommentBottom onClick={() => setShowReply(!showReply)}>
                {showReply ? "답글 닫기 (" + comment.replyCommentCount + ")" : "답글 열기 (" + comment.replyCommentCount + ")"}
              </S.CommentBottom>{" "}
              <S.CommentBottomS> · </S.CommentBottomS>
            </>
          ) : null}
          <S.CommentBottom onClick={_onWriteReplyClick}>{writeReply ? "닫기" : "답글 달기"}</S.CommentBottom>
        </S.CommentSecond>
      </S.Comment>
      {showReply ? replyCommentList.map((reply, i) => <ReplyComponent reply={reply} index={i} key={i} />) : null}
      {writeReply ? (
        <S.Replywrite>
          <S.WhiteBoxwrite>
            <S.UpperBoxwrite>{localStorage.getItem('name')}</S.UpperBoxwrite>
            <S.Textareawrite value={text} onChange={(props) => setText(props.target.value)} placeholder="답글을 입력하세요" />
            <S.BottomBoxwrite>
              <S.Buttonwrite onClick={_onReplyPostClick}>등록</S.Buttonwrite>
            </S.BottomBoxwrite>
          </S.WhiteBoxwrite>
        </S.Replywrite>
      ) : null}
    </>
  );
}

const S = {};

S.CommentFirstBox = styled.div`
  display: flex;
  align-items: center;
`;

S.CommentDelete = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;

S.Error = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

S.Replywrite = styled.div`
  display: flex;
  flex-flow: column;
  padding: 10px 7px 10px 35px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #d2d2d7;
  height: 170px;
`;

S.WhiteBoxwrite = styled.div`
  padding: 6px;
  display: flex;
  flex-flow: column;
  flex: 1;
  background-color: white;
  border-radius: 5px;
`;

S.UpperBoxwrite = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  color: #1d1d1f;
  padding: 5px;
  font-size: 13px;
`;

S.Textareawrite = styled.textarea`
  display: flex;
  flex: 1;
  border: none;
  outline-color: #eeeeee;
  border-radius: 5px;
  resize: none;
  padding: 5px;
  margin: 5px 0;
`;

S.BottomBoxwrite = styled.div`
  display: flex;
  padding: 5px 0;
  justify-content: end;
  color: #aaaaaa;
  font-size: 14px;
`;

S.Buttonwrite = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
  color: #1d1d1f;
`;

S.Comment = styled.div`
  display: flex;
  flex-flow: column;
  padding: 10px 0 15px 0;
  align-items: start;
  border-bottom: 1px solid #d2d2d7;
`;

S.CommentFirst = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
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

S.CommentContent = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding: 8px 0;
  white-space: pre-wrap;
`;

S.CommentSecond = styled.div`
  display: flex;
  align-items: center;
  padding-top: 6px;
`;

S.CommentBottom = styled.div`
  font-size: 13px;
  color: #888888;
  margin: 0 2px;
  &:hover {
    cursor: pointer;
  }
`;

S.CommentBottomS = styled.div`
  font-size: 13px;
  color: #888888;
  margin: 0 2px;
`;

S.CommentLike = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;
