import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  border-radius: 8px;
  border: 1px solid gray;
  padding: 24px 4px 12px;
  flex-direction: column;
  gap: 12px;
  position: relative;
`;

export const CardName = styled.span`
  position: absolute;
  top: 0;
  left: 8px;
  background: rgb(${(props) => props.theme.colors.primary});
  z-index: 2;
  transform: translateY(-55%);
  font-weight: 500;
  font-size: 18px;
  padding: 0 4px;
  color: black;
`;
