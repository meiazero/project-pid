# Use uma imagem base do Python
FROM python:3.12-bookworm

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos da aplicação para o contêiner
COPY . /app

ENV FLASK_APP=app.py

# Instale as dependências sem usar o cache
RUN python3.12 -m pip install --no-cache-dir -r requirements.txt

# Expõe a porta que a aplicação usará
EXPOSE 5000

# Comando para executar a aplicação
CMD ["python", "app.py"]
