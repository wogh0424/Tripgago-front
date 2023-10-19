# Step 1: Build the React application
FROM node:14 as build

WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
COPY . .

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

# Step 2: Serve the React application using Nginx
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm -rf /usr/share/nginx/html/*

# Copy the build files from the previous stage (from /app/build)
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
