FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm install

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run postinstall && \
    npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/public ./public

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma ./prisma/

RUN npx prisma db push && \
    npx prisma migrate dev

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

USER nextjs

EXPOSE 3000

ENV PORT 3000

ENTRYPOINT ["npm", "start"]

LABEL org.opencontainers.image.source=https://github.com/CMD-Forum/cmd-forum
LABEL org.opencontainers.image.description="Container image for Command Forum."
LABEL org.opencontainers.image.licenses=MIT