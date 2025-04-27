*****PROJECT STRUCTURE******

HOUSEOFMARKET/

├── controllers/

│   ├── authController.js

│   └── taskController.js

├── middlewares/

│   └── authMiddleware.js

├── utils/

│   ├── fileHandler.js

│   ├── passwordHandler.js

│   └── tokenHandler.js

├── data/

│   ├── users.json

│   └── tasks.json

├── app.js

└── package.json


  **Installation**
  1. Clone the repository:
        git clone https://github.com/Sonujh07/HouseOfMarkTech.git

  3. Install dependencies:
     npm install
     
  5. Start the server:
    npm run dev


**********  **API Endpoints**  **********

                    POST    	/api/register        	Register a new user (body: username, password)



                    POST      /api/login	          Login user and get token (body: username, password)


                    POST	   /api/tasks	            Add a new task (body: title, description, token)



                    GET	     /api/tasks	            Get all tasks of logged-in user and pass token in request


                    DELETE	/api/tasks/:id	        Delete a task by ID with token in request



****Usage Example** ****

1. Register User

	POST /api/register
	
	Body:
	{
	  "username": "testuser",
	  "password": "password123"
	}



2. Login User

	POST /api/login
	
	Body:
	{
	  "username": "testuser",
	  "password": "password123"
	}
	
	
	Response:
	{
	  "token": "your_token_here"
	}



3. Add Task

	POST /api/tasks

	Headers:
	{
	  "Authorization": "your_token_here"
	}
	Body:
	{
	  "title": "Learn Node.js",
	  "description": "Study file handling and authentication"
	}

5. Get All Tasks

GET /api/tasks

Headers:
{
  "Authorization": "your_token_here"
}


5. Delete Task

DELETE /api/tasks/:id

Headers:
{
  "Authorization": "your_token_here"
}
