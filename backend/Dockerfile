# Dockerfile
FROM python:3.11-buster

WORKDIR /src

RUN pip install poetry
COPY pyproject.toml* poetry.lock* ./

# 仮想環境を作成しないように設定
RUN poetry config virtualenvs.create false

RUN if [ -f pyproject.toml ]; then poetry install --no-root; fi

# pipを使用してuvicornを直接インストール
RUN pip install uvicorn
RUN pip install fastapi

CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]