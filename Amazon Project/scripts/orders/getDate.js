import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function getDate(estimatedDate) {
  const [dateOnly] = estimatedDate.split('T');
  const modifiedDate = dayjs(dateOnly).format('MMMM D');
  return modifiedDate;
}