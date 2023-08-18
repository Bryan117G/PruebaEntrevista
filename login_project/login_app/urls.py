from django.urls import path
from . import views

urlpatterns = [
    path('', views.bienvenido, name='bienvenido'),
    path('inicio-sesion/', views.inicio_sesion, name='inicio_sesion'),
    path('registro/', views.registro, name='registro'),
    path('dashboard-data/', views.dashboard_data, name='dashboard_data'),
    path('exportar-informe/', views.exportar_informe, name='exportar_informe'),
]

