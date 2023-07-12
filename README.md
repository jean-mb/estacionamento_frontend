# Gestão de Estacionamento | Interface Web
 - Aplicação web para gestão de estacionamento, desenvolvido em ambiente acadêmico. Disponibiliza o CRUD completo de todoas as entidades
 - Autor: Jean Felipe Moschen Buss
   
## Índice

- [Tecnologias](#tecnologias)
- [Features](#features)
- [Setup](#setup)
- [Deploy em Docker-Compose](#deploy-em-docker-compose)

## Tecnologias 

![Vuejs](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![npm](	https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css](	https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## Features
#### Configuração do Sistema
![image](https://github.com/jean-mb/estacionamento_frontend/assets/79486623/5bd2b296-26e2-4acc-a95f-4f4d8a8098be)

#### Gestão de Marcas de modelos dos veículos
![image](https://github.com/jean-mb/estacionamento_frontend/assets/79486623/b03b6a97-7642-4bc2-9f98-a9425fd13a65)

#### Gestão de Modelos de veículos
![image](https://github.com/jean-mb/estacionamento_frontend/assets/79486623/a0071fbe-9536-4db8-aba2-c387c8adbe9f)

#### Gestão de Veículos
![image](https://github.com/jean-mb/estacionamento_frontend/assets/79486623/56be17c9-7712-4a4e-ac15-387f48b42fa3)

#### Gestão e Histórico de Condutores
![image](https://github.com/jean-mb/estacionamento_frontend/assets/79486623/2800c93c-e7aa-4d7d-9ad1-e8f4caab10ef)

#### Controle das Movimentações 
![image](https://github.com/jean-mb/estacionamento_frontend/assets/79486623/0eb48f29-b225-4724-9709-f234d27521dc)

#### Controle das Vagas
![image](https://github.com/jean-mb/estacionamento_frontend/assets/79486623/0a3ee923-4c47-42b4-91b3-0bb8f2e79229)

##  Setup
#### Setup do Front-end (Vue.js)
```
npm install
```
O arquivo [.env](https://github.com/jean-mb/estacionamento_frontend/blob/main/.env) contém a variável de ambiente VUE_APP_BACKEND_URL que guarda a URL para o servidor backend. Altere conforme suas necessidades se quiser desenvolver localmente ou for alterar o Proxy do Nginx

####  Setup do Back-end e Banco de Dados (Java & PostgreSQL)

 - Veja no repositório dedicado ao back-end -> [Estacionamento Back-end](https://github.com/jean-mb/estacionamento_backend)
 - Ou faça via docker-compose -> [Deploy em Docker-Compose](#deploy-em-docker-compose)
## Build
#### Compilação em modo de desenvolvimento
```
npm run serve
```

#### Compilação para produção
```
npm run build
```

## Deploy em Docker-Compose
Para fazer deploy da stack inteira, ou seja: 
- Este repositório
- O repositório [Estacionamento Back-end](https://github.com/jean-mb/estacionamento_backend)
- Banco de Dados [PostgreSQL](https://hub.docker.com/_/postgres),
 
Execute o seguinte docker-compose:

```
version: '3'
name: estacionamento
services:
  frontend:
    image: ghcr.io/jean-mb/estacionamento_frontend:main
    ports:
      - '80:80'
    depends_on:
      - backend
    restart: unless-stopped
    networks:
      - estacionamento
  backend:
    image: ghcr.io/jean-mb/estacionamento_backend:main
    ports:
      - '8080:8080'
    depends_on:
      - postgres
    restart: unless-stopped
    networks:
      - estacionamento
  postgres:
    image: postgres
    ports:
      - '5432:5432'
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=estacionamento
    volumes:
      - ~/estacionamento-db:/var/lib/postgresql/data
    restart: unless-stopped
    networks:
      - estacionamento
networks:
  estacionamento:
    name: estacionamento
    ipam:
      driver: default
```
Esse repositório, conforme apontado no [Dockerfile](https://github.com/jean-mb/estacionamento_frontend/blob/main/Dockerfile) será compilado e servido por Nginx, com um Proxy para a URL do servidor backend.

A aplicação ficará disponivel:
- UI / Frontend = Porta 80
- Aplicação Backend = Porta 8080
- Banco de Dados PostgreSQL = Porta 5432
