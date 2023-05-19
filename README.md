# Space Finder

Space Finder is an cloud-based Photo Saving Website powered by AWS that allows users to securely upload and store their photos along with location information and additional details. With this website, users can easily create albums, organize their photos, and share them with others.

## Table of Contents

-   [Project Overview](#project-overview)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Features](#features)

## Project Overview

Space Finder is a cloud-based platform that enables users to securely store, organize, and share their photos online. With the goal of simplifying photo management and providing easy access from anywhere, users can upload their photos, add location information, and create personalized albums.

The website offers convenience, accessibility, and security, allowing individuals and various user groups such as families, photographers, and travelers to preserve their memories digitally. With features like sharing options and a user-friendly interface, the project aims to provide a seamless experience for photo enthusiasts seeking a reliable solution for managing and sharing their photo collections. Additionally, the website offers the flexibility to deploy your own instance on AWS, customize it with your own domain, and set up a user pool for enhanced control and personalization.

## Installation

The frontend UI code for this repository needs to be placed in a root folder along with the frontend code. Additionally, please clone the backend service codebase from https://github.com/ErnestLeung52/space-finder-services.

├── root-folder
│ ├── space-finder-services
│ └── space-finder-UI

Prerequisite: AWS account, Node.js environment

To get started with the project, please follow the steps below:

1. Clone the repository to your local machine using the following command:
   `git clone https://github.com/ErnestLeung52/space-finder-UI.git`

2. Navigate to the project directory:
   `cd space-finder-service`

3. Install the necessary dependencies by running the following command:
   `npm install`
   This will install all required packages and dependencies specified in the 'package.json' file.

4. Run the project in development mode using
   `npm run dev`

5. Bundle codes into dist folder for deployment to AWS
   `npm run build`

## Usage

To navigate and perform specific actions in the application, follow these steps:

1. Login

-   Locate the 'Login' page in the top right corner of the application.
-   Click on the 'Login' link or button to access the login page.
-   Sign in using your AWS Cognito account credentials.

2. Create Space

-   Once logged in, find the 'Create Space' option in the application.
-   Click on 'Create Space' to access the upload feature for photos.
-   Provide the necessary information and select the photos you wish to upload.
-   Submit the form to upload the photos with associated information.

3. View Spaces

-   To view all the photos associated with your account, navigate to the 'Spaces' section.
-   Look for the 'Spaces' option in the application's navigation or menu.
-   Click on 'Spaces' to access a gallery or list view of all the photos under your account.
-   Browse through the spaces to view and interact with the uploaded photos.
-   These steps will guide you through the process of signing in, uploading photos with information, and viewing all the photos within the application.

## Upcoming Features

1. Google Maps Integration: Display the location where each photo is taken using Google Maps.

2. Album Creation: Create customized albums to organize your photos based on themes or events.

3. Sharable Links: Generate links with access codes to share albums with others.
