# Environment Set Up

## Create a new conda environment

To create a new conda environment, make sure you have install ananconda and config it well. If not, please go to the conda section in Tutorial of YOLOv8.

Go to the terminal

```shell
# name a new conda env called "tts"
conda create -n tts
# activate the conda env
conda activate tts
# install ipykernel with conda
conda install ipykernel
# check your python location
which python # the python interpreter should under your ~/anaconda3/envs/tts/bin/python
# add the conda env as a jupyter kernel
python -m ipykernel install --user --name tts --display-name "Python (tts)"
# restart jupyter lab
sudo systemctl restart jupyter.service
```

### Knowing Issue:

If you cannot find the kernel after restart jupyter.service, you may move your tts kernel directory to right location.

Because our jupyter-lab is installed under conda base environment, so we need to move the kernel to the conda directory as well

```shell
# check your tts location
jupyter kernelspec list
# get your tts location and mv it to conda base jupyter kernel directory (also shown above)
mv ~/.local/share/jupyter/kernels/tts ~/anaconda3/share/jupyter/kernels/
# well done, check the location
cat ~/anaconda3/share/jupyter/kernels/tts/kernel.json 
# make sure the 1st line of argv is the directory ~/anaconda3/env/tts/bin/python, because it is the kernel from another conda environment. A little bit tricky!
```

**Now you are free to use Python (tts) as the kernel of your Jupyter lab!**

Choose or make a directory under your **Jupyter Lab Working Directory** to store your project, I will use NAS by the way :)

```shell
# under your working directory
git clone https://github.com/2noise/ChatTTS.git
```

Modify the requirements.txt

```
...
pynini==2.1.6
WeTextProcessing==1.0.3
...
sudo apt-get update
sudo apt-get install build-essential

sudo apt-get install python3-dev

sudo apt-get install libfst-dev


```

