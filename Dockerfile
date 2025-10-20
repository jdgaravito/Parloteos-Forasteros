FROM oven/bun:latest
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .
RUN bun run build

# Instalar un servidor estático simple
RUN bun add -g serve

ENV PORT=3000
EXPOSE 3000

# Servir archivos estáticos
CMD ["serve", "-s", "dist", "-l", "3000"]