# SnakeBot

This is a simply Django app that lets users play with a tiny dot named "Bot". The objective of the player is to help move Bot from it's current location to the exit point which is the red dot.

![Alt text](https://github.com/yunomer/snakebot/blob/main/snakebot/static/images/snakebot.png "Game image")

## Getting up and running

This app requires [Python 3.7](https://www.python.org/downloads/) or greater.

Run the following commands on your Mac to get up and running:

```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Your app should be running at http://localhost:8000
