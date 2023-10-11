up:
	docker compose up -d --force-recreate
build:
	docker compose up -d --build
nest:
	docker compose exec seisan-back sh
redis:
	docker compose exec redis sh
dev:
	docker compose exec seisan-back yarn dev
