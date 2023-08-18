# login_app/models.py
from django.db import models

class Usuario(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username

class Empresa(models.Model):
    nombre = models.CharField(max_length=100)
    tipo_sector = models.CharField(max_length=100)
    calificador_riesgos = models.CharField(max_length=100)
    tipo_riesgos = models.CharField(max_length=100)
    ponderacion_calificacion = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.nombre
