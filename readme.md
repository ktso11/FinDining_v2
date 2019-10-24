# Findining Version 2 (Work in progress)
Rebuilding v2 of Food Truck finding app, Findining.
Genre: Services/Food
By: Katie So

Version 1: https://github.com/ktso11/project1-findining

# To view
Heroku: https://findining.herokuapp.com/
or Run on localhost:
- npm install
- run nodemon
- run mongod
- go to http://localhost:3400


# Updates 10/12 - 10/23
- set up user model
- auth with passport is up
- created routes and api
- Create and edit Users is complete
- google map with geocode and infoWindow complete
- views are working with ejs
- truck list added to map views
- truck list is interactive with map

# Next Step:
- Angular for frontend
- Incorporate flash messages
- More styling to come

## Audience:
finDining is the go-to app for anyone looking to see where the local food trucks are. To find food trucks, simply click on the CTA presented on the landing page, a interactive Google map will be there to show users where trucks are located.

We rely on food truck owners to sign up for an account and enter in their location.


## Data Model ERD
User: username, truck name, location, food type


## MVP
- User (truck owner) login
- Authorization
- Interactive Google map
- Create, edit users

## Hi-Fi Mock of landing page
<img class="img-fluid" src="https://ktso11.github.io/FinDining_v2/public/assets/mock.png" width="300" height="375">
