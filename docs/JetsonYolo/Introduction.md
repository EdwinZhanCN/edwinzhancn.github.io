# Abstract

Using Jetson Orin Nano Module to deploy Yolov8

**Payments needed:**

- A Nvidia **Jetson Orin Nano Module** (4/8GB), with/not with **CSI camera**

This blog will be divided into different sections, which allows you to create a perfect develop enviroment for Yolo Models. This tutorial will combine official documentation and my own experience. To make sure every step is easy to understand. So feel free to browse through the blog and start **learning from 0** or checking for gaps.

**Why Jetson Orin Nano ?**

Simply put, the Jetson Orin Nano offers **great performance in a compact body**. NVIDIA has labeled the Jetson Orin Nano as delivering up to **INT8 40TOPS** of arithmetic power. When running a model like Yolo, it is still able to process video streams at **30 FPS** without operations such as quantization and debranching.

**Why Yolo? What is Yolo?**

YOLO (You Only Look Once) is a real-time object detection system that stands out for its speed and accuracy. The initial idea of this vision model is presented by the paper [“You Only Look Once: Unified, Real-Time Object Detection”](https://doi.org/10.48550/arXiv.1506.02640) After a few more years of iteration, its latest stable version has arrived at **Yolov8**. This blog will demonstrate its **Object Detection capabilities for static images and segmentation in video streams.**

## Crucial Steps

- Have a look at [ubuntu](https://ubuntu.com) and **Jetpack** ✈️
- Set up environment with **Anaconda** 🌲
- Code and run YoloV8 **detection model** 🕵️

## Application You Need

- Anaconda
- Visual Studio Code
