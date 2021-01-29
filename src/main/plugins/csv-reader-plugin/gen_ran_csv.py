import random
import string

FILE_NAME = "randomGenerateResult.csv"
DEFAULT_LINE = 1000
DEFAULT_COLUMNS = 5
DEFAULT_LENGTH = 5


def randomname(n):
    randlst = [random.choice(string.ascii_letters + string.digits)
               for i in range(n)]
    return ''.join(randlst)


with open(FILE_NAME, mode="w", encoding="utf8", ) as f:
    for i in range(DEFAULT_LINE):
        line = []
        for i in range(DEFAULT_COLUMNS):
            line.append(randomname(DEFAULT_LENGTH))
        f.write(",".join(line) + "\n")
