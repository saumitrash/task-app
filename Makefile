.PHONY: build run-test

build:
	docker-compose up --build

run-test:
	docker build -t task-app-test-image -f backend/Dockerfile.test backend
	docker run --name task-app-container -it --rm task-app-test-image