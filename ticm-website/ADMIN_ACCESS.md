# 🔐 ACCÈS ADMINISTRATION TICM

## Informations de Connexion

### 📧 Email
```
admin@ticm.com
```

### 🔑 Mot de passe
```
Admin123!@#
```

### 🌐 URL de Connexion
```
http://localhost:5173/admin/login
```

---

## 📝 Instructions d'Accès

1. **Accéder à la page d'administration**
   - Ouvrez votre navigateur
   - Allez à: `http://localhost:5173/admin/login`

2. **Se connecter**
   - Email: `admin@ticm.com`
   - Mot de passe: `Admin123!@#`
   - Cliquez sur "Se connecter"

3. **Tableau de bord**
   - Vous serez redirigé vers le tableau de bord d'administration
   - Vous pouvez voir les contacts et services

---

## 🎯 Fonctionnalités du Tableau de Bord

### 📊 Tableau de bord
- Vue d'ensemble des statistiques
- Nombre de contacts reçus
- Nombre de services enregistrés

### 📧 Gestion des Contacts
- Liste complète des contacts reçus
- Voir les détails de chaque contact
- Supprimer les contacts

### 🔧 Gestion des Services
- Visualiser tous les services
- Voir les détails des services

### 🚪 Déconnexion
- Cliquez sur le bouton "Déconnexion" dans le coin supérieur droit

---

## 🛠️ Technologies Utilisées

### Backend
- **Framework**: Laravel 11
- **Authentification**: Laravel Sanctum (API Tokens)
- **Base de données**: MySQL

### Frontend
- **Framework**: React 19
- **Routing**: React Router v7
- **Styling**: CSS personnalisé

---

## 📋 Routes API Disponibles

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion (authentifié)
- `GET /api/auth/me` - Infos utilisateur (authentifié)

### Contacts
- `GET /api/contacts` - Liste des contacts
- `GET /api/contacts/:id` - Détails d'un contact
- `DELETE /api/contacts/:id` - Supprimer un contact

### Services
- `GET /api/services` - Liste des services
- `GET /api/services/:id` - Détails d'un service

---

## ⚠️ Important

⚠️ **CHANGEZ LE MOT DE PASSE !**

Pour modifier le mot de passe, vous pouvez utiliser Tinker ou créer un nouvel administrateur avec un mot de passe plus sûr.

```bash
php artisan tinker
> $user = App\Models\User::find(1);
> $user->password = Hash::make('VotreNouveauMotDePasse');
> $user->save();
```

---

## 🐛 Dépannage

### La page de connexion ne s'affiche pas
- Vérifiez que le serveur Vite est en cours d'exécution: `npm run dev`
- Vérifiez que le serveur Laravel est en cours d'exécution

### Erreur "Les identifiants fournis sont incorrects"
- Vérifiez l'email et le mot de passe
- Vérifiez que l'utilisateur a bien été créé dans la base de données

### Les données ne s'affichent pas dans le dashboard
- Vérifiez que le serveur Laravel est en cours d'exécution
- Vérifiez les accès CORS si vous avez des erreurs réseau
- Vérifiez la console du navigateur pour les erreurs

---

## 🚀 Démarrage

### Terminal 1 - Backend (Laravel)
```bash
cd backend
php artisan serve
```

### Terminal 2 - Frontend (React)
```bash
npm run dev
```

Puis accédez à:
- **Site principal**: http://localhost:5173
- **Admin panel**: http://localhost:5173/admin/login

