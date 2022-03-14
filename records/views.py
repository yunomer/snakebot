from datetime import datetime
from django.views.generic import ListView
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from records.models import GameRecord, Plays
import json
import math

class RecordView(ListView):
    queryset = GameRecord.objects.order_by('-id').all()[:10]

def createRecord(request: HttpRequest):
    if request.method == "POST":
        date = datetime.fromtimestamp(int(request.POST["dateTime"]))
        plays = json.loads(request.POST["data"])
        dx = 0
        dy = 0

        # TODO: Make this logic more efficient,
        # Perhaps remove absDistance and create GameRecord. Query and update later.
        for play in plays:
            rawMoveType = play["moveType"]
            rawSpaces = play["steps"]
            if rawMoveType == "UP":
                dx += rawSpaces
            elif rawMoveType == "DOWN":
                dx -= rawSpaces
            elif rawMoveType == "LEFT":
                dy -= rawSpaces
            elif rawMoveType == "RIGHT":
                dy += rawSpaces
        # Calculate absolute distance
        dh = math.sqrt((dx ** 2) + (dy ** 2))
        gameRecord = GameRecord.objects.create(
                datetime=date,
                absDistance=dh
        )
        for play in plays:
            rawMoveType = play["moveType"]
            rawSpaces = play["steps"]
            moveType = 0
            if rawMoveType == "UP":
                dx += rawSpaces
                moveType = 0
            elif rawMoveType == "DOWN":
                dx -= rawSpaces
                moveType = 1
            elif rawMoveType == "LEFT":
                dy -= rawSpaces
                moveType = 2
            elif rawMoveType == "RIGHT":
                dy += rawSpaces
                moveType = 3

            Plays.objects.create(
                gameRecord = gameRecord,
                moveType = moveType,
                spaces = rawSpaces
            )
    return HttpResponse(status=204)

def deleteRecord(request: HttpRequest, id):
    if request.method == "POST":
        # TODO: Validate the form before deleting stuff
        GameRecord.objects.filter(id=id).delete()
    return HttpResponseRedirect('/records')
