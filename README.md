### --- Deployment ---
The web application is deployed on a Heroku site:

https://graduatealready2.herokuapp.com/

https://graduatealreadyprojerct.herokuapp.com/

# Kanban Board
https://github.com/users/Keegan652/projects/1

# BoardBot

A node.js module to interface with a boardbot, running on Python Flask and served with React.

The Kilter board is a modern take on a traditional training wall. Each hold has been scrutinized for comfort and grip style, allowing one to train on open hand holds, incuts, pinches, crimps and slopers. The LED light system will light up the holds that lay out the problem before you. The layout of these holds is standardized across the globe, allowing climbers to set and climb uniform problems no matter where they are on the planet! 


### --- Before Starting --- 
   
Install Node.js on the host system.
Check successful installation by running:

$ node -v

$ npm -v

These should successfully return the node and npm versions of the system.

Install Python 3 on the host system.
Check successful installation by running:

$ python --version 

or 

$ python3 --version (for Linux Users)


### --- Project Dependencies ---

The project requires dependencies from both Node and Python. This involves the node_modules and the python libraries.
To install node_modules, run:

$npm install

To install python libraries, run:

$python install -r requirements.txt

### --- Structure of the Program --- 

The program is run by first running the Python Flask using:

$ python app.py

or 

$ python app.py (for Linux Users)

Then on another terminal, node can be run using:

$ npm start


### --- Program Execution ---

The program uses Google OAuth Sign In to login into the system. A "Sign In with Google" option shows up to prompt the user to sign in to the site.
After selecting the account, the user data is saved in a local database and displayed and the top right of the navbar.
The program then proceeds to the main section of the web app.
