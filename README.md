# VideoOnDemand

This application is built on MEAN stack. Technology and library used are as follows.
1. Node.js
2. Express.js
3. Sails.js
4. forever
4. Angular.js
5. jQuery
6. MongoDB
7. HTML5 and CSS3

You can find the working example in the link - http://ec2-54-179-132-117.ap-southeast-1.compute.amazonaws.com/
 
## Application Features
1.	Application should display a list of videos in a horizontal carousel on the home page which can be scrollable.
2.	User should be able to select a video to play in full screen.
3.	When the video is finished, the application should go back to the previous page.
4.	The user should be able to use a mouse and keyboard to select the video.
5.	The user should be able to see a list of videos they have previously watched.
6.	The application must be responsible to changing screen sizes. You do not need to implement a mobile view but it should at least adjust based on the desktop browser width.

## Concepts
### Localstorage
This is Video on demand application. Users can be able to watch the movies online. This application will persist the user history and will be stored in localStorage of the browser. 

Wehenever the application's history tab is loaded, it will first check whether user has already vsited the site, by checking the localStorage. If user has already visted, then list of movies will be retrieved from the server. Else it will create new clientId for the user.

As localStorage is not bound to browser session, it can be retrieved in subsequent sessions. Note- localStorage will be lost when user clears the browser history and cache manually.

### HTML5 video
HTML5 has added the feature to embed the video in HTML itself. We no need to use flash plugins. Latest versions of Chrome and Firefox will support most of html5 attributes.

video element in HTML comes along with events. We can bind the events to capture them. Ex- If I want to minimize the video when movie ends, in that case, I just have to bind the "ended" event and on capture of this event, toggle the screen.

### Key Navigation
Bind the key events to capture it. Based on the key stroke, we can scroll the corousel left, right or play the video.

## Installation

### Web Application
1. Install the apache tomcat in the local machine. Follow the steps - https://tomcat.apache.org/download-70.cgi
2. Create the WAR file from the "VOD-webapp"
3. Put the WAR is webapp directory and start the server.
 
### API 
1. Install the node server. Follow the steps - https://docs.npmjs.com/getting-started/installing-node
2. Install sails.js. Follow the steps - http://sailsjs.org/get-started
3. Copy the "VOD-node" into desired folder and execute the following command to install the dependencies. 
  npm install
4. After successfull installation, execute the following command to start the server.
  sails lift

### Database
1. Install the mongoDB. follow the steps - https://docs.mongodb.org/manual/installation/
2. Start the server on port 27017


