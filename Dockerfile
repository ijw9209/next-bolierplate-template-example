FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps

# Install required dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
      elif [ -f package-lock.json ]; then npm ci; \
      elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
      else echo "Lockfile not found." && exit 1; fi

# Build the source code only when needed
FROM base AS builder
ARG ENV_MODE
WORKDIR /usr/src/app

# Only copy node_modules if needed to avoid unnecessary copying
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

# Copy .env files based on the environment
COPY .env.development .env.development
COPY .env.production .env.production

# Run environment-specific build
RUN if [ "$ENV_MODE" = "dev" ]; then \
      echo "현재 ENV_MODE : $ENV_MODE, 개발 빌드 실행"; \
      npm run build:dev; \
    elif [ "$ENV_MODE" = "main" ]; then \
      echo "현재 ENV_MODE : $ENV_MODE, 프로덕션 빌드 실행"; \
      npm run build:prod; \
    else \
      echo "유효하지 않은 ENV_MODE: $ENV_MODE"; \
      exit 1; \
    fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /usr/src/app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# Copy necessary build files from the builder stage
COPY --from=builder /usr/src/app/public ./public
RUN mkdir .next && chown nextjs:nodejs .next

# Set correct permissions for the built application
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

EXPOSE 3000

# Set environment variable for Next.js
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Run the app in production mode
CMD ["node", "server.js"]