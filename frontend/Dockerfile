FROM node:18-alpine

WORKDIR /app

# Copy everything first
COPY . .

# Clean install with legacy peer deps
RUN rm -rf node_modules package-lock.json && \
    npm cache clean --force && \
    npm install --legacy-peer-deps --force

EXPOSE 3000

CMD ["npm", "start"]