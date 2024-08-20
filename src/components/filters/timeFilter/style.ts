import styled from 'styled-components';

export const CheckpointContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const CheckpointLabel = styled.label`
  font-size: 1.8rem;
  line-height: 1.5;
  color: rgb(${(props) => props.theme.colors.primary});
  margin-left: 0.8rem;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 100%;
  width: 100%;
`;

export const StyledCheckbox = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  border: 2px solid rgb(${(props) => props.theme.colors.primary});
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);
  }

  &:hover {
    background-color: rgba(25, 118, 210, 0.04);
  }
`;

export const CheckMark = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`;

export const ModalContent = styled.div`
  background: white;
  z-index: 2;
  position: relative;
  padding: 1.6rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const DatePickerOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: transparent;
  top: 0;
  left: 0;
  cursor: pointer;
`;
