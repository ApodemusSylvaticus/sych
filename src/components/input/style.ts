import styled from 'styled-components';

interface StyledTextFieldProps {
  focused: boolean;
}

export const StyledTextField = styled.div<StyledTextFieldProps>`
  position: relative;
  width: 100%;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  padding: 0 16px 0 0;
  border: 1px solid #c4c4c4;
  border-radius: 8px;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: #1976d2;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
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

export const InputV2 = styled(Input)`
  border: none;
`;

export const BaseTextArea = styled.textarea`
  resize: none;
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

export const Button = styled.button`
  padding: 6px 12px;
  color: #1976d2;
  outline: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: none;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    color: #1565c0;
    background: rgba(25, 118, 210, 0.1);
  }

  &:active {
    outline: none;
    background: rgba(25, 118, 210, 0.1);
  }
  &:focus {
    outline: none;
  }
`;
