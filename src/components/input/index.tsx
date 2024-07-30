import React, { useState, InputHTMLAttributes } from 'react';
import { Input, Label, StyledTextField } from './style.ts';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextFieldProps> = React.memo(({ id, label, placeholder, ...props }) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <StyledTextField focused={focused}>
      <Input id={id} placeholder={placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} {...props} />
      <Label htmlFor={id} focused={focused}>
        {label}
      </Label>
    </StyledTextField>
  );
});
