from random import shuffle
from random import seed
from random import randint
import enchant
import time
from threading import Thread
from threading import Timer
from time import sleep
import sys
import itertools
from itertools import permutations
def timer():
    for i in range(10):
        sleep(1)  # waits 45 seconds
    sys.exit()

def defineWord():
    seed()
    l = randint(0,104)
    wdLst = ["dealing","aligned", "leading", "alerted", "altered", "related", "treadle", "allergy", "gallery", "largely", "regally", "aridest",
          "astride", "staider", "tardies", "tirades", "aspired", "despair", "diapers", "praised", "astride", "staider", "tirades", "canters",
          "nectars", "recants", "scanter", "trances", "capitol", "optical", "topical","catered","created","reacted","claimed","decimal",
          "declaim","medical","darters","retards","starred","traders","dearths","hardest","hatreds","threads","trashed","demerit","merited",
          "mitered","detains","instead","sainted","stained","earnest","eastern","nearest","enlarge","general","gleaner","esprits","persist"
          ,"spriest","sprites","stripes","lusters","results","rustles","observe","obverse","verbose","parsley","parleys","players","replays"
          ,"sparely","parties","pastier","pirates","traipse","potters","protest","spotter","present","repents","serpent","rattles","starlet"
          ,"startle","realist","saltier","retails","recused","reduces","rescued","secured","repaint","painter","pertain","rosiest","sorties"
          ,"stories","saltier","realist","retails"]
    return(wdLst[l])

def points(word):
    d = enchant.Dict("en_US")
    pts = [100, 400, 1200, 2000, 3000]
    if (d.check(word) and len(word) >= 3):
        print("+ " + str(pts[len(word)-3]))
        return(pts[len(word)-3])
    else:
        print("nope")
        return(0)

def userAns():
    totPoints = 0
    timUp = time.time() + 60
    while (timUp > time.time()):
        timeout = .001
        t = Timer(timeout, print, [''])
        t.start()
        wrd = input()
        totPoints += points(wrd)
        t.cancel()
    return (totPoints)

def wrdToLst(wrd):
    rl = []
    for i in wrd:
        rl.append(i)
    return(rl)

def getAll(wd):

    fl = []
    fw = []
    perm = permutations(wd, 3)
    fl3 = (list(perm))
    perm = permutations(wd, 4)
    fl4 = (list(perm))
    perm = permutations(wd, 5)
    fl5 = (list(perm))
    perm = permutations(wd, 6)
    fl6 = (list(perm))
    perm = permutations(wd, 7)
    fl7 = (list(perm))
    d = enchant.Dict("en_US")
    for i in fl3:
        wrds = ""
        for j in i:
            wrds += j
        if(d.check(wrds)):
            fw.append(wrds)

    for i in fl4:
        wrds = ""
        for j in i:
            wrds += j
        if (d.check(wrds)):
            fw.append(wrds)
    for i in fl5:
        wrds = ""
        for j in i:
            wrds += j
        if (d.check(wrds)):
            fw.append(wrds)
    for i in fl6:
        wrds = ""
        for j in i:
            wrds += j
        if (d.check(wrds)):
            fw.append(wrds)
    for i in fl7:
        wrds = ""
        for j in i:
            wrds += j
        if (d.check(wrds)):
            fw.append(wrds)

        #fw.append(wrds)
    return(fw)

def main():
    pts = 0
    wd = wrdToLst(defineWord())
    shuffle(wd)
    print(wd)
    #print(getAll(wd))
    print(userAns())
if __name__ == "__main__":
    main()