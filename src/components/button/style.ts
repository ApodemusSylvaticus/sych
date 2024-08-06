import styled from 'styled-components';

export const Button = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  border-radius: 4px;
  color: #1e1e1e;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #dfd0fc;
  }
`;
