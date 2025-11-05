#!/usr/bin/env bash
# Arranca servidor estático en background y expone con ngrok
# Uso: ./scripts/start_with_ngrok.sh
set -e
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"
# Arranca servidor estático en background
python3 -m http.server 8000 --bind 0.0.0.0 &
HTTP_PID=$!
echo "Servidor HTTP arrancado (PID=$HTTP_PID)"
# Espera un segundo y lanza ngrok
sleep 1
if ! command -v ngrok >/dev/null 2>&1; then
  echo "ngrok no está instalado o no está en PATH. Instálalo primero."
  kill $HTTP_PID || true
  exit 1
fi
ngrok http 8000
# Al terminar ngrok, mata el servidor
kill $HTTP_PID || true
