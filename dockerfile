

FROM node:16-alpine

ENV PORT=3030 
    
#Set working directory to /app
WORKDIR /app

#Copy package.json in the imagecom
COPY package.json ./


RUN npm install
RUN npm install typescript

#Copy the app
COPY . ./

EXPOSE 3030

#Start the app
CMD ["node", "./dist/app.js"]


