# Jupyter Lab

## Install Jupyter Lab

Go to Terminal, use `conda deactivate ` to make sure you are in the `base` conda environment.

```shell
# Update pip
pip install upgrade pip
# Mainland china
pip install upgrade pip -i https://pypi.tuna.tsinghua.edu.cn/simple
# Show the pip version
pip --version
# Install jupyter and lab
pip install jupyter jupyterlab
# Reboot
sudo reboot
```

## Config Jupyter Lab

```shell
# Generate a config file of jupyter lab
jupyter lab --generate-config
# A file will be generated after excuted
Writing defualt config to: /home/edwin/.jupyter_lab_config.py
# Revise the config file
nano /home/edwin/.jupyter_lab_config.py
```

On the config file, add following commands:

```text
# Enable remote connections
c.ServerApp.allow_remote_access = True
# Enable remote connection using sudo
c.ServerApp.allow_root = True
# Listen all remote hosts
c.ServerApp.ip = '0.0.0.0'
# Run server but not open broswer
c.ServerApp.open_broswer = False
```

### Set Autostart

```shell
# locate the jupyter lab
which jupyter-lab # mine is under anaconda dir
# set auto start, create a new service file
sudo nano /etc/systemd/system/jupyter.service
```

On the systemd config file, add following sentences:

- WorkingDirectory: is the folder/directory you wanna open in Jupyterlab when it starts

```tet
[Unit]
Description=Jupyter lab

[Service]
Type=simple
User=root
ExecStart=/home/edwin/anaconda3/jupyter-lab --port 8888 --config=/home/edwin/.jupyter/jupyter_lab_config.py --allow-root
WorkingDirectory=/

[Install]
WantedBy=default.target
```

Enable and start service

```shell
# Enable Auto Start
sudo systemctl enable jupyter.service
# Start right now
sudo systemctl start jupyter.service
# Check the service status
sudo systemctl status jupyter.service
```

## Login to Jupyter Lab

Open a broswer, maybe firefox?

Enter the url port we just created

//TODO:Image

Follow the intruction above

```shell
jupyter server list
# Output:
Currently running servers:
http://ubuntu:8888/?token=... :: /
# if there is no such sentence
sudo systemctl status jupyter.service # it will tell you the url and token
```

Then, you can just simply copy paste the token into web broswer and create a new password

