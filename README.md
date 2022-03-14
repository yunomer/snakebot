# SnakeBot

This is a simply Django app that lets users play with a tiny dot named "Bot". The objective of the player is to help move Bot from it's current location to the exit point which is the red dot. During this time, all movements are recorded.

Once the player reaches the objective, they win! Players will be able to view all the steps they took and some other stats on the record page.

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

## Some TODOs
- [X] Create Branch: Update Game homepage, let users view steps they take (live)
- [ ] Figure out: O(n) better than insert and update?
- [X] Add delete button
- [ ] Add Delete form sanitation and validation
- [X] Limit query to only 10
- [x] Fix Game end button to redirect to records page
- [ ] Rework database insertion, remove redundent iteration
- [x] Fix Height styling
- [x] Add README explaining how game is played
