import styled from 'styled-components';

export const OpacityFullSizeContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
`;

export const FullSizeModalContainer = styled.div`
  position: absolute;
  z-index: 150;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
`;

export const ContentContainer = styled.div`
  width: min(60%, 450px);
  height: 70%;
  border-radius: 16px;
  background: ${(props) => props.theme.colors.primary};
  position: relative;
  z-index: 2;
`;
