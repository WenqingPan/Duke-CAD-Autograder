# CAD Autograder Prework Set Up Guide

> If you intend to develop on your own computer. Just skip the "1. Reserve a Virtual Machine".

## 1.  Reserve a Virtual Machine

1. Visit https://vcm.duke.edu/home/ and login

2. Reserve a VM

   ![image-20230112202435855](https://raw.githubusercontent.com/Hangming-Ye/All-Pic/main/pic/202301122024926.png)
   
   


3. Select OS

   ![image-20230112202719449](https://raw.githubusercontent.com/Hangming-Ye/All-Pic/main/pic/202301122027512.png)

   

4. Write down the `hostname`, `user`,`URL(for restart)`. The remote host address is `user`@ `hostname`

   ![image-20230112230755510](https://raw.githubusercontent.com/Hangming-Ye/All-Pic/main/pic/202301122307607.png)

## 2. Connect the Server

2.1 If you use vscode, please follow this:

1. Install Remote Development Plugin for VS code

   ![](https://raw.githubusercontent.com/Hangming-Ye/All-Pic/main/pic/202306021334199.png)

2. Open the Config file and add your VM information to the config file.

   ![image-20230602133809088](https://raw.githubusercontent.com/Hangming-Ye/All-Pic/main/pic/202306021338113.png)

   Paste this to the config, don't forget to add your own host, hostname and user

   ```
   # Read more about SSH config files: https://linux.die.net/man/5/ssh_config
   # Host is an alias of your VM, name it on your own
   # Hostname is showed in the reserve page of duke VM, end with vcm.duke.edu
   # User is your netid
   Host 
       HostName 
       User 
   ```

   save and refresh, and you can get the page like this.

   ![image-20230602134619733](https://raw.githubusercontent.com/Hangming-Ye/All-Pic/main/pic/202306021346772.png)

3. Connect it, password is the same with your duke VM

   


2.2 If you use Mobaxterm, please follow this:

1. For windows user, the guide use mobaXterm as example. 
2. Open Sessions - new session - SSH, follow the instruction in the image.

![image-20230112231317642](https://raw.githubusercontent.com/Hangming-Ye/All-Pic/main/pic/202301122313676.png)



3. If success, you will get a interface like this

   ![image-20230112211007903](https://raw.githubusercontent.com/Hangming-Ye/All-Pic/main/pic/202301122110930.png)


## 3. Server Set up


1. Software Installation

   ```bash
   sudo apt-get update
   sudo apt-get upgrade
   sudo apt-get install git python python3-pip nodejs npm
   sudo pip3 install gunicorn flask ezdxf flask_cors numpy
   ```

2. Check whether installation is successful

   ```bash
   node --version
   npm --version
   flask --version
   python3 --version
   pip --version
   ```

   should be something like this

   ![image-20230602145004116](https://raw.githubusercontent.com/Hangming-Ye/All-Pic/main/pic/202306021450133.png)


## 4. Remote Git Setup

0. Change account to user account

   ```bash
   su your_net_id
   cd ~
   ```
   
1. config user info

   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "Your_email@example.com"
   ```
   
2. Connect to Github

   2.1 Generate Key

   ```bash
   ssh-keygen -t rsa -C "Your_email@example.com"
   cat ~/.ssh/id_rsa.pub
   ```

   2.2 Copy the key, open github, click the avatar - setting - SSH and GPG keys - new SSH key, paste the key in `Key` and make a title for it.

   ![image-20230112225224102](https://raw.githubusercontent.com/Hangming-Ye/All-Pic/main/pic/image-20230112225224102.png)

   2.3 Go back to shell, if answer is `...You've successfully authenticated, but GitHub does not provide shell access`, it is connected.

   ```bash
   ssh -T git@github.com
   ```

   

3. Clone the project

   ```bash
   git clone git@github.com:CAD-Autograder-Team/Duke-CAD-Autograder.git
   ```

   

4. Test if it is connected
    ```bash
    cd ~/Duke-CAD-Autograder
    echo "YOUR_NAME" >> test.txt
    git add .
    git commit -m "YOUR_NAME complete init"
    git push
    ```



5. Test if the project can run

   ```bash
   cd flask-server
   python3 server.py
   ```

6. I encountered some problems in running the front-end, seems the  http://vcm-20929.vm.duke.edu/ cannot start the front-end either.

