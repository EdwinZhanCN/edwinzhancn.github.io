#Downloads Applications

### Anaconda

**Conda**: Anaconda comes with `conda`, a powerful package, dependency, and environment management tool. It simplifies the installation of different packages and manages their dependencies, which is particularly useful in data science projects.Anaconda includes over 1,500 data science packages pre-installed, such as NumPy, pandas. With `conda`, you can create and manage multiple isolated environments with specific packages and Python versions. 

### Install Anaconda

Go to anaconda official: [Anaconda](https://www.anaconda.com/download/success), for Jetson orin nano, we sould choose the [64-Bit (AWS Graviton2 / ARM64) Installer (800.6M)](https://repo.anaconda.com/archive/Anaconda3-2024.06-1-Linux-aarch64.sh)
 After the downloads complete, open the **terminal**.

```shell
# Go to downloads folder
cd ~/Downloads
# Run the install scripts
bash Anaconda3-xxxx-Linux-aarch64.sh # change into yours
# Press Enter to read the User Policy, enter yes to agree
# the install path should be /home/yourusername/anaconda3
# when the CLI ask you to initialize the anaconda, just type "yes" and reboot
reboot
```

### Visual Studio Code

**VSCode** should be familiar to anyone exposed to computer science. This a powerful code editor. Its rich community of extensions provides great convenience for programmers. 

On the Jetson Orin Nano, **I don't recommend using IDEs** with a huge memory usage like **Pycharm**, they will take up the graphics memory needed by the GPU and slow down the speed of the AI models running. 

Of course, there are many more worthwhile editors to explore such as **NeoVim** and **Sublime Text**, which are much more powerful and lightweight in terms of personalization.

Go to [VSCode Downloads Offical](https://code.visualstudio.com/Download). Choose `.deb` file in `Arm64`.  After download complete, go to **terminal**

```shell
cd ~/Downloads
# install
sudo dpkg -i code_xxxx_arm64.deb # replace with yours
```

