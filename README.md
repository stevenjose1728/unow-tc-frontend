# Frontend - Sistema de Gestión de Empleados

Sistema de gestión de empleados desarrollado en React con TypeScript, implementando las mejores prácticas de desarrollo y un diseño moderno con Tailwind CSS.

## Tecnologías Principales

- React 18 con TypeScript
- Redux + Redux Persist
- React Hook Form con Zod
- Tailwind CSS
- Axios

## Instalación

1. Clona el repositorio:

```bash
git clone
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura las variables de entorno:

```bash
cp .env.example .env
```

```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_JOBS_API_URL=https://ibillboard.com/api/positions
```

4. Inicia el proyecto:

```bash
npm start
```

## Estructura del Proyecto

```
src/
  ├── models/          # Interfaces y tipos de datos
  ├── hooks/           # Hooks personalizados
  ├── guards/           # Check de sesion y permisos
  ├── layouts/
  ├── routes/         # Rutas para react-router
  ├── services/        # Servicios para API
  ├── store/            # Config y slices de Redux
  ├── pages/            # Páginas principales
  └── components/       # Componentes reutilizables
```

## Funcionalidades

- Autenticación con JWT
- Gestión de usuarios (CRUD)
- Perfil de usuario
- Búsqueda y paginación
- Validaciones de formularios
- Estado persistente

## Comandos Disponibles

```bash
npm start     # Inicia el servidor de desarrollo
npm build     # Construye la aplicación para producción
npm test      # Ejecuta los tests
npm run lint  # Ejecuta el linter
```

## Buenas Prácticas Implementadas

- TypeScript para tipado estático
- Hooks personalizados para lógica reutilizable
- Validación de formularios con Zod
- Manejo centralizado del estado con Redux
- Interceptores de Axios para tokens
- Diseño responsive con Tailwind

## Autor

Steven Varela - Desarrollador Frontend Senior
