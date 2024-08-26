import React, { useState, InputHTMLAttributes, TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { BaseTextArea, Input, Label, StyledTextField } from './style';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  labelStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

export const TextField: React.FC<TextFieldProps> = ({ id, label, labelStyle, inputStyle, ...props }) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <StyledTextField focused={focused}>
      <Input id={id} placeholder={''} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} {...props} style={inputStyle} />
      <Label htmlFor={id} focused={focused} style={labelStyle}>
        {label}
      </Label>
    </StyledTextField>
  );
};

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  labelStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

export const TextArea: React.FC<TextAreaProps> = React.memo(({ id, label, labelStyle, inputStyle, ...props }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextArea();
  }, [props.value]);

  const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    resizeTextArea();
    if (props.onInput) {
      props.onInput(event);
    }
  };

  return (
    <StyledTextField focused={focused}>
      <BaseTextArea
        id={id}
        ref={textareaRef}
        placeholder=""
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onInput={handleInput}
        style={inputStyle}
        {...props}
      />
      <Label htmlFor={id} focused={focused} style={labelStyle}>
        {label}
      </Label>
    </StyledTextField>
  );
});

TextArea.displayName = 'TextArea';
