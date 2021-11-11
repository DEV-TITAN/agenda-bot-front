import React from 'react';
import { Chevron } from '../Chevron';
import { PaginationContainer, CurrentPage } from './style';

interface PaginationProps {
  currentPage: number;
  total: number;
  onNextPage(page: number): void;
  onPrevPage(page: number): void;
}

export function Pagination({
  currentPage,
  total,
  onNextPage,
  onPrevPage,
}: PaginationProps) {
  function incrementPage() {
    onNextPage(currentPage + 1);
  }

  function decrementPage() {
    onPrevPage(currentPage - 1);
  }

  return (
    <PaginationContainer>
      <Chevron
        disabled={currentPage <= 1}
        direction="left"
        onClick={decrementPage}
      />
      <div>
        <CurrentPage>
          <span>{currentPage}</span>
        </CurrentPage>
        <p>{`de ${total}`}</p>
      </div>
      <Chevron
        disabled={currentPage >= total}
        direction="right"
        onClick={incrementPage}
      />
    </PaginationContainer>
  );
}
