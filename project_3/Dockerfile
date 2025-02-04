# node version
FROM node:22-alpine

# working directory
WORKDIR /app

# copy the package.json and package.lock.json
COPY package*.json . 

# install npm packages/dependencies
RUN npm install 

# copy the rest of the application
COPY . . 

# expose the port of the app 
EXPOSE 5000

#command to run application
CMD ["node", "./src/server.js"]