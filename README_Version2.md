# Laravel 12 + ReactJS Login Application

A complete containerized login system with Laravel 12 backend, ReactJS frontend, PostgreSQL database, and Nginx reverse proxy with HTTPS.

## Features

- **Authentication**: Laravel Sanctum token-based authentication
- **Dynamic Theming**: Changes based on selected company
- **Navigation System**: Hierarchical module navigation with search
- **Permissions**: Role-based access to modules/submodules
- **Responsive Design**: TailwindCSS with custom theming
- **Containerized**: Docker Compose setup with hot-reloading

## Tech Stack

- **Backend**: Laravel 12, PHP 8.3, PostgreSQL
- **Frontend**: ReactJS 18, TailwindCSS, Axios
- **Infrastructure**: Docker, Nginx, OpenSSL

## Quick Start

### 1. Clone and Setup

```bash
# Clone or create the project directory
mkdir laravel-react-login
cd laravel-react-login

# Generate SSL certificates
chmod +x generate-ssl.sh
./generate-ssl.sh
```

### 2. Create Laravel Backend

```bash
# Create Laravel project
composer create-project laravel/laravel:^11.0 backend
cd backend

# Install Sanctum
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Copy all the provided files to their respective locations
# (All migrations, models, controllers, seeders, routes, config files)

cd ..
```

### 3. Create React Frontend

```bash
# Create React app
npx create-react-app frontend
cd frontend

# Install dependencies
npm install axios tailwindcss @headlessui/react @heroicons/react react-router-dom

# Initialize Tailwind
npx tailwindcss init

# Copy all the provided React files to their respective locations

cd ..
```

### 4. Start the Application

```bash
# Start all services
docker-compose up -d

# Wait for services to start, then run Laravel setup
docker-compose exec backend php artisan key:generate
docker-compose exec backend php artisan migrate
docker-compose exec backend php artisan db:seed
```

### 5. Access the Application

- **Frontend**: https://localhost
- **API**: https://localhost/api
- **Database**: localhost:5432

### Demo Credentials

| Username | Password | Company | Description |
|----------|----------|---------|-------------|
| admin | password | Tech Innovations Inc. | Full access |
| jdoe | password | Tech Innovations Inc. | Limited access |
| greenadmin | password | Green Solutions Ltd. | Full access |
| designer | password | Creative Designs Co. | Limited access |

## Development

### Hot Reloading

Both Laravel and React support hot reloading:
- Laravel: File changes are automatically reflected
- React: `npm start` with hot reload enabled

### Database Access

```bash
# Access PostgreSQL
docker-compose exec postgres psql -U laravel -d laravel_login
```

### Logs

```bash
# View logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs nginx
```

## Architecture

### Database Schema

- **companies**: Company information with branding
- **users**: User accounts linked to companies
- **systems**: Top-level navigation systems
- **modules**: System modules with icons
- **submodules**: Specific module functions
- **user_submodule**: Permission assignments

### API Endpoints

- `GET /api/companies` - List companies
- `POST /api/login` - User authentication
- `POST /api/logout` - User logout
- `GET /api/user` - Current user info
- `GET /api/navigation` - User navigation tree
- `GET /api/navigation/search` - Search navigation

### Frontend Components

- **AuthContext**: Global authentication state
- **Login**: Authentication form
- **Dashboard**: Main application layout
- **Header**: User menu and company branding
- **Navigation**: Hierarchical module tree with search

## Customization

### Adding New Companies

1. Add to `CompanySeeder.php`
2. Run `php artisan db:seed --class=CompanySeeder`

### Adding New Modules

1. Add to respective seeders
2. Run `php artisan migrate:fresh --seed`

### Theme Colors

Companies can have custom `primary_color` and `accent_color` values that automatically update the UI theme.

## Troubleshooting

### SSL Certificate Issues

```bash
# Regenerate certificates
rm -rf nginx/ssl/*
./generate-ssl.sh
docker-compose restart nginx
```

### Database Connection Issues

```bash
# Check database status
docker-compose exec postgres pg_isready -U laravel

# Reset database
docker-compose down
docker volume rm laravel-react-login_postgres_data
docker-compose up -d
```

### Permission Issues

```bash
# Fix Laravel permissions
docker-compose exec backend chown -R www-data:www-data /var/www/html
docker-compose exec backend chmod -R 755 /var/www/html/storage
```

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).