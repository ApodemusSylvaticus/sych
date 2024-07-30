import styled from 'styled-components';

interface StyledTextFieldProps {
  focused: boolean;
}

export const StyledTextField = styled.div<StyledTextFieldProps>`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px 14px;
  border: 1px solid #c4c4c4;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #1976d2;
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: 0;
    left: 10px;
    background-color: white;
    padding: 0 4px;
    color: #1976d2;
  }
`;

interface LabelProps {
  focused: boolean;
}

export const Label = styled.label<LabelProps>`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 14px;
  pointer-events: none;
  transition: 0.2s ease all;
  color: ${(props) => (props.focused ? '#1976d2' : '#757575')};
  font-size: 16px;
`;
