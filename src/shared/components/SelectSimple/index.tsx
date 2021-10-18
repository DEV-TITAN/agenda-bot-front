import React, { ChangeEvent } from 'react';

import { SelectContainer } from './style';

interface SelectProps {
  options: string[];
  valueOption?: string;
  selectOption(event: ChangeEvent<HTMLSelectElement>): void;
}

export function SelectSimple({
  options,
  selectOption,
  valueOption,
}: SelectProps) {
  return (
    <SelectContainer>
      <select value={valueOption} onChange={selectOption}>
        {options.map((option: any) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </SelectContainer>
  );
}
