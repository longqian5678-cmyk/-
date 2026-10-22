export function capitalizeWords(str: string): string {

  // Capitalize each word in the given string.  The 3rd part of the "OR"
  // in the regular expression allows for the word starting with various
  // "openings", which isn't really needed, but left for possible use
  // elsewhere.

  return str.replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
}

export function monthDayYear(yyyyMmDd: string): string {

  // Given a date-only string in YYYY-[M]M-[D]D format, this function returns a
  // string in fhr format: <Month> <day>, <year> (e.g., May 1, 2020).

  const options: Intl.DateTimeFormatOptions = {year: 'numeric',
                                               month: 'long',
                                               day: 'numeric',
                                               timeZone: 'UTC'};

  const date = new Date(yyyyMmDd);

  return date.toLocaleDateString('en-US', options);
}

export function normalize(str: string): string {

  // Normalizes the given string in the following way: converts uppercase
  // characters to lowercase, applies "NFKD" normalization, removes diacritical
  // marks (accents), removes punctuation, leading and trailing spaces, and
  // converting multiple consecutive embedded spaces to single spaces.

  const result: string = (str || '').toLowerCase()
                         .normalize('NFKD')
                         .replace(/[\u0300-\u036f]/g, '')
                         .replace(/[^\p{L}\p{N}\s]/gu, '')
                         .trim()
                         .replace(/\s+/g, ' ');

  return result;
}

export function normalizeDate(dateString: string) {

  // Normalizes a date string in the form: yyyy-[m]m-[d]d to the form
  // yyyy-mm-dd.  Note that there is no validation of the given date,
  // which may be incorrect (e.g., 2027-03-57, NOT-GOOD-DATE).

  const [year, month, day] = dateString.split('-');

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

export function tokenize(str: string): Array<string> {

  // Splits a given string after normalization.

  return normalize(str).split(' ').filter(Boolean);
}
