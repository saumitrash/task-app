.PHONY: build run-test

build:
	docker-compose up --build

run-test:
	docker build -t task-app-test-image -f backend/Dockerfile.test backend
	docker run task-app-test-image