import styled from 'styled-components';

export const CheckpointContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const CheckpointLabel = styled.label`
  font-size: 18px;
  line-height: 1.5;
  color: rgb(${(props) => props.theme.colors.primary});
  margin-left: 8px;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 100%;
  width: 100%;
`;

export const StyledCheckbox = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgb(${(props) => props.theme.colors.primary});
  border-radius: 2px;
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
