FROM node:14.16.0-alpine as client-build

RUN mkdir -p /app

WORKDIR /app

COPY instore-angular-frontend/package.json /app

RUN npm install

COPY ./instore-angular-frontend /app

RUN npm run build --prod


# BACKEND STAGE 1 BUILD
FROM node:14.16.0-alpine as development

RUN mkdir -p /app

WORKDIR /app

COPY ./instore-nest-backend/package*.json /app/

RUN npm install glob rimraf

RUN npm install --only=development

COPY ./instore-nest-backend /app
COPY --from=client-build /app/dist/instore-angular-frontend ../frontend/dist/instore-angular-frontend

RUN npm run build


# BACKEND STAGE 2 BUILD
FROM node:14.16.0-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN mkdir -p /app

WORKDIR /app

COPY instore-nest-backend/package*.json /app/

RUN npm install --only=production

COPY ./instore-nest-backend /app

COPY --from=development /app/dist ./dist
COPY --from=client-build /app/dist/instore-angular-frontend ../frontend/dist/instore-angular-frontend

CMD ["node", "dist/src/main"]
