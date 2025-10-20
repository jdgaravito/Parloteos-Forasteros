FROM oven/bun:latest as runtime
WORKDIR /app

# Copy package files first
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Build
RUN bunx bun astro build

ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD node ./dist/server/entry.mjs