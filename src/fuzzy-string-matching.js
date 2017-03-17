/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable brace-style */
/* To fix, remove an entry above, run "make linc", and fix errors. */

// A collection of string matching algorithms used for school and filter
// matching in the LearnStorm signup process.

// Filters react-select options and sorts by similarity to a search filter.
// Handles partial matches, ex. searching for Waberg High will find Raoul
// Wallenberg Traditional High School. Case insensitive. Ignores
// nonalphanumeric characters, and treats unaccented and Irish accented
// characters as matching (ex, Í and I).
function filterOptions(options, filter) {
    // If the filter is blank, return the full list of options.
    if (!filter) {
        return options;
    }

    const cleanFilter = cleanUpText(filter);
    return options
        // Filter out undefined or null options.
        .filter(({label, value}) => label != null && value != null)
        // Create a {score, option} pair for each option based on name
        // similarity to the filter text.
        .map(option => ({
            option: option,
            score: typeaheadSimilarity(cleanUpText(option.label), cleanFilter),
        }))
        // Only include matches of the entire substring, with a slight
        // affordance for transposition or extra characters.
        .filter(pair => pair.score >= cleanFilter.length - 2)
        // Sort 'em by order of their score.
        .sort((a, b) => b.score - a.score)
        // ...and grab the original options back out of their pairs.
        .map(pair => pair.option);
}

// Scores the similarity between two strings by returning the length of the
// longest common subsequence. Intended for comparing strings of different
// lengths; for example, when matching a typeahead search input with a school
// name.
//
// Meant for use in an instant search box where results are being fetched
// as a user is typing.
function typeaheadSimilarity(a, b) {
    const aLength = a.length;
    const bLength = b.length;
    const table = [];

    if (!aLength || !bLength) { return; }

    // Early exit if `a` startsWith `b`; these will be scored higher than any
    // other options with the same `b` (filter string), with a preference for
    // shorter `a` strings (option labels).
    if (a.indexOf(b) === 0) {
        return bLength + 1 / aLength;
    }

    // TODO(riley): It would be nice if subsequence *proximity* was factored
    //              in. For example, a filter string of "AL" should match
    //              "wALnut grove" before it matches "wAtsonviLle"

    // Initialize the table axes:
    //
    //    0 0 0 0 ... bLength
    //    0
    //    0
    //
    //   ...
    //
    // aLength
    //
    for (let x = 0; x <= aLength; ++x) { table[x] = [0]; }
    for (let y = 0; y <= bLength; ++y) { table[0][y] = 0; }

    // Populate the rest of the table with a dynamic programming algorithm.
    for (let x = 1; x <= aLength; ++x) {
        for (let y = 1; y <= bLength; ++y) {
            table[x][y] = a[x - 1] === b[y - 1] ?
                1 + table[x - 1][y - 1] :
                Math.max(table[x][y - 1], table[x - 1][y]);
        }
    }

    // TODO(riley): If we end up wanting to highlight matched characters in the
    // results list, we can add a backtrack function here to return the full
    // subsequence.
    return table[aLength][bLength];
}

// Returns the Levenshtein distance between two strings.
// NOTE(riley): The Jaro-Winkler distance also worked well and is slightly
//              more performant. Levenshtein seems to match more
//              reliably, which is the important metric here.
function fullStringDistance(a, b) {
    const aLength = a.length;
    const bLength = b.length;
    const table = [];

    if (!aLength) { return bLength; }
    if (!bLength) { return aLength; }

    // Initialize the table axes:
    //
    //    0 1 2 3 4 ... bLength
    //    1
    //    2
    //
    //   ...
    //
    // aLength
    //
    for (let x = 0; x <= aLength; ++x) { table[x] = [x]; }
    for (let y = 0; y <= bLength; ++y) { table[0][y] = y; }

    // Populate the rest of the table with a dynamic programming algorithm.
    for (let x = 1; x <= aLength; ++x) {
        for (let y = 1; y <= bLength; ++y) {
            table[x][y] = a[x - 1] === b[y - 1] ?
                table[x - 1][y - 1] :
                1 + Math.min(
                    table[x - 1][y],      // Substitution,
                    table[x][y - 1],      // insertion,
                    table[x - 1][y - 1]); // and deletion.
        }
    }

    return table[aLength][bLength];
}

// Convert accented characters to basic form, remove non-alphanumeric
// characters, and convert all letters to uppercase.
// ex. 'Scoil Bhríde Primary School' becomes 'SCOILBHRIDEPRIMARYSCHOOL'
function cleanUpText(name) {
    if (!name) {
        return '';
    }

    // Uppercase and remove all non-alphanumeric, non-accented characters.
    // Also remove underscores.
    name = name.toUpperCase().replace(/((?=[^\u00E0-\u00FC])\W)|_/g, '');

    // Replace all strings in `stringSubstitutions` with their standardized
    // counterparts.
    return Object.keys(stringSubstitutions)
        .reduce((unaccented, character) => {
            const accented = new RegExp(character, 'g');
            return unaccented.replace(
                accented, stringSubstitutions[character]);
        }, name);
}

// A collection of strings with multiple spellings or variations that we expect
// to match, for example accented characters or abbreviatable words.
// TODO(riley): Open this up to the whole team.
const stringSubstitutions = {
    'Á': 'A',
    'À': 'A',
    'É': 'E',
    'È': 'E',
    'Ê': 'E',
    'Í': 'I',
    'Î': 'I',
    'Ì': 'I',
    'Ó': 'O',
    'Ö': 'O',
    'Ú': 'U',
    'Ù': 'U',
    'Ü': 'U',
    'SAINT': 'ST',
    'MOUNT': 'MT',
    'PARK': 'PK',
    'AVENUE': 'AVE',
    'BOULEVARD': 'BLVD',
    'DRIVE': 'DR',
    'ROAD': 'RD',
    'STREET': 'ST',
    '\\\.': '',
};

module.exports = {
    cleanUpText: cleanUpText,
    filterOptions: filterOptions,
    fullStringDistance: fullStringDistance,
    typeaheadSimilarity: typeaheadSimilarity,
};
