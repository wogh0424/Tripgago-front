# Stage 1: Build the React application
FROM node:14 as builder
WORKDIR /app
COPY package-lock.json ./
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the React application using Nginx
FROM nginx:1.19.0
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/conf.d/*
COPY /config/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html/

COPY config/nginx/default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf ./usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
