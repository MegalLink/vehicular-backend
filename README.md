## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

1. Prepare project

```bash
$  npm i -g @nestjs/cli
```

```bash
$ npm i
```

2. Clone **.env.template**

3. Set env vars on **.env** file

4. Up databse

```bash
$ docker-compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Documentación

### Base de Datos

Puedes encontrar el diagrama de entidad-relación y la documentación completa de la base de datos en el archivo [DATABASE.md](./DATABASE.md).

### Variables de Entorno

La configuración de las variables de entorno necesarias para el proyecto está documentada en [ENVIRONMENT.md](./ENVIRONMENT.md). Este archivo incluye todas las variables requeridas, sus valores de ejemplo y notas importantes para los diferentes entornos de desarrollo y producción.

### Estructura del Proyecto

```
src/
├── auth/                 # Módulo de autenticación
├── brand/                # Módulo de marcas
├── category/             # Módulo de categorías
├── common/               # Código compartido
├── files/                # Manejo de archivos
├── notification/         # Notificaciones
├── order/                # Órdenes
├── spare_part/           # Repuestos
└── user-detail/          # Detalles de usuario
```

### Arquitectura del Proyecto

El proyecto sigue una arquitectura basada en el **patrón de diseño por capas** y principios de **Arquitectura Limpia (Clean Architecture)**, con una clara separación de responsabilidades. A continuación, se detallan los aspectos clave:

#### Estructura de Módulos
Cada módulo principal (auth, brand, order, etc.) sigue la siguiente estructura:
```
module/
├── application/      # Lógica de negocio
│   ├── dto/         # Objetos de transferencia de datos
│   ├── interfaces/  # Contratos e interfaces
│   └── services/    # Servicios de aplicación
├── domain/          # Entidades y lógica de dominio
├── infrastructure/  # Implementaciones concretas
│   ├── controllers/ # Controladores de la API
│   └── repositories # Implementaciones de repositorios
└── module.module.ts # Definición del módulo
```

#### Flujo Típico de una Petición
1. **Capa de Entrada**: El controlador recibe la petición HTTP
2. **Validación**: Los DTOs validan los datos de entrada
3. **Lógica de Negocio**: El servicio correspondiente procesa la solicitud
4. **Acceso a Datos**: El repositorio interactúa con la base de datos
5. **Respuesta**: El controlador devuelve la respuesta formateada

#### Tecnologías y Patrones Clave
- **NestJS**: Framework principal
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticación
- **Swagger**: Documentación de API
- **Docker**: Contenedorización solo en local de la base de datos
- **Inyección de Dependencias**: Para un código desacoplado

Esta arquitectura facilita el mantenimiento, las pruebas y la escalabilidad de la aplicación, siguiendo las mejores prácticas de desarrollo de software moderno.