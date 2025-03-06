# Gunakan Node.js sebagai base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy file yang diperlukan
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode
COPY . .

# Build Next.js (opsional, jika pakai mode production)
RUN npm run build

# Jalankan server Next.js
CMD ["npm", "run", "dev"]
