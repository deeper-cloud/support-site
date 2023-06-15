FROM node:16-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./

RUN  npm install

COPY . .

ENV NODE_ENV production

# ARG OPENAI_API_KEY
# ENV OPENAI_API_KEY $OPENAI_API_KEY

ENV NEXT_TELEMETRY_DISABLED 1

# RUN npm run invalidate-content

RUN npm run build

FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "./server.js"]