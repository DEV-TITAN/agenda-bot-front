export function cpfMask(value: string) {
  let num = value.replace(/\D/u, '');

  num = num.replace(/(\d{3})(\d)/u, '$1.$2');
  num = num.replace(/(\d{3})(\d)/u, '$1.$2');
  num = num.replace(/(\d{3})(\d)/u, '$1-$2');
  return num;
}

export function dateMask(value: string) {
  let num = value;
  num = num.replace(/[^0-9]/g, '');
  num = num.replace(/(\d{2})(\d{2})/, '$1/$2');
  num = num.replace(/(\d{2})(\d{2,4})/, '$1/$2');
  return num;
}

export function phoneMask(value: string) {
  value = value.replace(/[^0-9]/g, '');
  value = value.replace(/(\d{3})(\d)/, '($1)$2');
  value = value.replace(/(\d{4,5})(\d{4})/, '$1-$2');
  return value;
}
