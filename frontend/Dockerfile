# Build stage
FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Development stage
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]