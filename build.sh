#!/usr/bin/env bash
# Render Build Script for AI Voice Detector
set -o errexit

echo "📦 Building VoiceGuard AI React Frontend..."
cd frontend
npm install
npm run build
cd ..

echo "🐍 Installing Python Backend Dependencies..."
cd backend
pip install -r requirements.txt

echo "🗂️ Collecting Static Files..."
python manage.py collectstatic --no-input

echo "🚀 Build completed successfully!"
