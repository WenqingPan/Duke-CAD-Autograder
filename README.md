# Duke-CAD-Autograder

The CAD autograder is built with React (front-end) and Flask (back-end). It is designed to facilitate quick, customizable, and fair grading for CAD drawings in the DXF file format. It requires a user to input a correct CAD file, a folder of student
files, and several grading parameters, such as the number of points to take off for errors and how detailed to make the output text. It was created by several undergraduate students 
at Duke University under the supervision of Professor Rabih Younes. It has been deployed on the Duke University virtual machine (VM) servers and can be accessed at this address:
http://vcm-20929.vm.duke.edu/. Please email jw716@duke.edu if you have any questions about the code or the usage.

## Virtual machine access
People with root access to the vcm-20929 server can make edits to the code that will be reflected in the web app. **Currently, the web application is running from the folder ```jw716/CAD-React-Flask```**. (It might be moved to another folder in the vm in future) To edit the front-end files, go to your local folder ```client``` and make the changes. Once changes are saved locally, run ```npm run build``` to create a build directory. To edit the back-end files, go to your local folder ```flask-server``` and simply make the changes and save it. Then use scp command on the local terminal to send the updated folder to the target destination on the vm. The changes would be automatically reflected on the web application.

## Run the web application locally
Original Flask + React setup is referenced from this Youtube tutorial: https://www.youtube.com/watch?v=7LNl2JlZKHA&t=133s

First, git clone the repository
### back-end setup
go to back-end folder\
step1: ```python3 -m venv venv```\
step2: ```source venv/bin/activate```\
step3: ```python3 server.py```

### front-end setup
go to front-end folder
step1: ```npm install```\
step2: ```npm run start```\
A localhost page would be generated automatically after the command above

## Debug the VM
If the front-end is working and the back-end server stops running, try the following:
step1: ssh into the vm and go to the back-end folder flask-server
step2: ```python3 -m venv venv```\
step3: ```. venv/bin/activate```\
step4: ```pip install gunicorn flask ezdxf flask_cors numpy```\
step5: ```gunicorn --bind 127.0.0.1:5000 server:app --daemon```\
--daemon is the command to run the backend server forever.
