from django.shortcuts import render

def RecordView(response):
    return render(response, "records.html")

def createRecord(response):
    if response.method == "POST":
        print(response)