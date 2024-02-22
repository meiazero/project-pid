# Use uma imagem base do Node.js
FROM node:20.11.0-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Instale o pnpm
RUN npm install -g pnpm

# Copie o package.json e o pnpm-lock.yaml para o contêiner
COPY package.json .
COPY pnpm-lock.yaml .

# Instale as dependências com o pnpm
RUN pnpm install

# Copie o restante dos arquivos da aplicação para o contêiner
COPY . .

# Construa a aplicação
RUN pnpm build

# Exponha a porta 3000
EXPOSE 3000

# Comando para executar a aplicação
CMD ["pnpm", "run", "preview"]
