Test task:
Please see exam details below.

You will need to implement a status mgmt. system.

General:

Our server receives employee status changes

Rest server

Status can be one of the following:

a. Working

b. OnVacationser

c. LunchTime

d. BusinessTrip

Example call:

Get - http://localhost:8000/users

Post - http://localhost:8000/users/:userId example body: { status: “Working” }

Where userId is the user identifier



Environment:

Attached server.txt file that you can use in order to run a basic express server (full-stack developer should implement the server yourself).

Please create a react app and make sure you have basic connectivity with the server



Requirements:

Enable the user to see a list of all employees

Enable the user to filter the list based on status

Enable the user to search the list of employees

Changing the status and applying should update the user status

Enable status filter reset

Enable add user functionality



Notes:

The system should be working as expected and convenient

Keep clean code and proper functionality

Try to be as pixel perfect as you can (no need to measure pixels from the PDF but try to nail the style)



Bonus:

Try to optimize your application rendering