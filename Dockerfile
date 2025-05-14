FROM --platform=linux/x86_64 node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json ./

# Copy Buf config and proto definitions
COPY buf.gen.yaml ./
COPY src/grpc/protos/ src/grpc/protos/

# Install dependencies
RUN npm ci

# Copy the rest of your application code
COPY . .

# Build-time environment variables
ARG AUTH_SECRET
ARG AUTH_TRUST_HOST
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_GRPC_GATEWAY_BASE_URL
ARG NEXT_PUBLIC_HTTP_GATEWAY_BASE_URL
ARG NEXT_PUBLIC_WS_GATEWAY_BASE_URL

# Make them available in the build process
ENV AUTH_SECRET=$AUTH_SECRET
ENV AUTH_TRUST_HOST=$AUTH_TRUST_HOST
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXT_PUBLIC_GRPC_GATEWAY_BASE_URL=$NEXT_PUBLIC_GRPC_GATEWAY_BASE_URL
ENV NEXT_PUBLIC_HTTP_GATEWAY_BASE_URL=$NEXT_PUBLIC_HTTP_GATEWAY_BASE_URL
ENV NEXT_PUBLIC_WS_GATEWAY_BASE_URL=$NEXT_PUBLIC_WS_GATEWAY_BASE_URL

# Build your Next.js project (if not already built)
RUN npm run build

# Expose port 3000 to be accessible from the outside
EXPOSE 3000

# Run the development server
CMD ["npm", "start"]