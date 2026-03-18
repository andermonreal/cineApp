# 🎬 CineApp

Aplicación web de catálogo cinematográfico desarrollada con **React + Bootstrap + Firebase**, siguiendo una **arquitectura hexagonal** (puertos y adaptadores).

---

## ✨ Funcionalidades

| Funcionalidad | Descripción |
|---|---|
| 📽️ Catálogo | Grid de películas con búsqueda y filtros por género |
| 🎬 Ficha de película | Detalle completo: sinopsis, reparto, puntuación media |
| ⭐ Valoraciones | Usuarios registrados puntúan del 1 al 5 |
| 💬 Comentarios | Hilo de comentarios por película |
| ❤️ Favoritos | Lista personal de películas favoritas |
| 🔐 Autenticación | Registro e inicio de sesión con email/contraseña |
| 📄 Páginas estáticas | Contacto y Aviso Legal |

## Como añadir muchas peliculas más

Verficiar que:
1. La regla de Firestore de la colección movies este: `allow write: if true;`.
2. Tienes un .env.local con la configuración de la conexión del firebase en la raiz del repositorio.

Modifica la constante 'MOVIES' de `scripts/seed.mjs` con las peliculas que quieres añadir y después ejecuta `node scripts/seed.mjs`.


## 📁 Estructura del proyecto

```
src/
├── core/                           # Capa de dominio y aplicación
│   ├── domain/
│   │   ├── entities/               # Entidades del dominio (Movie)
│   │   └── ports/                  # Interfaces/contratos de repositorios
│   └── application/
│       └── usecases/               # Casos de uso (lógica de negocio)
├── infrastructure/
│   └── firebase/                   # Implementaciones Firebase de los puertos
│       ├── config.js
│       ├── FirebaseMovieRepository.js
│       ├── FirebaseCommentRepository.js
│       ├── FirebaseFavoriteRepository.js
│       ├── FirebaseAuthRepository.js
│       └── seedMovies.js           # Script de datos iniciales
└── presentation/                   # Capa de presentación (React)
    ├── components/
    │   ├── auth/                   # AuthModal
    │   ├── common/                 # Navbar, Footer, LoadingSpinner
    │   └── movies/                 # MovieCard, StarRating, CommentSection
    ├── context/                    # AuthContext
    ├── hooks/                      # useMovies, useMovie
    ├── pages/                      # HomePage, MovieDetailPage, FavoritesPage, etc.
    └── styles/                     # CSS global
```

## ⚙️ Configuración inicial

### 1. Requisitos previos

- Node.js >= 18
- npm >= 9
- Firebase CLI: `npm install -g firebase-tools`

### 2. Instalar dependencias

```bash
cd cineApp
npm install
```

### 3. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Abre el proyecto **webappreact-5bbca**
3. En **Configuración del proyecto → Aplicaciones web**, copia la configuración
4. Edita `src/infrastructure/firebase/config.js` y reemplaza los valores:

```js
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "webappreact-5bbca.firebaseapp.com",
  projectId: "webappreact-5bbca",
  storageBucket: "webappreact-5bbca.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};
```

### 4. Activar servicios en Firebase Console

- **Authentication** → Habilitar proveedor **Email/Contraseña**
- **Firestore Database** → Crear base de datos en modo **producción**
- **Hosting** → Activar (se configura automáticamente)

### 5. Aplicar reglas de Firestore

```bash
firebase login
firebase deploy --only firestore:rules
```


---

## 🚀 Desarrollo local

```bash
npm start
```

La app se abrirá en http://localhost:3000