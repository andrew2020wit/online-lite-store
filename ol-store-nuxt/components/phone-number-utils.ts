export const patternPhoneNumber = /^(\+?[0-9]-?){12}$/;

export function getFormatPhoneNumber(str: string) {
  const str2 = str.replace(/\D/g, '');
  return (
    '+' +
    str2.slice(0, 2) +
    '-' +
    str2.slice(2, 5) +
    '-' +
    str2.slice(5, 8) +
    '-' +
    str2.slice(8)
  );
}
