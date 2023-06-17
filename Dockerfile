FROM node:14

WORKDIR /app

# Copy the monitor.js file
COPY monitor.js /app/monitor.js

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Start the application
CMD [ "node", "monitor.js" ]