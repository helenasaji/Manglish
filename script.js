// --- MALAYALAM SETUP ---
const MAL_CHAR_MAP = {
    'അ': 'a', 'ആ': 'aa', 'ഇ': 'i', 'ഈ': 'ee', 'ഉ': 'u', 'ഊ': 'oo', 'എ': 'e', 'ഏ': 'è', 'ഐ': 'ai', 'ഒ': 'o', 'ഓ': 'ò',
    'ക': 'ka', 'ഖ': 'kha', 'ഗ': 'ga', 'ഘ': 'gha', 'ങ': 'nga', 'ച': 'cha', 'ഛ': 'chha', 'ജ': 'ja', 'ഝ': 'jha', 'ഞ': 'nja',
    'ട': 'ta', 'ഠ': 'tha', 'ഡ': 'da', 'ഢ': 'dha', 'ണ': 'na', 'ത': 'tha', 'ഥ': 'tha', 'ദ': 'da', 'ധ': 'dha', 'ന': 'na',
    'പ': 'pa', 'ഫ': 'pha', 'ബ': 'ba', 'ഭ': 'bha', 'മ': 'ma', 'യ': 'ya', 'ര': 'ra', 'ല': 'la', 'വ': 'va', 'ശ': 'sha',
    'ഷ': 'sha', 'സ': 'sa', 'ഹ': 'ha', 'ള': 'la', 'ഴ': 'zha', 'റ': 'ra',
    'ൺ': 'n', 'ൻ': 'n', 'ർ': 'r', 'ൽ': 'l', 'ൾ': 'l', 'ൿ': 'k',
    'ാ': 'a', 'ി': 'i', 'ീ': 'ee', 'ു': 'u', 'ൂ': 'oo', 'െ': 'e', 'േ': 'è', 'ൈ': 'ai', 'ൊ': 'o', 'ോ': 'ò', 'ം': 'm',
    '്': '',
    '¢': 'nta', '£': 'tta', '¤': 'nda', '¥': 'nga', '¦': 'ncha', '§': 'mba', '¨': 'kka',
    '«': 'tta' // Placeholder for ട്ട
};
const MAL_CHANDRAKKALA = '്';

// --- TAMIL SETUP ---
const TAMIL_CHAR_MAP = {
    'அ': 'a', 'ஆ': 'aa', 'இ': 'i', 'ஈ': 'ee', 'உ': 'u', 'ஊ': 'oo', 'எ': 'e', 'ஏ': 'è', 'ஐ': 'ai', 'ஒ': 'o', 'ஓ': 'ò', 'ஔ': 'au',
    'க': 'ka', 'ங': 'nga', 'ச': 'cha', 'ஞ': 'nja', 'ட': 'ta', 'ண': 'na', 'த': 'tha', 'ந': 'na', 'ப': 'pa', 'ம': 'ma',
    'ய': 'ya', 'ர': 'ra', 'ல': 'la', 'வ': 'va', 'ழ': 'zha', 'ள': 'la', 'ற': 'ra', 'ன': 'na',
    'ஷ': 'sha', 'ஸ': 'sa', 'ஹ': 'ha', 'ஜ': 'ja', 'க்ஷ': 'ksha', 
    'ா': 'a', 'ி': 'i', 'ீ': 'ee', 'ு': 'u', 'ூ': 'oo', 'ெ': 'e', 'ே': 'è', 'ை': 'ai', 'ொ': 'o', 'ோ': 'ò', 'ௌ': 'au',
    '்': '',
    '©': 'tra' // Placeholder for ற்ற
};
const TAM_PULLI = '்';

const VOWEL_SIGNS = ['a', 'i', 'ee', 'u', 'oo', 'e', 'è', 'ai', 'o', 'ò', 'au'];

// --- CONVERSION LOGIC ---
function transliterate(text, isMalayalam) {
    let charMap = isMalayalam ? MAL_CHAR_MAP : TAMIL_CHAR_MAP;
    let mutingChar = isMalayalam ? MAL_CHANDRAKKALA : TAM_PULLI;

    if (isMalayalam) {
        text = text.replace(/ന്റ/g, "¢").replace(/ൻ്റ/g, "¢").replace(/ൻറ/g, "¢");
        text = text.replace(/റ്റ/g, "£").replace(/ണ്ട/g, "¤").replace(/ങ്ങ/g, "¥");
        text = text.replace(/ഞ്ച/g, "¦").replace(/മ്പ/g, "§").replace(/ക്ക/g, "¨");
        text = text.replace(/ട്ട/g, "«"); 
        text = text.replace(/ര്/g, "ru").replace(/ണ്/g, "nu");
    } else {
        text = text.replace(/ற்ற/g, "©");
    }

    let result = "";
    let i = 0;
    
    while (i < text.length) {
        let char = text[i];
        
        if (charMap[char] !== undefined) {
            let mappedChar = charMap[char];
            
            // Dynamic pronunciation rule for 'ട'
            if (isMalayalam && char === 'ട') {
                if (i === 0 || /[\s\.,!?(){}[\]"'\n]/.test(text[i - 1])) {
                    mappedChar = 'ta';
                } else {
                    mappedChar = 'da';
                }
            }

            if (i + 1 < text.length) {
                let nextChar = text[i + 1];
                
                if (mappedChar.endsWith('a') && mappedChar.length > 0) {
                    if (charMap[nextChar] !== undefined && VOWEL_SIGNS.includes(charMap[nextChar])) {
                        result += mappedChar.slice(0, -1) + charMap[nextChar];
                        i += 2;
                        continue;
                    } 
                    else if (nextChar === mutingChar) {
                        result += mappedChar.slice(0, -1);
                        i += 2;
                        continue;
                    }
                }
            }
            result += mappedChar; 
        } else {
            result += char; 
        }
        i++;
    }
    return result;
}

// --- UI STATE MANAGEMENT & DOM SAFETY ---
let currentMode = 'malayalam';

const tabMal = document.getElementById('tabMalayalam');
const tabTam = document.getElementById('tabTamil');
const inputField = document.getElementById('indicInput');
const outputField = document.getElementById('englishOutput');
const title = document.getElementById('appTitle');
const convertBtn = document.getElementById('convertBtn');
const themeBulb = document.getElementById('themeToggleBulb');

if (tabMal && tabTam) {
    tabMal.addEventListener('click', () => {
        currentMode = 'malayalam';
        tabMal.classList.add('active');
        tabTam.classList.remove('active');
        if (inputField) {
            inputField.placeholder = "മലയാളം ഇവിടെ ടൈപ്പ് ചെയ്യുക...";
            inputField.value = "";
        }
        if (title) title.innerText = "Manglish Converter";
        if (outputField) outputField.value = "";
    });

    tabTam.addEventListener('click', () => {
        currentMode = 'tamil';
        tabTam.classList.add('active');
        tabMal.classList.remove('active');
        if (inputField) {
            inputField.placeholder = "தமிழில் இங்கே தட்டச்சு செய்யவும்...";
            inputField.value = "";
        }
        if (title) title.innerText = "Tanglish Converter";
        if (outputField) outputField.value = "";
    });
}

if (convertBtn && inputField && outputField) {
    convertBtn.addEventListener('click', () => {
        const text = inputField.value;
        const isMalayalam = currentMode === 'malayalam';
        outputField.value = transliterate(text, isMalayalam);
    });
}

// --- DARK MODE TOGGLE ---
let isDarkMode = false;

if (themeBulb) {
    themeBulb.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode', isDarkMode);
        
        // Updates image source between the two files in the images folder
        themeBulb.src = isDarkMode ? 'images/notglowingbulb.png' : 'images/glowingbulb.png';
    });
}
