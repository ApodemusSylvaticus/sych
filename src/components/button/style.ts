import styled from 'styled-components';

export const Button = styled.button`
  padding: 0.8rem 1.6rem;
  background-color: rgb(${(props) => props.theme.colors.tabDefault});
  border: 1px solid rgb(${(props) => props.theme.colors.primary});
  font-family: Lato-Bold, system-ui, Avenir, Helvetica, Arial, sans-serif;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s;
  color: rgb(${(props) => props.theme.colors.primary});
  outline: none;

  @media (hover: hover) {
    &:hover {
      background-color: rgb(${(props) => props.theme.colors.tabHover});
    }
  }
`;
