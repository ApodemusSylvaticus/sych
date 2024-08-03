import React, { useState, InputHTMLAttributes } from 'react';
import { BaseTextArea, Input, Label, StyledTextField } from './style.ts';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export const TextField: React.FC<TextFieldProps> = React.memo(({ id, label, ...props }) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <StyledTextField focused={focused}>
      <Input id={id} placeholder={''} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} {...props} />
      <Label htmlFor={id} focused={focused}>
        {label}
      </Label>
    </StyledTextField>
  );
});

export const TextArea: React.FC<TextFieldProps> = React.memo(({ id, label, ...props }) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <StyledTextField focused={focused}>
      <BaseTextArea id={id} placeholder={''} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} {...props} />
      <Label htmlFor={id} focused={focused}>
        {label}
      </Label>
    </StyledTextField>
  );
});
