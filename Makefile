start:
	docker-compose start -d

stop:
	docker-compose stop

build: 
	docker-compose up --build

bash-api:
	docker-compose exec api bash

bash-bd:
	docker-compose exec postgres bash

migrate:
	docker-compose exec api npx sequelize db:migrate