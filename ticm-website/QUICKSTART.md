# 🚀 DÉMARRAGE RAPIDE - Administration TICM

## 1️⃣ Arrêtez tous les serveurs actuels

## 2️⃣ Installez les dépendances (si ce n'est pas fait)

### Backend
```bash
cd backend
composer install
```

### Frontend
```bash
cd ../
npm install
```

## 3️⃣ Démarrez les serveurs

### Terminal 1 - Backend (Laravel)
```bash
cd backend
php artisan serve
# Le serveur démarre sur http://localhost:8000
```

### Terminal 2 - Frontend (React)
```bash
npm run dev
# Le serveur démarre sur http://localhost:5173
```

## 4️⃣ Accédez à l'administration

### 🏠 Site principal
```
http://localhost:5173
```

### 🔐 Panel Administration
Cliquez sur le bouton **⚙️** en bas à droite de la page d'accueil
OU accédez directement à:
```
http://localhost:5173/admin/login
```

### Identifiants
- **Email**: `admin@ticm.com`
- **Mot de passe**: `Admin123!@#`

---

## ✨ Fonctionnalités Disponibles

### 📊 Tableau de bord
- Vue d'ensemble des contacts et services
- Statistiques en temps réel

### 📧 Gestion des Contacts
- Voir la liste des contacts reçus via le formulaire
- Consulter les détails de chaque contact
- Supprimer des contacts

### 🔧 Gestion des Services
- Voir tous les services
- Consulter les détails des services

---

## 🔧 Commandes Utiles

### Backend
```bash
# Migrations
php artisan migrate          # Exécuter les migrations
php artisan migrate:reset    # Réinitialiser la BD
php artisan migrate:refresh  # Réinitialiser et relancer

# Services
php artisan serve            # Lancer le serveur

# Seeding
php artisan db:seed --class=AdminUserSeeder  # Créer l'administrateur
```

### Frontend
```bash
# Développement
npm run dev                  # Démarrer le serveur de développement
npm run build               # Construire for production
npm run preview             # Prévisualiser la build production
npm run lint                # Vérifier le linting
```

---

## 📝 Configuration Importante

### Base de données
- **Hôte**: 127.0.0.1
- **Port**: 3306
- **Base**: TICM
- **Utilisateur**: root
- **Mot de passe**: (vide par défaut)

Fichier: `backend/.env`

### Authentification API
Le système utilise **Laravel Sanctum** pour l'authentification par tokens.

---

## 🐛 Dépannage

### Erreur "Connection refused" sur 8000
- Vérifiez que Laravel est lancé: `php artisan serve`
- Vérifiez le port: http://localhost:8000

### Erreur "Connection refused" sur 5173
- Vérifiez que Vite est lancé: `npm run dev`
- Vérifiez le port: http://localhost:5173

### Impossible de se connecter
- Vérifiez que MySQL est en cours d'exécution
- Vérifiez l'email et le mot de passe
- Consultez `backend/storage/logs/laravel.log` pour les erreurs

### CORS errors
- Le middleware CORS est configuré pour accepter toutes les origines en développement
- En production, mettez à jour `backend/app/Http/Middleware/AllowCors.php`

---

## 📚 Ressources

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)

---

## ⚠️ Sécurité

⚠️ **EN PRODUCTION:**

1. Changez le mot de passe administrateur
2. Mettez à jour le middleware CORS
3. Configurez les variables d'environnement de production
4. Activez HTTPS
5. Mettez en place une limite de taux (rate limiting)

