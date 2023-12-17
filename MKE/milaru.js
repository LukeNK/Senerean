const CHAR_GROUP = [
        'aiuoe', // vowel groups
        'btd',
        'khx',
        'fmn',
        'lrw',
        ' -.,', // valid punctuations
        '\n/', // control characters
    ];

class Syllable {
    /**
     * Create a syllable
     * @param {String} chars Character(s) to convert to syllable
     * @returns {Syllable}
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
     * @returns {Object|false}
     */
    static getIndex(char) {
        for (let l1 in CHAR_GROUP)
        if (CHAR_GROUP[l1].includes(char))
            return {
                group: Number(l1),
                index: CHAR_GROUP[l1].indexOf(char)
            }
        return false;
    }
}

/**
 * Split a string of text into syllables
 * @param {String} text Text in Latin Milaru
 * @returns {Syllable[]}
 */
function splitText(text) {
    let result = [];
    for (let l1 = 0; l1 < text.length; l1++) {
        let char = text[l1].toLowerCase();
        let info = Syllable.getIndex(char);
        if (info?.group == 0 || info?.group > 4)
            result.push(new Syllable(char))
        else if (info) {
            // if it is valid, it is consonant
            result.push(new Syllable((char + text[l1 + 1]).toLowerCase()));
            l1++; // skip
        } else {
            // strange character, scan ahead until see a punctuation
            let l2 = l1;
            for (; l2 < text.length; l2++)
                if (Syllable.getIndex(text[l2]).group == 5)
                    break;
            result.push({chars: text.substring(l1, l2)})
            l1 = l2 - 1; // skip
        }
    }
    return result;
}