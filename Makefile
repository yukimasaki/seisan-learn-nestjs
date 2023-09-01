up:
	docker compose up -d --force-recreate
build:
	docker compose up -d --build
sh:
	docker compose exec seisan-back sh
dev:
	docker compose exec seisan-back yarn dev