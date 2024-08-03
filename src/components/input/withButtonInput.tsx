import React, { InputHTMLAttributes, useState } from 'react';
import { Button, InputV2, InputWrapper, Label, StyledTextField } from './style.ts';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  buttonLabel: string;
  onButtonClick: () => void;
}

export const WithButtonInput: React.FC<TextFieldProps> = React.memo(({ id, label, buttonLabel, onButtonClick, ...props }) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <StyledTextField focused={focused}>
      <InputWrapper>
        <InputV2 id={id} placeholder={''} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} {...props} />
        <Label htmlFor={id} focused={focused}>
          {label}
        </Label>
        <Button onClick={onButtonClick}>{buttonLabel}</Button>
      </InputWrapper>
    </StyledTextField>
  );
});
