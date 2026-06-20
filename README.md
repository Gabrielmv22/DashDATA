# 🏭 DashDATA | Monitoreo y Telemetría Industrial

¡Bienvenido a DashDATA! Una aplicación web interactiva orientada al análisis de datos, telemetría y monitoreo de estado para maquinaria industrial. Este proyecto ha sido desarrollado como un panel de control (dashboard) analítico para visualizar métricas de rendimiento, predecir fallos y gestionar el mantenimiento de equipos de manera eficiente.

### Descripción general del sitio

**Propósito**
El propósito de DashDATA es proporcionar una herramienta visual y analítica para la gestión de maquinaria industrial. La aplicación funciona como un centro de control donde los ingenieros y analistas pueden visualizar datos telemétricos en tiempo real o históricos, aplicar filtros dinámicos y detectar patrones de fallos (como sobrecarga, desgaste de herramientas o problemas de disipación de calor) para tomar decisiones de mantenimiento preventivo.

**Público objetivo**
El sitio está dirigido a ingenieros de mantenimiento, analistas de datos industriales, gestores de planta e instituciones enfocadas en la optimización de procesos de manufactura. Es ideal para usuarios que requieren visualizar de forma clara relaciones complejas (como Torque vs Velocidad) y estadísticas de desgaste operativo.

**Alcance**
Este proyecto corresponde a una Single Page Application (SPA) desarrollada con React y Vite. Incluye una interfaz de usuario estructurada por componentes, estilos avanzados con Tailwind CSS, gráficos interactivos SVG y conexión asíncrona a una base de datos en la nube (Firebase Firestore).

**URL del sitio desplegado**
[https://gabrielmv22.github.io/DashDATA/](https://www.google.com/search?q=https://gabrielmv22.github.io/DashDATA/)

---

### 🚀 Características Principales

* **Estética Industrial UI:** Interfaz limpia y orientada a los datos, utilizando una paleta de colores corporativa (tonos slate, blue, red y emerald para estados críticos).


* **Diseño 100% Responsivo:** Optimización completa para visualización en pantallas de escritorio, tablets y dispositivos móviles mediante el uso de CSS Grid y Flexbox de Tailwind.


* **Gráficos Interactivos Avanzados:**
* Distribución de fallos mediante gráficos de barras.
* Análisis de dispersión (Scatter Chart) para correlacionar Torque vs Velocidad de Rotación.


* Visualización de cuartiles y promedios para el desgaste de herramientas por tipo de máquina.


* **Gestión de Estado y Filtrado en Tiempo Real:**
* Panel de filtros dinámico por Tipo de Máquina (L, M, H) y Tipo de Fallo.


* Recálculo automático de KPIs (Tasa de fallos críticos, desgaste promedio, temperatura máxima) mediante el hook `useMemo` de React.




* **Integración en la Nube:** Conexión directa a Firestore para la extracción y mapeo seguro de registros telemétricos.



---

### 🛠️ Tecnologías Utilizadas

El proyecto fue construido utilizando un stack moderno enfocado en la modularidad y el rendimiento:

| Tecnología | Uso / Rol en el Proyecto |
| --- | --- |
| **React (Vite)** | Framework frontend principal. Estructuración por componentes, manejo del DOM virtual y gestión del estado (`useState`, `useEffect`).|
| **Tailwind CSS** | Framework de estilos basado en utilidades para maquetación rápida, diseño responsivo y consistencia visual.|
| **Firebase (Firestore)** | Base de datos NoSQL en la nube para el almacenamiento y consulta de la telemetría de las máquinas.|
| **Recharts** | Biblioteca de visualización de datos basada en D3.js para la renderización de los gráficos interactivos.|
| **Lucide React** | Sistema de iconografía vectorial para indicadores de estado, alertas y menús de navegación.|

---

### 📊 Estructura del Panel de Control

| Sección | Descripción |
| --- | --- |
| **01 Cabecera y Filtros** | Identificación de usuario y panel de selección para segmentar datos por tipo de máquina y categoría de fallo.|
| **02 Tarjetas KPI** | Indicadores clave de rendimiento: Tasa de Fallos Críticos (%), Desgaste Promedio de Herramientas (min) y Temperatura Máxima de Proceso (K).|
| **03 Cuadrícula de Gráficos** | Módulos interactivos que incluyen la Distribución de Tipos de Fallo y la Relación Torque vs Velocidad de Rotación.|
| **04 Análisis de Desgaste** | Gráfico de barras detallando estadísticamente el desgaste de las herramientas segmentado por tipo de máquina (L, M, H).|
| **05 Alertas y Estadísticas** | Resumen numérico general (Total de registros, conteo de fallos) y un feed secuencial de las alertas críticas más recientes.|

---

### 🗃️ Modelo de Datos (MachineRecord)

La aplicación mapea y procesa los siguientes campos telemétricos provenientes de la base de datos:

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | Number | Identificador Único Universal (UDI) de la máquina. |
| `type` | String | Tipo de calidad del producto/máquina ('L', 'M', 'H'). |
| `airTemp` | Number | Temperatura del aire en Kelvin. |
| `processTemp` | Number | Temperatura del proceso en Kelvin. |
| `rotSpeed` | Number | Velocidad rotacional en revoluciones por minuto (rpm). |
| `torque` | Number | Fuerza de torsión en Newton-metros (Nm). |
| `toolWear` | Number | Desgaste acumulado de la herramienta de trabajo en minutos. |
| `failureType` | Categórico | Clasificación del fallo (None, Power, Tool Wear, Overstrain, Heat Dissipation). |

---

### 📂 Estructura del Proyecto

```text
dashdata/
│
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── client/
    ├── src/
    │   ├── App.tsx          # Componente principal e integración de Firestore
    │   ├── firebase.js      # Configuración de credenciales de Firebase
    │   ├── index.css        # Directivas de Tailwind CSS
    │   ├── vite-env.d.ts
    │   └── assets/          # Recursos estáticos
    └── public/

```

---

### 💻 Cómo abrir el proyecto localmente

Dado que este proyecto utiliza React y Vite, requiere un entorno de ejecución de Node.js.

1. **Clonar el repositorio:**
```bash
git clone https://github.com/gabrielmv22/dashdata.git
cd dashdata/client
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Ejecutar el servidor de desarrollo:**
```bash
npm run dev
```

4. **Abrir en el navegador:**
```bash
   La terminal indicará una dirección local (usualmente `http://localhost:5173/`). Abrir esta URL en cualquier navegador moderno.
```
---

### 👤 Autor y Estado del Proyecto

*   **Autor:** Gabriel Miño
*   **Estado del proyecto:** Proyecto de ingeniería finalizado y desplegado en producción. Módulo de visualización y base de datos funcionales.

© 2026 DashDATA

