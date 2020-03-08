FROM node:12-slim

# Create app Directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# this application doesn't have any dependencies so this is not required
# RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# PORT to expose
EXPOSE 8080

# Command to start app
CMD [ "node", "app.js" ]