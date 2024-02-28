#!/bin/bash

# This script will create a new migration and apply it to the database

# Generate a unique migration name with a timestamp
MIGRATION_NAME="AutoMigration_$(date +%Y%m%d%H%M%S)"

# Create a new migration
echo "Creating migration: $MIGRATION_NAME"
dotnet ef migrations add "$MIGRATION_NAME"

# Check if the migration was created successfully
if [ $? -ne 0 ]; then
    echo "Failed to create migration"
    exit 1
fi

# Apply migrations to the database
echo "Applying migration: $MIGRATION_NAME"
dotnet ef database update
