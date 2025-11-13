FROM node:20-alpine AS build
WORKDIR /app
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src

# Generate into ./src/generated/prisma
RUN pnpm exec prisma generate

# Build TS -> dist
RUN pnpm run build

# Prune prod deps
RUN pnpm prune --prod

# -------- Runtime --------
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Prod deps + built JS
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Copy generated client into dist so runtime import ../generated/prisma/client works
COPY --from=build /app/src/generated ./dist/generated

EXPOSE 4000
ENV PORT=4000
CMD ["node", "dist/index.js"]