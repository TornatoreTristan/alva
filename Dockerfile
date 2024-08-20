# Utiliser une image Node.js officielle comme image de base
FROM node:18-alpine

# Créer un répertoire pour l'application
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (ou yarn.lock)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build

# Exposer le port sur lequel l'application sera servie
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
