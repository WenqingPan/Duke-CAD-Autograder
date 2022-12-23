# Duke-CAD-Autograder

The CAD autograder is built with React (front-end) and Flask (back-end). It is designed to facilitate quick, customizable, and fair grading for CAD drawings in the DXF file format. It requires a user to input a correct CAD file, a folder of student
files, and several grading parameters, such as the number of points to take off for errors and how detailed to make the output text. It was created by several undergraduate students
at Duke University under the supervision of Professor Rabih Younes. It has been deployed on the Duke University virtual machine (VM) servers and can be accessed at this address:
http://vcm-20929.vm.duke.edu/. Please email jw716@duke.edu, buyun.jiang@duke.edu, or esha.kapoor@duke.edu if you have any questions about the code or the usage.

## Virtual machine access
People with root access to the vcm-20929 server can make edits to the code that will be reflected in the web app. **Currently, the web application is running from the folder ```jw716/CAD-React-Flask```**. (It might be moved to another folder in the vm in future) To edit the front-end files, go to your local folder ```client``` and make the changes. Once changes are saved locally, run ```npm run build``` to create a build directory. To edit the back-end files, go to your local folder ```flask-server``` and simply make the changes and save it. Then use scp command on the local terminal to send the updated folder to the target destination on the vm. The changes would be automatically reflected on the web application.

## Run the web application locally
Original Flask + React setup is referenced from this Youtube tutorial: https://www.youtube.com/watch?v=7LNl2JlZKHA&t=133s

First, git clone the repository
### Back-end setup
go to back-end folder\
step1: ```python3 -m venv venv```\
step2: ```source venv/bin/activate```\
step3: ```python3 server.py```

### Front-end setup
go to front-end folder\
step1: ```npm install```\
step2: ```npm run start```\
A localhost page would be generated automatically after the command above

## When VM server is not responsive to grading requests, here is a temporary quick fix
If the front-end is working and the back-end server stops running, try the following:\
step1: ssh into the vm and go to the back-end folder flask-server\
step2: ```python3 -m venv venv```\
step3: ```. venv/bin/activate```\
step4: ```pip install gunicorn flask ezdxf flask_cors numpy```\
step5: ```gunicorn --bind 127.0.0.1:5000 server:app --daemon```\
--daemon is the command to run the backend server forever.

Note: Our team noticed that the server would crash after a period of time ranging from a few days to a few weeks. A script file that automatically runs the above commmands every few days was uploaded to the VM, which reboots the backend and avoids the server crash. Over the course of the semester, this script file was removed since it was not a long term fix to the server issue. The core reason to server periodically crashing is still being investigated, but at this time, the server is working.

## Limitations on current grader
The grading algorithm can grade 2D .dxf files of different versions. Unfortunately, the algorithm does not currently support 3D CAD files or files with polylines and splines.

### Support on different version
The autograder can work with different .dxf versions (such as dxf 2013, dxf 2018) because its parser (/Duke-CAD-Autograder/flask-server/server.py/get_ents()) parses entities using features that are uniform across these versions.

### Issue with polyline and spline
Throughout our testing of different CAD drawings, we discovered that our algorithm was missing code to parse and grade polylines and splines. The parsers have been added to get_ents() function so it can extract layers, default start width, default end width, m count, and more attributes from polylines, as well as extract layer, degree, flags, n_knots and more information from splines.

The algorithm for grading polylines and spline is under development, as for each new kind of entity, the algorithm to check scale/rotation/missing or extra entity is different.
