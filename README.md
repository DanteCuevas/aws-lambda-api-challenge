## Project Specifications

**Tecnologías usadas**
- DOCKER
- DOCKER COMPOSE 3
- Node v16.19
- Mongo 5.9
- Redis 4.6
- Typescript 4.7
- Serverless 3.21

**Requisito**

- Instalar Docker en tu máquina(https://docs.docker.com/engine/install/)

**Instalacion**
- Clonar el proyecto. 
- Ingresar a la carpeta del proyecto.
- Copiar y pegar los enviroments.
```bash
cp .env.example .env
```
```bash
cp .env.test.example .env.test
```
- Iniciar los contenedores:
```bash
docker-compose up -d --build
```
- Para hacer un build de typescript a commonjs:
```bash
docker-compose exec serverless-node npm run build
```
- Ejecutar los test:
```bash
docker-compose exec serverless-node npm run test
```
- Para probar los endpoints usar el archivo de postman.collections adjuntado:
```bash
ServerlessTest.postman_collection.json
```

**SERVER AWS (TEMP)**

- Check health with curl:
```bash
http://ec2-44-206-231-127.compute-1.amazonaws.com:4000/api/v1/health
```
- Url Grafana:
```bash
http://ec2-44-206-231-127.compute-1.amazonaws.com:3000
```
- Url Video:
```bash
https://drive.google.com/file/d/1Y46fc5GYd9XAb97JsHa1NC17x7wAmdy5/view?usp=sharing
```
