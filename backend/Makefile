fmt:
	poetry run black ./
	poetry run isort ./
lint:
	poetry run flake8 ./ --exclude=./.venv
	poetry run mypy ./
