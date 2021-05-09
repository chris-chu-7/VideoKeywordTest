FROM nikolaik/python-nodejs


WORKDIR /app
RUN apt-get update
RUN apt-get install ffmpeg -y
RUN pip install pipenv

COPY Pipfile .
COPY Pipfile.lock .

RUN pipenv install

COPY web-app/package.json web-app/
COPY web-app/package-lock.json web-app/

RUN cd web-app && npm ci

COPY web-app/src web-app/src
COPY web-app/public web-app/public
COPY web-app/tsconfig.json web-app/
COPY web-app/.prettierrc web-app/
COPY web-app/.prettierignore web-app/
COPY web-app/.eslintrc web-app/
COPY web-app/.eslintignore web-app/

RUN cd web-app && npm run build

COPY server server

CMD [ "pipenv", "run", "python", "server/main.py"]
