# Development

Pasos para levantar la app de desarrollo

1. Levantar la base de datos

```
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno.
4. Ejecutar comando `npm install`
5. Ejecutar comando `npm run dev`
6. Ejecutar comando `npx prisma migrate dev`
7. Ejecutar comando `npx prisma generate`
8. Ejecutar el SEED [crea la DB local](http://localhost:3000/api/seed)

## Nota: Usuario por defecto

**usuaio:** test1@google.com
**password:** 123456

# Prisma Commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
