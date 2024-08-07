import styled from 'styled-components';

export const Button = styled.button`
  padding: 8px 16px;
  background-color: rgb(${(props) => props.theme.colors.tabDefault});
  border: 1px solid rgb(${(props) => props.theme.colors.primary});
  font-family: Lato-Bold;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s;
  color: rgb(${(props) => props.theme.colors.primary});

  &:hover {
    background-color: rgb(${(props) => props.theme.colors.tabHover});
  }
`;
