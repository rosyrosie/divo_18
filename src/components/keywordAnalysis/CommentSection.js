import styled from 'styled-components';

export default function CommentSection({ comment }){
  return (
    <S.Section color={'white'}>
      <S.Width>
        <S.Title>{comment.title}</S.Title>
        {comment.details.map(detail => (
          <S.Comment key={detail}>{detail}</S.Comment>
        ))}
      </S.Width>
    </S.Section>
  );
}

const S = {};

S.Section = styled.div`
  width: 100%;
  ${props => `background: ${props.color};`}
  display: flex;
  justify-content: center;
  ${props => props.isWhite ? 'color: white;' : ''}
`;

S.Width = styled.div`
  width: 60%;
  max-width: 1200px;
  display: flex;
  flex-flow: column;
  padding: 50px 0;
`;

S.Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 40px;
  color: #1d1d1f;
`;

S.Comment = styled.div`
  color: #515154;
  margin: 10px 0;
  ${props => props.isWhite ? 'color: white;' : ''}
`;