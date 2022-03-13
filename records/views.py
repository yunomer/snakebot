from datetime import datetime
from django.views.generic import ListView
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from records.models import GameRecord, Plays
import json

class RecordView(ListView):
    model = GameRecord

def createRecord(request: HttpRequest):
    if request.method == "POST":
        date = datetime.fromtimestamp(int(request.POST["dateTime"]))
        plays = json.loads(request.POST["data"])
        gameRecord = GameRecord.objects.create(datetime=date)
        for play in plays:
            rawMoveType = play["moveType"]
            rawSpaces = play["steps"]
            moveType = 0
            if rawMoveType == "UP":
                moveType = 0
            elif rawMoveType == "DOWN":
                moveType = 1
            elif rawMoveType == "LEFT":
                moveType = 2
            elif rawMoveType == "RIGHT":
                moveType = 3

            Plays.objects.create(
                gameRecord = gameRecord,
                moveType = moveType,
                spaces = rawSpaces
            )

    return HttpResponse(status=204)