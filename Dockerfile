FROM node:18-alpine as builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm install
COPY . .
RUN npm run postinstall && \
    npm run build

FROM node:18-alpine as runner
WORKDIR /app
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

ENTRYPOINT ["node", "server.js"]

LABEL org.opencontainers.image.source=https://github.com/CMD-Forum/cmd-forum
LABEL org.opencontainers.image.description="Container image for Command Forum."
LABEL org.opencontainers.image.licenses=MIT