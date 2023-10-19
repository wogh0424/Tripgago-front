# Stage 1: Build the React application
FROM node:14 as builder
WORKDIR /app
COPY package-lock.json ./
COPY package.json ./
RUN npm start
COPY . .
RUN npm run build

# Stage 2: Serve the React application using Nginx
FROM nginx:1.19.0
COPY config/nginx/default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf ./usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html/
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
