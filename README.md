# project-2
CRUD App

SET UP EXPRESS APP:
(all the steps)

mkdir models
touch models/items.js

require mongoose
create a schema

export it

create routes:
index
show
create
delete
edit
update

add public folder

partials ejs

create express router

authorization routes

create index.ejs in views
create directory views/sessions and views/users
create controllers/users_controller.js
create controllers/sessions_controller.js
create models/users.js
create models/sessions.js

views/index.ejs:
this is our welcome page
boiler plate html
log in
or
sign up

views/users/new.ejs:
this is where the user will go when he signs up
create boiler plate html
create a form to sign up

in server.js
set up our const = userContorller
and
app.use('/users', userController)

then you need to have our sign up link in our index.ejs link to our users/new.ejs

---

repeat for our sessions
