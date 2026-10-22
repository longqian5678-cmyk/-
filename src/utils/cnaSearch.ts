import {getField} from '@/utils/objUtils'
import type {StringKeys} from '@/utils/objUtils'
import {normalize, tokenize} from '@/utils/strUtils'

// These interfaces represents the structure of the CNA list data structure.

interface Cna {
  shortName: string;
  cnaId: string;
  country: string;
  organizationName: string;
  scope: string;
  CNA: CnaInfo;
}

interface CnaInfo {
  isRoot: boolean;
  roles: Array<CnaRole>;
  type: Array<string>;
}

interface CnaRole {
  helpText: string;
  role: string;
}

// This structure is used for sorting the CNA data by score.

type CnaScore = {
  cna: Cna;
  value: number;
}

// This is the priority for matching the search string with the CNA field
// values.  The higher the value, the higher the priority, so a match of
// the search string with the organization name has the highest priority.

/* eslint-disable @typescript-eslint/no-duplicate-enum-values */

enum FieldPriority {
  scope = 1,
  role = 2,
  type = 2,
  country = 2,
  shortName = 3,
  organizationName = 4
}

/* eslint-enable @typescript-eslint/no-duplicate-enum-values */

export function searchCnas(cnas: Array<Cna>, searchString: string): Array<Cna> {

  // This is the "entry point" function for searching the CNA list.  The
  // function is provided both the entire CNA list and the user's search string.
  // An array is returned for CNAs that have a positive score based on how well
  // the search string matches the contents of certain fields.  The array is
  // ordered from highest to lowest score.

  if (!searchString.trim().length)
    return [];

  // Given the CNA data and a user-entered search string, this function returns
  // an array of CNAs sorted by how closely they match the search string.

  const cnaScores = new Array<CnaScore>();

  // For each CNA, determine how closely the given search string matches one
  // or more of the CNA fields.

  cnas.forEach((cna) => {

    const cnaScore: CnaScore = {
      cna: cna,
      value: scoreCna(cna, searchString)
    };

    if (cnaScore.value)
      cnaScores.push(cnaScore);
  });

  // Sort the CNAs by score.  For matching scores, the sorting is by
  // organization name.  The score is only used for sorting, so this function
  // returns the sorted CNA array.

  const matches = cnaScores.sort((cnaScore1: CnaScore, cnaScore2: CnaScore) => {

    const scoreDiff = cnaScore2.value - cnaScore1.value;

    if (scoreDiff)
      return scoreDiff;

    const orgName1 = cnaScore1.cna.organizationName;
    const orgName2 = cnaScore2.cna.organizationName;

    return orgName1.localeCompare(orgName2, 'en', {sensitivity: 'base'});
  })
  .map(cnaScore => cnaScore.cna);

  return matches;
}

function scoreCna(cna: Cna, searchString: string): number {

  // For a given CNA and the user's search string, determine a score that
  // indicates how well the search string matches the values in the CNA's
  // fields.  The higher the score, the closer the CNA will be to the top
  // of the list of displayed CNAs.

  let score = 0;

  const normalizedSearchStr: string = normalize(searchString);

  if (!normalizedSearchStr)
    return score;

  const searchWords = tokenize(normalizedSearchStr);

  const fieldNames: Array<StringKeys<Cna>> = ['organizationName',
                                              'shortName',
                                              'country',
                                              'scope'];

  for (const fieldName of fieldNames) {

    score += fieldScore(fieldName,
                        getField(cna, fieldName),
                        normalizedSearchStr,
                        searchWords);
  }

  // The roles and types are contained within the CNA "section", so they're
  // handled separately.

  const roles = cna.CNA.roles;

  for (const roleEntry of roles) {

    score += fieldScore('role',
                        roleEntry.role,
                        normalizedSearchStr,
                        searchWords);
  }

  const types = cna.CNA.type;

  for (const type of types) {

    score += fieldScore('type',
                        type,
                        normalizedSearchStr,
                        searchWords);
  }

  return score;
}

function fieldScore(fieldName: string,
                    fieldValue: string,
                    searchStr: string,
                    words: Array<string>): number {

  // This function returns a score that indicates how much the given search
  // string matches the CNA field value.  Certain fields have a higher priority
  // over others in the searching.  The search string is provided in whole, and
  // also split into words.

  let score = 0;

  if (!fieldValue || !searchStr)
    return score;

  const normalizedFieldValue: string = normalize(fieldValue);
  const priority = FieldPriority[fieldName as keyof typeof FieldPriority];

  // Highest priority is an exact match between the search string and the
  // field.

  if (normalizedFieldValue === searchStr)
    return 100000 + priority * 1000;

  const fieldWords = tokenize(normalizedFieldValue);

  const {matchedWordCount, matchedCharCount} = prefixMatch(words, fieldWords);

  if (matchedWordCount > 0) {
    const matchRatio = matchedWordCount / words.length;

    score += 2500 * matchRatio;
    score += priority * 100 * matchedWordCount;
    score += matchedCharCount * 10;
  }

  return score;
}

function prefixMatch(searchWords: Array<string>,
                     fieldWords: Array<string>): {matchedWordCount: number;
                                                  matchedCharCount: number} {

  // Given arrays of search words entered by the user and the words of the
  // CNA field being examined, this function returns the matched number of
  // words and characters between the search words and field words.

  let searchIndex = 0;
  let matchedWordCount = 0;
  let matchedCharCount = 0;

  // We start at the first search word, looking for a field word that starts
  // with the search word.  If found, the matched word and character counts
  // are incremented, and we move to the next search word.  The matches don't
  // have to be consecutive.

  for (const fieldWord of fieldWords) {

    if (searchIndex >= searchWords.length)
      break;

    const searchWord = searchWords[searchIndex];

    if (fieldWord.startsWith(searchWord)) {

      matchedWordCount++;
      matchedCharCount += searchWord.length;
      searchIndex++;
    }
  }

  return {matchedWordCount, matchedCharCount};
}
