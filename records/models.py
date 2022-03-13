from django.db import models

# Create your models here.
class GameRecord(models.Model):
    id = models.BigAutoField(primary_key=True, editable=False)
    datetime = models.DateField()

    def __str__(self):
        return self.datetime

class Plays(models.Model):
    MOVE_TYPES = (
        (0, 'UP'),
        (1, 'DOWN'),
        (2, 'LEFT'),
        (3, 'RIGHT'),
    )
    gameRecord = models.ForeignKey(to=GameRecord, on_delete=models.CASCADE)
    moveType = models.PositiveSmallIntegerField(choices=MOVE_TYPES, blank=False)
    spaces = models.IntegerField()