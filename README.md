# Assignment 02 - Web Chat Server (Instructions) - Sid is here
> Course: CSCI 2020U: Software Systems Development and Integration

## Authors
Sid Das, Sheida Ebrahimi, David Garcia

### How to run
The guide on how to run this project will be assuming the user is using Intellij IDEA and GlassFish 7.0.0.
- firstly clone the repo to your local computer
- open the repo in Intellij
- in the top right click the configuration drop down and 'Edit Configurations'
- click 'Add Configuration' and select GlassFish local 
- type domain1 into the domain entry box
- select the 'Deployment' tab and select 'spamDetector:war exploded'.
- the glassfish server has now been set up, and you can click the green arrow in the top right 
- this should automatically open a tab in your browser but if it does not then navigate to http://localhost:8080/WSChatServer-1.0-SNAPSHOT/

### How to use
Now that the server is running you should see a screen that looks like this
![dashboard.png](landing.png)
To create and join a chatroom, simply click the create and join new room button. This will prompt you for a username and notify to everybody
else in the room that you have joined. Now you can begin messaging. If another user wishes to use the same room, open another tab and paste http://localhost:8080/WSChatServer-1.0-SNAPSHOT/.
If the room the first user is in does not show up in the list of chat rooms, simply press the refresh button under the join room button and then click the button that appears to join
the room. This will repeat the username setting process and now both users should be able to talk to each other. This process can be repeated by creating more chat rooms
and swapping between rooms at the user's will. A notification will be sent to everybody else in a room whenever a user leaves and a set username prompt will always be shown
when entering a room.

Here is an example of what it would look like to use our application
![usingRoom1.png](usingRoom1.png)

There is also an About Us page you can see if you click about in the top left
![aboutUs.png](aboutUs.png)
Clicking on our names takes you to our respective GitHub pages and clicking 'Chat Server' in the top left 

### Project Improvements
The most notable improvement we made was our user interface. We have implemented a beautiful interface that is easy on the eyes 

### External Resources
