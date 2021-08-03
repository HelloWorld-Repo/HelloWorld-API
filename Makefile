start:
	docker-compose up -d

start-dev:
	docker-compose up

stop:
	docker-compose stop

build: 
	docker-compose up --build

bash-api:
	docker-compose exec api bash

bash-bd:
	docker-compose exec postgres bash

migrate:
	docker-compose exec api npx sequelize-cli db:migrate

undo-migrate:
	docker-compose exec api npx sequelize-cli db:migrate:undo

create-migration:
	docker-compose exec api npx sequelize migration:create --name=$(name)

stop-local-postgres:
	pg_ctl -D "C:\Program Files\PostgreSQL\13\data" stop
