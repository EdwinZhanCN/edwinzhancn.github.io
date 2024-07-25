# MySQL On Your Cloud Server

## Abstract

In this blog, you will learn how to deploy MySQL service on ubuntu linux virtual machine.

## Applications you may need
**SSH Connection**

<img src="./image/visual-studio-code-1.svg" width="30" height="30"/>

[Visual Studio Code (Remote-SSH)](https://code.visualstudio.com)

<img src = "./image/datagrip-icon.svg" width= "30" height = "30"/>

[Data Grip(Optional DataBase Management Tool)](https://www.jetbrains.com/datagrip/download/)

## Prerequisites

- A Cloud Server/Virtual Machine that can be accessed by password or SSH Connection:
  - You'll need a cloud server or virtual machine that you can connect to remotely using SSH. This will allow you to install and configure the MySQL service. Most cloud providers offer virtual machines with pre-installed operating systems like Ubuntu that you can use. I will use the Service from Azure.
  - [See aritcle here to learn how to create a VM]()

## Connect the Cloud Server by VSCode 

Search and download Remote-SSH Extension in VSCode:



Open the Extentsion on the left side-bar and click the add button on the SSH Section.

Using following code to connect the Cloud Server, **replace the sections with your own.**

```shell
ssh -i path/to/your/ssh_public.pem username@Public_IP_Address
```

## 
