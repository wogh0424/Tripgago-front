# Step 1: Build the React application
FROM node:14 as build

WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
COPY . .

RUN npm run build

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
