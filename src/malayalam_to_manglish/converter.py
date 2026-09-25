import re
from .mapping import CHAR_MAP, CONSONANTS, VOWEL_SIGNS


class MalayalamToManglish:
    def __init__(self, add_vowel_for_standalone=True):
        self.add_vowel_for_standalone = add_vowel_for_standalone

    def convert(self, text: str) -> str:
        if not text:
            return ""
        result = []
        i = 0
        n = len(text)
        while i < n:
            char = text[i]
            if char in CONSONANTS:
                result.append(CONSONANTS[char])
                if i + 1 < n:
                    nxt = text[i + 1]
                    if nxt == '്':
                        i += 2
                        continue
                    elif nxt in VOWEL_SIGNS:
                        result.append(VOWEL_SIGNS[nxt])
                        i += 2
                        continue
                if self.add_vowel_for_standalone and i + 1 < n:
                    result.append('a')
            elif char in CHAR_MAP:
                result.append(CHAR_MAP[char])
            else:
                result.append(char)
            i += 1
        return ''.join(result)

    def convert_sentence(self, sentence: str) -> str:
        out = self.convert(sentence)
        return re.sub(r'\s+', ' ', out).strip()
