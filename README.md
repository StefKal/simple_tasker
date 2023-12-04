# Task Lister Full-Stack

## Running the project

- Assuming you have docker set up, (if not download it from https://www.docker.com).
- Open a terminal inside the project directory and run
```
$ docker compose up --build
```
This is going to create two volumes for your docker project, one called "backend" and one called "frontend" (imaginative I know :D)

- **Make sure** migrations are up to date for the project, in the docker Exec of the backend service run **if necessary**
```
$ python manage.py migrate
```

### Running the backend tests
- You can also run some basic testing I've written for the API in your docker Exec using this command:
```
$ python manage.py test
```

## WebApp
You can find the webapp running (on dev version for both BE and FE) at ```htt://localhost:5173```

## API
There is a separate version for the API docs at ```http://localhost:8000/docs/```

## Additional Requirements
- All the additional required packages for both the FE and the BE are included in the docker images that get created during build.

## Shortcomings
- This is only intented for local development use!
- Ultimately I don't believe tasks belong inside "authsystem" they should be a separate entity, but it all depends on where we want our app to be headed

## Additional Time
- Given some additional time there could be a plethora of features/fixes to be implemented
1. User activation: The api could send an activation email to the user when he registers
2. More thorough testing: The backend could be tested better
3. Headless UI and not "hardcoded" components. I would make re-usable components (like the table or the form) so they can be re-used throughout the app (given it would be bigger)
4. Better TSX, my typescript is currently very behind of my implementation
5. Sortable table, client or server side
6. Loading states for table when clicking and waiting for complete/favorite
7. Iron down the UI, fix the sizing/paddings to be all the same
8. Pay more attention to Mobile View
9. FE testing
10. FE Storybook
11. Abstract out API endpoints to env file