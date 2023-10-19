FROM node:14 AS builder

# set working directory
WORKDIR /app


# install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package-lock.json ./
COPY package.json ./
# Installs all node packages
RUN npm ci 


# Copies everything over to Docker environment
COPY . ./
RUN npm run build

#Stage 2
#######################################
#pull the official nginx:1.19.0 base image
FROM nginx:1.19.0
#copies React to the container directory
# Set working directory to nginx resources directory
# WORKDIR /usr/share/nginx/html
COPY config/nginx/default.conf /etc/nginx/conf.d/default.conf
# Remove default nginx static resources
RUN rm -rf ./usr/share/nginx/html/*
# Copies static resources from builder stage
COPY --from=builder /app/build /usr/share/nginx/html/
# Containers run nginx with global directives and daemon off
EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]
