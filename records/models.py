from django.db import models

# Create your models here.
class GameRecord(models.Model):
    datetime = models.DateField()
    absDistance = models.DecimalField(max_digits=19, decimal_places=2)

    def __str__(self):
        return str(self.datetime)

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