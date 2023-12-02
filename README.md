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

## Additional Context


## Shortcomings


## Additional Time
