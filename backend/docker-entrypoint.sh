#!/bin/bash
set -e

# Wait for database to be ready
echo "Waiting for database..."
until php artisan migrate:status 2>/dev/null; do
    echo "Database not ready, waiting..."
    sleep 2
done

# Generate app key if it doesn't exist
if [ ! -f .env ] || ! grep -q "APP_KEY=base64:" .env; then
    php artisan key:generate
fi

# Run migrations
php artisan migrate --force

# Execute the main command
exec "$@"