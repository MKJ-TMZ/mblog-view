export function isEmpty(value: string | undefined | null | number): boolean {
  return value === null
    || value === 'null'
    || value === undefined
    || value === 'undefined'
    || value === ''
    || (value + '').trim() === '';
}

export function isNotEmpty(value: string | undefined | null | number): boolean {
  return !isEmpty(value)
}
