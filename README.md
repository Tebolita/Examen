# Instalación

Para instalar las dependencias necesarias para nuestro proyecto, ejecuta el siguiente comando en la carpeta raíz del proyecto:

```bash
npm install
```


> **Tip:** Asegúrate de tener instalada la versión de Node.js recomendada antes de ejecutar `npm install`.

---

# Ejecución

Para ejecutar el proyecto en modo desarrollo, utiliza:
```bash
npm run dev
```
Si deseas exponer el puerto y que sea accesible desde otras máquinas en la red:

```bash
npm run dev --host
```
Para exponer la api debemos de utilizar el comando
```bash
npm run json-server
```

> **Tip:** Accede a `http://localhost:5173` (o el puerto que indique la consola) para ver la aplicación en tu navegador.

---

# Decisiones Técnicas

## Estructuración de carpetas
```bash
< PROJECT ROOT >
public/
src/
  ├── assets/            # Imágenes, íconos, fuentes, estilos globales
  ├── components/        # Componentes reutilizables (botones, modales, inputs, etc.)
  │   ├── ui/            # Pequeños componentes de UI
  │   └── layout/        # Layouts como Navbar, Sidebar, Footer
  ├── pages/             # Vistas completas (Login, Dashboard, Profile, etc.)
  ├── utils/             # Funciones auxiliares
  ├── routes/            # Definición centralizada de rutas con React Router
  ├── styles/            # Estilos globales
  ├── App.tsx            # Componente raíz
  └── main.tsx           # Punto de entrada de React
```
## Justificación

- **Assets separados:** Facilita mantener organizadas imágenes, íconos y estilos globales.  
- **Components modulables:** Permite reutilizar componentes y mantener consistencia en la UI.  
- **Pages independientes:** Cada página tiene su propia lógica, más fácil de escalar.  
- **Utils centralizadas:** Funciones auxiliares reutilizables, mejora la mantenibilidad.  
- **Routes centralizadas:** Control total de las rutas y navegación de la app.  
- **Estilos globales:** Un solo lugar para los estilos generales, evitando duplicaciones.  
