const CHAR_GROUP = [
        'aiueo', // vowel groups
        'btd',
        'khx',
        'fmn',
        'lrw',
        '=', // empty consonant
        ' -.' // valid punctuations
    ];

class Syllable {
    /**
     * Create a syllable
     * @param {String} chars Character(s) to convert to syllable
     */
    constructor(chars) {
        this.chars = chars;
        // deal with consonant
        let info = Syllable.getIndex(chars[0])
        this.group = info.group;
        this.index = info.index;
        if (this.group > 4) return this; // punctuation group
        // last character will always be syllable
        info = Syllable.getIndex(chars.at(-1));
        this.vowel = info.index;
        return this;
    }
    /**
     * Get index information of the character
     * @param {String} char Character to get information
     */
    static getIndex(char) {
        for (let l1 in CHAR_GROUP)
        if (CHAR_GROUP[l1].includes(char))
            return {
                group: Number(l1),
                index: CHAR_GROUP[l1].indexOf(char)
            }
    }
}

/**
 * Split a string of text into syllables
 * @param {String} text Text in Latin Milaru
 * @returns {Syllable[]}
 */
function splitText(text) {
    text = text.toLowerCase();

    let result = [];
    for (let l1 = 0; l1 < text.length; l1++) {
        let char = text[l1];
        let info = Syllable.getIndex(char);
        if (info.group == 0 || info.group > 4)
            result.push(new Syllable(char))
        else {
            result.push(new Syllable(char + text[l1 + 1]));
            l1++; // skip
        }
    }
    return result;
}