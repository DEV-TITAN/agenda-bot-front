export function getDateBrazilian(date: string) {
  const yearAndMonth = date.split('-');
  const day = yearAndMonth[2].split('T');

  return `${day[0]}/${yearAndMonth[1]}/${yearAndMonth[0]}`;
}
