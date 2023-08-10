# FROM node:16 AS base
# WORKDIR /base
# COPY package*.json ./
# RUN npm install
# COPY . .

# FROM base AS build
# ENV NODE_ENV=production
# WORKDIR /build
# COPY --from=base /base ./
# RUN npm run build

# FROM node:16 AS production
# ENV NODE_ENV=production
# WORKDIR /app
# RUN yarn add sharp
# COPY --from=build /build/package*.json ./
# COPY --from=build /build/.next ./.next
# COPY --from=build /build/public ./public
# RUN npm install next

# EXPOSE 3000
# CMD ["npm","start"]



# Base on offical Node.js Alpine image
FROM node:16

# Set working directory
WORKDIR /usr/app

RUN apt-get update --allow-releaseinfo-change && apt-get install -y  nginx



# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./
#RUN npm install typescript --dev
# Install dependencies
RUN npm install --legacy-peer-deps --force && \
    npm cache clean --force 

# Copy all files
COPY ./ ./
ENV NODE_ENV=production
# Build app
RUN npm run build

# Expose the listening port
EXPOSE 3000

RUN chmod -R 777 /usr/app/.next/cache


# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script when container starts

CMD [ "npm","run", "start" ]