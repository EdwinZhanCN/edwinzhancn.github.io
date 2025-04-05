---
link: https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository
---
# Docker
## Use Docker On Ubuntu

### Install using `apt` repository

#### Set up Docker's `apt` repository.

```shell
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

#### Install

```shell
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

#### Verify

```shell
sudo docker run hello-world
```

## Use Portainer to Manage Docker Containers

Portainer is a **lightweight**, open-source **management UI** for containerized applications. It simplifies the process of deploying, managing, and monitoring containers, particularly Docker and Kubernetes. With its *user-friendly interface*, Portainer makes it easier for both beginners and experienced users to handle complex container orchestration tasks.

[Install Portainer For Linux](https://docs.portainer.io/start/install-ce/server/docker/linux)

::: danger 
Make sure you install the Docker before following steps!
:::

#### Create a volume from official image

```shell
docker volume create portainer_data
```

#### Start the container

This Command will enable auto-start at launch 

```shell
docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:lts
```



