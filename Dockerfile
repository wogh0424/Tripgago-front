FROM node:14 AS builder

# set working directory
WORKDIR /app

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