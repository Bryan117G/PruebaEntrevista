import os

# Obtén la ruta base del proyecto
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Clave secreta para la seguridad del proyecto
SECRET_KEY = 'your_secret_key_here'

# Modo de depuración (activo para desarrollo, desactiva en producción)
DEBUG = True

# Lista de hosts permitidos (vacío para permitir todos en desarrollo)
ALLOWED_HOSTS = []

# Aplicaciones instaladas en el proyecto
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'login_app',  # Agrega aquí el nombre de tu aplicación
]

# Middlewares utilizados por el proyecto
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Configuración de las rutas de URL del proyecto
ROOT_URLCONF = 'login_project.urls'

# Configuración de las plantillas
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Configuración de la aplicación ASGI para el servidor web
ASGI_APPLICATION = 'login_project.asgi.application'

# Configuración de la base de datos (utilizando SQLite en este ejemplo)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

CSRF_COOKIE_SECURE = False
# Configuración para archivos estáticos (CSS, JS, imágenes, etc.)
STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]



