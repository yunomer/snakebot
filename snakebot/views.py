from re import template
from django.views.generic import TemplateView

from django.shortcuts import render
from django.http import HttpResponse

def GameView(response):
    return render(response, "game.html")
