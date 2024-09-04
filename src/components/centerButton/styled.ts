import styled from 'styled-components';

export const Container = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
  opacity: var(--conditional-opacity);
  transition: opacity 0.3s ease;
  position: absolute;
  right: 16px;
  border-radius: 8px;
  bottom: calc(114px + 40px + 8px);
  background: rgb(${(props) => props.theme.colors.menuBg});
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    width: 80%;
    height: 80%;
  }
`;
