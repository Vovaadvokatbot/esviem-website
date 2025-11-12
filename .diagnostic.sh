#!/bin/bash

echo "=================================="
echo "ДИАГНОСТИКА СРЕДЫ РАЗВЕРТЫВАНИЯ"
echo "=================================="
echo ""

# Операционная система
echo "=== ОПЕРАЦИОННАЯ СИСТЕМА ==="
uname -a
lsb_release -a 2>/dev/null || cat /etc/os-release 2>/dev/null
echo ""

# Ресурсы сервера
echo "=== РЕСУРСЫ СЕРВЕРА ==="
echo "CPU:"
lscpu | grep -E "Model name|CPU\(s\):|Thread|Core"
echo ""
echo "Память:"
free -h
echo ""
echo "Диск:"
df -h
echo ""

# Веб-серверы
echo "=== ВЕБ-СЕРВЕРЫ ==="
echo "Nginx:"
nginx -v 2>&1 || echo "Не установлен"
systemctl is-active nginx 2>/dev/null || echo "Статус: неактивен"
echo ""
echo "Apache:"
apache2 -v 2>&1 || httpd -v 2>&1 || echo "Не установлен"
systemctl is-active apache2 2>/dev/null || systemctl is-active httpd 2>/dev/null || echo "Статус: неактивен"
echo ""

# Языки программирования
echo "=== ЯЗЫКИ И RUNTIME ==="
echo "PHP:"
php -v 2>&1 || echo "Не установлен"
echo ""
echo "Python:"
python3 --version 2>&1 || echo "Не установлен"
echo ""
echo "Node.js:"
node --version 2>&1 || echo "Не установлен"
npm --version 2>&1 || echo "npm не установлен"
echo ""
echo "Ruby:"
ruby --version 2>&1 || echo "Не установлен"
echo ""

# Базы данных
echo "=== БАЗЫ ДАННЫХ ==="
echo "MySQL/MariaDB:"
mysql --version 2>&1 || echo "Не установлен"
systemctl is-active mysql 2>/dev/null || systemctl is-active mariadb 2>/dev/null || echo "Статус: неактивен"
echo ""
echo "PostgreSQL:"
psql --version 2>&1 || echo "Не установлен"
systemctl is-active postgresql 2>/dev/null || echo "Статус: неактивен"
echo ""
echo "MongoDB:"
mongod --version 2>&1 || echo "Не установлен"
systemctl is-active mongod 2>/dev/null || echo "Статус: неактивен"
echo ""
echo "Redis:"
redis-server --version 2>&1 || echo "Не установлен"
systemctl is-active redis 2>/dev/null || echo "Статус: неактивен"
echo ""

# SSL/TLS
echo "=== SSL/TLS ==="
echo "Certbot:"
certbot --version 2>&1 || echo "Не установлен"
echo ""
echo "OpenSSL:"
openssl version 2>&1 || echo "Не установлен"
echo ""

# Docker
echo "=== КОНТЕЙНЕРИЗАЦИЯ ==="
echo "Docker:"
docker --version 2>&1 || echo "Не установлен"
systemctl is-active docker 2>/dev/null || echo "Статус: неактивен"
echo ""
echo "Docker Compose:"
docker-compose --version 2>&1 || echo "Не установлен"
echo ""

# Git
echo "=== КОНТРОЛЬ ВЕРСИЙ ==="
git --version 2>&1 || echo "Git не установлен"
echo ""

# Порты
echo "=== ОТКРЫТЫЕ ПОРТЫ ==="
ss -tulpn 2>/dev/null | grep LISTEN || netstat -tulpn 2>/dev/null | grep LISTEN
echo ""

# Файрвол
echo "=== ФАЙРВОЛ ==="
ufw status 2>/dev/null || echo "UFW не установлен/не настроен"
echo ""
iptables -L -n 2>/dev/null | head -20 || echo "Нет доступа к iptables"
echo ""

# Процессы
echo "=== АКТИВНЫЕ ПРОЦЕССЫ ==="
ps aux | grep -E "nginx|apache|php|node|python|mysql|postgres" | grep -v grep
echo ""

echo "=================================="
echo "ДИАГНОСТИКА ЗАВЕРШЕНА"
echo "=================================="