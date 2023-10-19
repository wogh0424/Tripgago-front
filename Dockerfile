FROM node:16 AS builder

# set working directory
WORKDIR /app

COPY package.json .
RUN npm install 
RUN npm ci


# Copies everything over to Docker environment
COPY . .
RUN npm run build

#Stage 2
FROM nginx:latest
COPY config/nginx/default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf ./usr/share/nginx/html/*
COPY --from=builder app/build /usr/share/nginx/html
EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]
