docker: docker-start docker-config

docker-start:
	@echo "Starting docker containers..."
	@./dockers/start.sh

docker-config:
	@echo "Configuring docker containers..."
	@node dockers/setup.js

docker-stop:
	@echo "Stopping docker containers..."
	@./dockers/stop.sh

.PHONY: docker-start docker-config docker-stop
