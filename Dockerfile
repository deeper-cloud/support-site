FROM node:16-alpine

# ARG OPENAI_API_KEY
# ENV OPENAI_API_KEY $OPENAI_API_KEY
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# RUN npm run invalidate-content

EXPOSE 3000
CMD ["npm", "start"]