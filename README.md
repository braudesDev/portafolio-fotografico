# 📘 Documentación Técnica - Portafolio Fotográfico

Este proyecto fue generado con **Angular CLI versión 18.2.11** y está estructurado utilizando **componentes independientes (standalone)**, lo cual permite mayor flexibilidad y una arquitectura más limpia al evitar la necesidad de declarar componentes en un `AppModule`.

---

## ⚙️ Requisitos Previos

Antes de iniciar, asegúrate de tener instalado lo siguiente en tu entorno:

| Herramienta     | Versión Recomendada |
|-----------------|---------------------|
| Node.js         | >= 18.x             |
| Angular CLI     | ^18.2.11            |
| npm             | >= 9.x              |

Puedes verificar tus versiones con:

```bash
node -v
npm -v
ng version
```
    
## 📦 Instalación del Proyecto
Sigue estos pasos para clonar e instalar el proyecto en tu equipo local:

Clona el repositorio:

```bash
git clone https://github.com/tuUsuario/tuProyecto.git
```

Accede al directorio del proyecto:

```bash
cd tuProyecto
```
Instala las dependencias necesarias:

```bash
npm install
```
Esto descargará todos los módulos necesarios definidos en el package.json.

## 🚀 Servidor de Desarrollo
Para correr la aplicación en modo desarrollo, ejecuta:

```bash
ng serve
```

Luego abre tu navegador y visita:


http://localhost:4200/
Este servidor realiza recarga automática (hot-reload) al detectar cambios en el código fuente.

## 🧱 Componentes Standalone
¿Qué es un componente standalone?
En Angular 14+ se introdujo la capacidad de crear componentes que no dependen de un NgModule. Esto permite una arquitectura más moderna, ligera y desacoplada.

📌 Creación de un componente standalone
Para generar un componente standalone en Angular CLI:

```bash
ng generate component nombre-componente --standalone
```

Este comando genera un componente ya preparado con standalone: true en su decorador @Component.
Ejemplo:

```ts
@Component({
  standalone: true,
  selector: 'app-ejemplo',
  templateUrl: './ejemplo.component.html',
  styleUrls: ['./ejemplo.component.css'],
})
```
Luego puedes importarlo directamente en otros componentes standalone o en rutas.

## 🏗️ Compilación para Producción
Para generar una versión optimizada del proyecto:

```bash
ng build --configuration production
```

Los archivos resultantes se almacenarán en la carpeta:

```bash
/dist
```

Estos archivos pueden ser utilizados directamente para su despliegue en un servidor como Firebase Hosting, Netlify o Vercel.


## 🔌 Librerías y Dependencias Utilizadas

A continuación se enlistan las principales librerías externas utilizadas en este proyecto:


| Librería              | Función Principal                                                      |
|------------------------|------------------------------------------------------------------------|
| `@angular/material`    | Componentes UI como botones, iconos y tarjetas                         |
| `@angular/animations`  | Animaciones integradas en Angular                                      |
| `typewriter-effect`    | Animación de máquina de escribir en el texto principal                 |
| `jspdf`                | Generación de archivos PDF desde el navegador                          |
| `formspree`            | Envío de formularios sin necesidad de backend                          |
| `firebase`             | Hosting, Firestore (base de datos) y servicios de autenticación        |



Comando para instalar las dependencias (si hiciera falta):

```bash
npm install
@angular/material 
@angular/animations 
typewriter-effect 
jspdf 
firebase
```


## 🔐 Seguridad
Las reglas de seguridad de Firebase Firestore están configuradas para permitir solo lectura/escritura autenticada (según el caso).

No se almacenan datos sensibles en el navegador.

Los formularios utilizan servicios externos seguros (Formspree).

☁️ Despliegue en Firebase Hosting
Para subir tu aplicación a Firebase Hosting:

**Compila tu proyecto en modo producción:**

```bash
ng build --configuration production
```
Inicia sesión en Firebase:

```bash
firebase login
```
Despliega tu proyecto:

```bash
firebase deploy
```

## 🧹 Limpieza y Buenas Prácticas
El directorio node_modules/ no está incluido en el repositorio (es generado al correr npm install).

Usa ng lint para mantener el código limpio.

Utiliza rutas lazy-loading para una mejor carga y rendimiento.

❓ Soporte y Ayuda
Para más comandos disponibles puedes consultar:

```bash
ng help
```
También puedes visitar la documentación oficial de Angular para más detalles.

👨‍💻 Autor
Braulio Rodríguez
Desarrollador Frontend Jr.
GitHub: @braudesDev

🪪 Licencia
Este proyecto está disponible para uso personal, educativo o como base para desarrollos personalizados.
Queda prohibida su distribución masiva sin autorización expresa del autor.
