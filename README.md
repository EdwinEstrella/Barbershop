
# Barbería "El Corte del Caballero" - Guía de Puesta en Marcha

Esta guía te mostrará cómo poner en marcha la aplicación completa, incluyendo el backend (API) y el frontend (la página web).

## Prerrequisitos

Asegúrate de tener instalado lo siguiente en tu sistema:
- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) (generalmente se instala con Node.js)
- Acceso a tu base de datos PostgreSQL.

## Estructura del Proyecto

Tu proyecto debería tener la siguiente estructura de carpetas:

```
/tu-proyecto/
|-- /backend/          <-- Carpeta para el servidor y la API
|   |-- .env
|   |-- package.json
|   |-- server.js
|   |-- database.sql
|   |-- node_modules/
|
|-- /frontend/         <-- Carpeta con todos los archivos de tu página web
|   |-- index.html
|   |-- index.tsx
|   |-- App.tsx
|   |-- /components/
|   |-- ... (resto de archivos del frontend)
```
**Acción:** Coloca todos los archivos del backend que te he proporcionado dentro de una nueva carpeta llamada `backend`. Tu aplicación web actual (los archivos `index.html`, `App.tsx`, etc.) debería estar en una carpeta `frontend`.

---

## Paso 1: Configurar la Base de Datos

1.  **Crear las Tablas**:
    -   Conéctate a tu base de datos PostgreSQL usando tu herramienta preferida (pgAdmin, DBeaver, etc.).
    -   Abre el archivo `backend/database.sql`.
    -   Copia y ejecuta todo el contenido del archivo. Esto creará las tablas `users` y `appointments`. Solo necesitas hacer esto una vez.

---

## Paso 2: Configurar y Ejecutar el Backend

1.  **Abre una terminal** y navega a la carpeta del backend:
    ```bash
    cd ruta/a/tu-proyecto/backend
    ```

2.  **Instala las dependencias** del servidor:
    ```bash
    npm install
    ```

3.  **Configura tus credenciales**:
    -   Abre el archivo `backend/.env`.
    -   **¡MUY IMPORTANTE!** Cambia el valor de `JWT_SECRET` por una frase secreta larga y aleatoria. Puedes generar una en [https://www.lastpass.com/features/password-generator](https://www.lastpass.com/features/password-generator).

4.  **Inicia el servidor**:
    ```bash
    npm start
    ```
    Si todo va bien, verás el mensaje: `Servidor de la API corriendo en http://localhost:3001`. ¡No cierres esta terminal!

---

## Paso 3: Ejecutar el Frontend

Tu frontend no necesita un proceso de "build", pero debe ser servido por un servidor web para que pueda hacer peticiones a tu backend en `localhost`.

1.  **Abre OTRA terminal** y navega a la carpeta del frontend:
    ```bash
    cd ruta/a/tu-proyecto/frontend
    ```

2.  **Inicia un servidor web local**. La forma más sencilla es usando `serve`:
    -   Si no lo tienes, instálalo globalmente: `npm install -g serve`
    -   Inicia el servidor:
    ```bash
    serve -l 3000
    ```

3.  **Accede a tu aplicación**: Abre tu navegador y ve a [http://localhost:3000](http://localhost:3000).

---

## Paso 4: ¡Primeros Pasos en la Aplicación!

Tu aplicación está funcionando, pero el panel de control necesita un usuario administrador. Como no hay una página de registro pública, crearemos el primer usuario manualmente.

1.  **Abre una TERCERA terminal** (o usa una herramienta como Postman o Insomnia).

2.  **Ejecuta el siguiente comando `curl`** para registrar tu usuario. Reemplaza `tu-email@dominio.com` y `tu-contraseña-segura` con los que quieras usar para iniciar sesión.

    ```bash
    curl -X POST http://localhost:3001/api/register \
    -H "Content-Type: application/json" \
    -d '{"email": "tu-email@dominio.com", "password": "tu-contraseña-segura"}'
    ```

3.  **¡Listo!** Ahora puedes ir a tu web en [http://localhost:3000](http://localhost:3000), hacer clic en "Iniciar Sesión" y usar las credenciales que acabas de registrar.

¡Felicidades! Tu aplicación de barbería ahora es completamente funcional, conectada a una base de datos y lista para ser usada.
    