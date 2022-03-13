from django.db import models

# Create your models here.
class GameRecord(models.Model):
    id = models.BigAutoField(primary_key=True, editable=False)
    datetime = models.DateField()
    # img = models.ImageField()

    def __str__(self):
        return self.datetime

class plays(models.Model):
    gameRecord = models.ForeignKey(GameRecord, on_delete=models.CASCADE)
    # move = models.TextChoices("UP", "DOWN", "LEFT", "RIGHT")
    spaces = models.IntegerField()