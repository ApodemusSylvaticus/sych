import styled from 'styled-components';

export const Question = styled.div`
  font-size: 1.8rem;
  color: rgb(${(props) => props.theme.colors.menuBg});
  text-align: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;
