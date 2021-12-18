from django.db import models
import string
import random


# Create your models here.

def generate_unique_code():
    leng = 6
    while (True):
        code = ''.join(random.choices(string.ascii_uppercase, k = leng))
        if Room.objects.filter(code=code).count() == 0:
            break
    return code

class Room(models.Model):
    code = models.CharField(max_length= 8, default=generate_unique_code, unique=True)
    is_host = models.CharField(max_length=50, unique=True)
    guest_can_play = models.BooleanField(null=False, default=False)
    hidden_num = models.IntegerField(null=False, default=1)
    ana_word = models.CharField(max_length=10, default="gfgdf")
    all_words = models.CharField(max_length=200)
