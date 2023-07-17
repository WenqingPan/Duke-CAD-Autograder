# gunicorn_config.py

# maximum process
workers = 5
# bind address
bind = '127.0.0.1:5000'
# dameon setting
daemon = 'true'
# worker mode
worker_class = 'gevent'
# access log and error log directory
accesslog = './logs/gunicorn_acess.log'
errorlog = './logs/gunicorn_error.log'
# log level
loglevel = 'warning'