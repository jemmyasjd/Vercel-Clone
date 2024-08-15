## **Video Link : https://drive.google.com/file/d/1hRIkl7lZlzJ0Ru-1cYeV3_6vpz8T8Ctg/view?usp=sharing**

![image](https://github.com/user-attachments/assets/338b555e-35b8-4e57-8b01-d9322792e81e)

## INTRODUCTION 🌟

Welcome to the Vercel Clone project! This project aims to replicate the core functionalities of Vercel, a popular platform for deploying and managing web applications. This Vercel clone provides a robust and scalable solution for developers to deploy their applications seamlessly, leveraging modern technologies and cloud services.

The project architecture includes various components such as an API server, build server, socket server, and a reverse proxy setup, all orchestrated using AWS services like ECS, ECR, and S3 storage. This setup ensures efficient handling of build processes, real-time updates, and secure storage, making it an ideal solution for modern web development needs.

## What It Does !! 👷

This project provides a comprehensive platform for deploying and managing web applications with ease. It replicates the core functionalities of Vercel, offering a seamless experience for developers.

## How I Build 🔧

**Backend Development:** the backend is developed using Express.js to handle API requests and manage server-side logic.

**Frontend Development:** The frontend has been developed using the next-js calling the api to the backend.

**API Server:** The API server was built to handle project creation and task execution, integrating AWS ECS for running tasks and Redis for real-time logging and communication.

**Build Server:** The build server automates the process of installing dependencies, building the project, and uploading the built files to AWS S3. It uses Redis for real-time logging and AWS SDK for S3 interactions.

**S3 Reverse Proxy:** Configured a reverse proxy using Express.js and http-proxy to route incoming requests to the appropriate resources stored in AWS S3, ensuring efficient handling of static assets.

**Real-Time Communication:** Utilized Socket.io to enable real-time updates and communication between the server and clients, ensuring that changes are instantly reflected across the platform.

**AWS Integration:** Leveraged AWS ECS for container orchestration, ECR for storing Docker images, and S3 for secure and scalable storage of static assets.

**Containerization:** Created Dockerfiles for each component to containerize the applications, ensuring consistent and isolated environments for deployment.

