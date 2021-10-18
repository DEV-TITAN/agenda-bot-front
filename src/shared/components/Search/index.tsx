import React, { InputHTMLAttributes } from 'react';
import { SearchContainer } from './style';

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange(value: React.ChangeEvent<HTMLInputElement>): void;
}

export function Search({ placeholder, onChange }: SearchProps) {
  return (
    <SearchContainer
      placeholder={placeholder ?? ''}
      onChange={e => onChange(e)}
      type="text"
    />
  );
}
