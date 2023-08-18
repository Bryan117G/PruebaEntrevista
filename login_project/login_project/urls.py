from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', include('login_app.urls')),  # Incluye las rutas de la aplicación login_app
]
