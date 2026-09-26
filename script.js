const CHAR_MAP = {
    // Vowels
    'അ': 'a', 'ആ': 'aa', 'ഇ': 'i', 'ഈ': 'ee', 'ഉ': 'u', 'ഊ': 'oo', 'എ': 'e', 'ഏ': 'e', 'ഐ': 'ai', 'ഒ': 'o', 'ഓ': 'o',
    
    // Consonants (inherent 'a')
    'ക': 'ka', 'ഖ': 'kha', 'ഗ': 'ga', 'ഘ': 'gha', 'ങ': 'nga',
    'ച': 'cha', 'ഛ': 'chha', 'ജ': 'ja', 'ഝ': 'jha', 'ഞ': 'nja',
    'ട': 'ta', 'ഠ': 'tha', 'ഡ': 'da', 'ഢ': 'dha', 'ണ': 'na',
    'ത': 'tha', 'ഥ': 'tha', 'ദ': 'da', 'ധ': 'dha', 'ന': 'na',
    'പ': 'pa', 'ഫ': 'pha', 'ബ': 'ba', 'ഭ': 'bha', 'മ': 'ma',
    'യ': 'ya', 'ര': 'ra', 'ല': 'la', 'വ': 'va', 'ശ': 'sha',
    'ഷ': 'sha', 'സ': 'sa', 'ഹ': 'ha', 'ള': 'la', 'ഴ': 'zha', 'റ': 'ra',

    // Chillu letters
    'ൺ': 'n', 'ൻ': 'n', 'ർ': 'r', 'ൽ': 'l', 'ൾ': 'l', 'ൿ': 'k',

    // Vowel Signs
    'ാ': 'a', 'ി': 'i', 'ീ': 'ee', 'ു': 'u', 'ൂ': 'oo', 'െ': 'e', 'േ': 'e', 'ൈ': 'ai', 'ൊ': 'o', 'ോ': 'o', 
    'ം': 'm'
};

const CHANDRAKKALA = '്';
const VOWEL_SIGNS = ['a', 'i', 'ee', 'u', 'oo', 'e', 'ai', 'o'];

function malayalamToManglish(text) {
    // 1. Pre-process common conjuncts and special endings
    text = text.replace(/ന്റ/g, "nt"); // Fixes എന്റെ -> ente
    text = text.replace(/ര്/g, "ru");  // Fixes പേര് -> peru
    text = text.replace(/ണ്/g, "nu");  // Fixes എന്നാണ് -> ennanu
    text = text.replace(/ണ്ട/g, "nd");
    text = text.replace(/ങ്ങ/g, "ng");
    text = text.replace(/ഞ്ച/g, "nch");
    text = text.replace(/മ്പ/g, "mb");
    text = text.replace(/ക്ക/g, "kk");
    
    // 2. Standard character-by-character processing
    let result = "";
    let i = 0;
    
    while (i < text.length) {
        let char = text[i];
        
        if (CHAR_MAP[char]) {
            if (i + 1 < text.length) {
                let nextChar = text[i + 1];
                let mappedChar = CHAR_MAP[char];
                
                // If it's a consonant ending in 'a'
                if (mappedChar.endsWith('a') && mappedChar.length > 0) {
                    
                    // If next char is a vowel sign
                    if (CHAR_MAP[nextChar] && VOWEL_SIGNS.includes(CHAR_MAP[nextChar])) {
                        result += mappedChar.slice(0, -1) + CHAR_MAP[nextChar];
                        i += 2;
                        continue;
                    } 
                    // If next char is Chandrakkala
                    else if (nextChar === CHANDRAKKALA) {
                        result += mappedChar.slice(0, -1);
                        i += 2;
                        continue;
                    }
                }
            }
            result += CHAR_MAP[char];
        } else {
            result += char; // Keep spaces and English punctuation
        }
        i++;
    }
    return result;
}

// DOM Event Listener
document.getElementById('convertBtn').addEventListener('click', () => {
    const input = document.getElementById('malayalamInput').value;
    const output = malayalamToManglish(input);
    document.getElementById('manglishOutput').value = output;
});
