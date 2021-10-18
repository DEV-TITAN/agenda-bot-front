import debounce from 'lodash/debounce';

export function debounceSearch(delay: number) {
  return debounce((value: string, func: (v: string) => void) => {
    func(value);
  }, delay);
}
