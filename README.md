## Introduction ##

I've developed a budget expenses project where users can add their monthly budget and expenses for various products. This allows them to track and identify which products have higher expenses compared to others.

## User Personas ##

- A user can manage their budget and expense.

## User Stories ##

* I have designed the user stories outlined in my [GitHub project](https://github.com/users/meena-rathi/projects/3).
* I followed the agile methodology to implement my project using GitHub Projects.
* Each user story has its own acceptance criteria. 

The user storys in my GitHub project are as follows:

* As a site user, I can easily create an account to access the website.
* As a site user, I can add a monthly budget. 
* As a site user, I can add the expenses.
* As a site user, I can see total amount of expenses substract from the buget.
* As a site User, I can edit and delete the expenses.
* As a site User, I can expeses in the pie chart.

## User Goals ##

New User: 

- I can navigate the website without any hassle.
- The website provides enough information for me to understand what the expenses tracking is about.
- The sign-up process is easy and straightforward.

Pervious user:

- Signing in is easy.
- I can view and manage my expenses.


## Design


## Fonts ##

- The 'sans-serif' font family, a sans-serif typeface, has been selected for use across the resturtant project. 

- Font Colors: The color scheme for text is primarily brown, gray and white.

## Testing 

| Test       | Expected           | Passed  |
| :------------- |:-------------:| :-----:|
| Non-authenticated user tries accessing URL endpoints '/projects' | Displays Welcome message requesting user to sign in/up  | ✅ |
| User clicks sign out | User is signed out and directed to the logged-out home page | ✅ |
| User logs in / registers | Nav links change and access to home page becomes available | ✅ |
| User clicks '+ toggle'| budget form displayed | ✅ |
| User enter the monthly budget | budget displayed on the home page | ✅ |
| User enters the monthly budget and wants to increase it | Increased budget is displayed on the home page | ✅ |
| User enter (invalid data) | Error / Invalid messages | ✅ |
| User clicks ‘+ toggle’ | expenses from displayed | ✅ |
| User enters the expenses | Expenses are displayed in a table on the home page | ✅ |
| User clicks edit button | Directed to edit project page with prepopulated form | ✅ |
| User updates expenses (valid data) | Project details updated successfully and redirected to previous page | ✅ |
| User updates project (invalid data) | Error / Invalid messages | ✅ |
| User clicks delete icon on expenses page | expenses is deleted and redirected to home page | ✅ |
| Total expenses | Total amount is calculated based on the entered expenses | ✅ |
| User logs in / registers | Nav links change and access to home page becomes available | ✅ |
| User clicks '+ toggle'| budget form displayed | ✅ |
| User enter the monthly budget | budget displayed on the home page | ✅ |
| User enters the monthly budget and wants to increase it | Increased budget is displayed on the home page | ✅ |
| User enter (invalid data) | Error / Invalid messages | ✅ |

| User clicks ‘+ toggle’ | expenses from displayed | ✅ |
| User enters the expenses | Expenses are displayed in a table on the home page | ✅ |

| User clicks edit button | Directed to edit project page with prepopulated form | ✅ |
| User updates expenses (valid data) | Project details updated successfully and redirected to previous page | ✅ |
| User updates project (invalid data) | Error / Invalid messages | ✅ |
| User clicks delete icon on expenses page | expenses is deleted and redirected to home page | ✅ |


| Total expenses | Total amount is calculated based on the entered expenses | ✅ |
| User completes create task form and submits (valid data) | Task created and redirected to previous page | ✅ |
| User completes task form and submits (invalid data)| Error / Invalid messages | ✅ |
| User clicks edit task button | Directed to edit task page with prepopulated form | ✅ |
| User updates task (valid data) | Task details updated successfully and redirected to related project page | ✅ |
| User updates task (invalid data) | Error / Invalid messages | ✅ |
| User clicks delete icon on task page | Task is deleted and redirected to landing page | ✅ |
| User clicks project card | Directed to the Project page | ✅ |
| User clicks task card | Directed to the Task page | ✅ |
| User types in the search bar on landing page | Project cards are filtered to match search | ✅ |
| User clicks sign out | User is signed out and directed to the logged-out home page | ✅ |








## Deployment

TaskFlow Deployment to GitHub and Heroku
To deploy TaskFlow to GitHub and Heroku, follow these steps:
Start by creating a new app on Heroku and link it to your GitHub account.
Turn on automatic deployments in Heroku. This way, whenever changes are pushed to the main branch of your GitHub repository, Heroku will automatically deploy the latest code.
In Heroku’s settings, add any necessary environment variables, such as the database connection string or API keys.
Add a Procfile to the project. This file will specify the command that Heroku should use to run the app.

o	Ensure that the app is production-ready. Run any build or compilation tasks, and verify that all necessary dependencies are installed.

o	Push your code to the main branch of your GitHub repository. This will trigger the deployment process on Heroku.
o	Keep an eye on the Heroku logs to make sure the deployment runs smoothly and there are no errors.
________________________________________
Connecting the React Front-End to Django API
To integrate the React front-end with the Django API, follow these steps:
1.	Heroku Setup:
o	In the Heroku dashboard, go to your Django Rest Framework (DRF) API project.
2.	Configure Variables:
o	Add a config variable called CLIENT_ORIGIN and set it to the URL of the deployed React app.
o	Also, add a CLIENT_ORIGIN_DEV variable with the Gitpod preview link. Update this link when needed, as Gitpod URLs may change.
3.	Install Axios:
o	In the React project, install Axios by running the command:
o	npm install axios
4.	Set Up Axios:
o	Create an api folder, and inside it, create an axiosDefaults file.
o	In this file, import Axios, then configure it by setting the baseURL to the deployed API's URL.
o	Ensure the content-type header is set to handle multipart/form-data requests and enable withCredentials to manage cookies and avoid CORS issues.
5.	Integrate Axios:
o	Import this Axios configuration into the App.js file of your React app to enable communication with the Django API.
These steps ensure that your React app can interact properly with the Django TaskFlow API.



** Forking the Taskmaster_react Repository

1.	Log in (or create an account) on GitHub.
2.	Visit the repository for the project at Neillcllghn/taskmaster_react.
3.	Click the Fork button in the upper right corner of the page.
________________________________________

** Cloning the Repository
1.	Log in (or create an account) on GitHub.
2.	Navigate to the repository for this project at Neillcllghn/taskmaster_react.
3.	Click the Code button, choose whether to clone using HTTPS, SSH, or GitHub CLI, and copy the provided link.
4.	Open your terminal and change the current working directory to where you want the cloned repository to be saved.
5.	In the terminal, type git clone, paste the link from step 3, and hit enter.
Libraries Used in the Front-End
1.	React: The primary library for building the user interface.
2.	ReactDOM: Handles rendering React components into the DOM.
3.	React Router: Manages routing and navigation for TaskFlow's single-page application.
4.	Axios: Used to make HTTP requests from the TaskFlow React Front-End to the TaskFlow API.
5.	•  React Chart.js 2: The React wrapper for Chart.js, used to integrate and display the pie chart.
6.	•  Chart.js: A JavaScript library that renders charts, such as the pie chart used in TaskFlow.
7.	
8.	Bootstrap: A CSS framework that provides styling and ensures responsive design for the TaskFlow application.




### Wireframes





## Technologies Used

### Languages Used:
HTML, CSS, javascript and Python Django Rest Framework (backend) were used to create this website.

### Frameworks, Libraries & Programs Used:

Git - For version control.

Github - To save and store the files for the website.

React-Bootstrap Version 4.6 - The framework for the website. Code for the navigation bar, containers, rows and forms were used and modified. Additional CSS styling was also implemented in style.css.

Google Fonts - To import the fonts used on the website.

Font Awesome - For the iconography on the website.

Google Dev Tools - To troubleshoot and test features, solve issues with responsiveness and styling.



[ElephantSQL](https://www.elephantsql.com/) - To install and manage PostgreSQL database (Backend- Django React Framework).
