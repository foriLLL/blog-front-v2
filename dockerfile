# --- 构建阶段 (Builder Stage) ---
    FROM node:20-alpine AS builder

    # 设置工作目录
    WORKDIR /app

    # 复制 package.json 和 package-lock.json
    COPY package.json package-lock.json ./

    # 安装所有依赖（包括 devDependencies，因为构建需要）
    # 使用 npm ci 以确保根据 lock 文件精确安装
    RUN npm ci

    # 复制包括 next.config.js, .babelrc.js, tsconfig.json 等在内的剩余源代码
    # 确保 .dockerignore 文件配置好，避免复制 node_modules 等
    COPY . .

    # 执行 Next.js 构建命令
    # 构建产物会生成在 ./.next 目录
    RUN npm run build


    # --- 生产阶段 (Production Stage) ---
    FROM node:20-alpine AS production

    WORKDIR /app

    # 从构建阶段复制必要的文件
    COPY --from=builder /app/package.json /app/package-lock.json ./
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    # 如果 next.config.js 或 .babelrc.js 在运行时需要，也复制过来
    COPY --from=builder /app/next.config.js ./
    COPY --from=builder /app/.babelrc.js ./

    # 只安装生产环境依赖
    # --ignore-scripts 可以在某些情况下加快速度并增加安全性
    # --prefer-offline 如果在 CI 中已经缓存了包，可以尝试使用
    RUN npm install --production --ignore-scripts

    # 暴露 Next.js 默认运行的端口
    EXPOSE 3000

    # 设置环境变量为生产环境
    ENV NODE_ENV=production

    # 运行 Next.js 生产服务器的命令
    CMD ["npm", "start"]
