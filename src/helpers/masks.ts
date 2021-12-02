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
  value = value.replace(/(\d{2})(\d)/, '($1)$2');
  value = value.replace(/(\d{4,5})(\d{4})/, '$1-$2');
  return value;
}

export function translateWeekday(value: string) {
  switch (value) {
    case 'monday':
      return 'Toda segunda';
    case 'tuesday':
      return 'Toda terça';
    case 'wednesday':
      return 'Toda quarta';
    case 'thursday':
      return 'Toda quinta';
    case 'friday':
      return 'Toda sexta';
    case 'saturday':
      return 'Todo sábado';
    case 'sunday':
      return 'Todo domingo';
    default:
      return 'Houve algum erro';
  }
}

export function translateMonth(value: string) {
  switch (value) {
    case '01':
      return 'janeiro';
    case '02':
      return 'fevereiro';
    case '03':
      return 'março';
    case '04':
      return 'abril';
    case '05':
      return 'maio';
    case '06':
      return 'junho';
    case '07':
      return 'julho';
    case '08':
      return 'agosto';
    case '09':
      return 'setembro';
    case '10':
      return 'outubro';
    case '11':
      return 'novembro';
    case '12':
      return 'dezembro';
    default:
      return 'Houve algum erro';
  }
}
