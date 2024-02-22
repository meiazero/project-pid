# backend
> o backend da aplicação para gerenciar tarefas


## Requisitos obrigatórios
- [Python 3.*](https://www.python.org/downloads/)
- [Pip](https://pip.pypa.io/en/stable/installing/)

### Opicional
- [Docker](https://www.docker.com/products/docker-desktop)

## Instalação

Criar um ambiente virtual
```bash
python -m venv venv
```

Ativar o ambiente virtual
```bash
source venv/bin/activate
```

Instalar as dependências
```bash
pip install -r requirements.txt
```

Fazer as migrações
> Presumindo que o banco de dados esteja configurado corretamente
```bash
 flask --app core.app.server db init
```

```bash
 flask --app core.app.server db migrate
```

```bash
 flask --app core.app.server db upgrade
```

## Executar em desenvolvimento
```bash
python app.py
```

### Utilizando Docker

#### Contruindo a imagem
```bash
docker build -t backend-pid .
```