import styled from 'styled-components';

interface StyledTextFieldProps {
  focused: boolean;
}

export const StyledTextField = styled.div<StyledTextFieldProps>`
  position: relative;
  width: 100%;
  display: flex;
  cursor: pointer;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.4rem;
  padding: 0 0.8rem 0 0;
  border: 1px solid rgb(${(props) => props.theme.colors.secondary});
  border-radius: 8px;
  transition: border-color 0.2s;
  cursor: pointer;

  &:focus-within {
    border-color: rgb(${(props) => props.theme.colors.tabActive});
  }
`;

export const Input = styled.input`
  width: 100%;
  background: none;
  padding: 1.2rem 1.6rem;
  border: 1px solid rgb(${(props) => props.theme.colors.secondary});
  border-radius: 8px;
  font-size: 1.6rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: rgb(${(props) => props.theme.colors.tabActive});
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: 0;
    left: 1rem;
    background-color: rgb(${(props) => props.theme.colors.primary});
    padding: 0 0.4rem;
    color: rgb(${(props) => props.theme.colors.tabActive});
  }
`;

export const InputV2 = styled(Input)`
  border: none;
`;

export const BaseTextArea = styled.textarea`
  resize: none;
  width: 100%;
  border: 1px solid rgb(${(props) => props.theme.colors.secondary});
  border-radius: 8px;
  font-size: 1.6rem;
  padding: 1.2rem 1.6rem;
  min-height: 4rem;
  overflow-y: hidden;
  background: none;

  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: rgb(${(props) => props.theme.colors.tabActive});
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: 0;
    left: 1rem;
    background-color: rgb(${(props) => props.theme.colors.primary});
    padding: 0 0.4rem;
    color: rgb(${(props) => props.theme.colors.tabActive});
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
  padding: 0 1.4rem;
  pointer-events: none;
  transition: 0.2s ease all;
  color: rgb(${(props) => (props.focused ? props.theme.colors.tabActive : props.theme.colors.secondary)});
  font-size: 1.6rem;
`;

export const Button = styled.button`
  padding: 0.6rem 0.8rem;
  color: rgb(${(props) => props.theme.colors.tabActive});
  outline: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: none;
  font-size: 1.4rem;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:focus {
    outline: none;
  }

  @media (hover: hover) {
    &:hover {
      color: rgb(${(props) => props.theme.colors.primary});
      background: rgb(${(props) => props.theme.colors.tabActive});
    }
  }

  @media (hover: none) {
    &:active {
      outline: none;
      color: rgb(${(props) => props.theme.colors.primary});
      background: rgb(${(props) => props.theme.colors.tabActive});
    }
  }
`;
