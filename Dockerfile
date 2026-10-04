# Step 1: Build Phase
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json* ./

# Install dependencies using npm ci (clean install)
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy the rest of the application
COPY . .

# Build the Next.js static export (outputs to /out)
RUN npm run build

# Step 2: Production Server Phase
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the static export from builder phase to nginx html directory
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
