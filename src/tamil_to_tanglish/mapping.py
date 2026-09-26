# src/tamil_to_tanglish/mapping.py

VOWELS = {
    'அ': 'a', 'ஆ': 'aa', 'இ': 'i', 'ஈ': 'ee', 'உ': 'u', 'ஊ': 'oo',
    'எ': 'e', 'ஏ': 'e', 'ஐ': 'ai', 'ஒ': 'o', 'ஓ': 'o', 'ஔ': 'au',
}

VOWEL_SIGNS = {
    'ா': 'aa', 'ி': 'i', 'ீ': 'ee', 'ு': 'u', 'ூ': 'oo',
    'ெ': 'e', 'ே': 'e', 'ை': 'ai', 'ொ': 'o', 'ோ': 'o', 'ௌ': 'au',
}

# Consonants MUST have their inherent 'a' sound for the stripping logic to work
CONSONANTS = {
    'க': 'ka', 'ங': 'nga', 'ச': 'cha', 'ஞ': 'nja', 'ட': 'ta', 'ண': 'na',
    'த': 'tha', 'ந': 'na', 'ப': 'pa', 'ம': 'ma', 'ய': 'ya', 'ர': 'ra',
    'ல': 'la', 'வ': 'va', 'ழ': 'zha', 'ள': 'la', 'ற': 'ra', 'ன': 'na',
    # Grantha Consonants
    'ஷ': 'sha', 'ஸ': 'sa', 'ஹ': 'ha', 'ஜ': 'ja', 'க்ஷ': 'ksha',
}

OTHERS = {
    '்': '',  # Pulli (equivalent to Malayalam Chandrakkala, strips the 'a')
    'ஃ': 'ah' # Aytam
}

# Combine them all into the final map
CHAR_MAP = {**VOWELS, **VOWEL_SIGNS, **CONSONANTS, **OTHERS}

# Variable used by the converter logic to identify the muting character
PULLI = '்'
