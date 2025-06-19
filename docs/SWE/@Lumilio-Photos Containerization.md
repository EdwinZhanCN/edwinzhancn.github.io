# @Lumilio-Photos Containerization

## Introduction

In this article, we will concentrate on the containerization of cross-platform applications. This includes managing environment variables, writing a robust cross-platform Dockerfile, utilizing Docker Compose, and overseeing Docker image management.

The reference project, [Lumilio-Photos](www.github.com/EdwinZhanCN/Lumilio-Photos), is a self-hosted photo management application designed for home servers, consisting of four distinct containers:
• **frontend:** The frontend container features a React.js + Vite web user interface hosted on Nginx.
• **api:** The API container handles user requests, creates tasks for the worker, and serves as a worker monitor.
• **worker:** The worker container performs the actual CRUD operations on user-provided data, manages database monitoring and tasks, and communicates with the machine learning service.
• **ml:** The ML container extends the functionality of the photo application by generating semantic context for photos and other assets, including face recognition, image classification, and vector search.

Keywords here: AI Application, Frontend-Backend Separation, RESTful API, Distributed Architecture, Microservices, WAL
## Manage Environment  Variables


## Writing Robust Dockerfile

## Docker Compose

## Docker Image Management