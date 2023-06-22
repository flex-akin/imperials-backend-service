
FROM node:16-alpine

ENV PORT=3030 \
    AWS_SES_ACCESS_KEY_ID=AKIAUSI6SOP4YVPPEXFV \
    AWS_SES_SECRET_ACCESS_KEY=BELZE6QBLY/2d9JjPQ5iYjIn5RI4P8KJzI1e9MUXAGWH \
    MAIL_PORT=465 \
    MAIL_HOST=email-smtp.us-east-1.amazonaws.com 
#Set working directory to /app
WORKDIR /app

#Copy package.json in the image
COPY package.json ./


RUN npm install
RUN npm install typescript
RUN tsc

#Copy the app
COPY . ./

EXPOSE 3030

#Start the app
CMD ["node", "./dist/app.js"]

