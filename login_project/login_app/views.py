from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import login
from random import sample
import random
from django.shortcuts import render
from .models import Empresa 
from django.db.models import Count
from django.http import JsonResponse
from django.http import HttpResponse
from django.template.loader import render_to_string


def bienvenido(request):
    # Generar datos aleatorios para 5 empresas
    empresas_aleatorias = []
    for _ in range(5):
        nombre = f"Empresa {random.randint(1, 100)}"
        tipo_sector = random.choice(['Tecnología', 'Finanzas', 'Salud', 'Energía', 'Manufactura'])
        calificador_riesgos = random.choice(['Alto', 'Medio', 'Bajo'])
        tipo_riesgos = ', '.join(random.sample(['Operativos', 'Crediticios', 'Legales', 'Técnicos'], random.randint(1, 4)))
        ponderacion_calificacion = random.randint(1, 100)
        empresa = Empresa(nombre=nombre, tipo_sector=tipo_sector, calificador_riesgos=calificador_riesgos,
                          tipo_riesgos=tipo_riesgos, ponderacion_calificacion=ponderacion_calificacion)
        empresas_aleatorias.append(empresa)

    # Guardar las empresas en la base de datos (esto es opcional, puedes omitirlo si no deseas guardarlas)
    for empresa in empresas_aleatorias:
        empresa.save()

    # Obtener la cantidad de empresas por calificador de riesgos
    calificador_riesgos_counts = Empresa.objects.values('calificador_riesgos').annotate(count=Count('calificador_riesgos'))

    # Crear un diccionario con los datos para el gráfico de pastel
    dashboard_data = {
        'labels': [item['calificador_riesgos'] for item in calificador_riesgos_counts],
        'data': [item['count'] for item in calificador_riesgos_counts],
    }

    return render(request, 'login_app/bienvenido.html', {
        'empresas_aleatorias': empresas_aleatorias,
        'dashboard_data': dashboard_data,
    })

def dashboard_data(request):
    # Obtener la cantidad de empresas por calificador de riesgos
    calificador_riesgos_counts = Empresa.objects.values('calificador_riesgos').annotate(count=Count('calificador_riesgos'))

    # Crear un diccionario con los datos para el gráfico de pastel
    data = {
        'labels': [item['calificador_riesgos'] for item in calificador_riesgos_counts],
        'data': [item['count'] for item in calificador_riesgos_counts],
    }

    return JsonResponse(data)

def inicio_sesion(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return redirect('bienvenido')
    else:
        form = AuthenticationForm(request)
    return render(request, 'login_app/inicio_sesion.html', {'form': form})

def registro(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            # No es necesario iniciar sesión aquí, ya que el usuario se autenticará automáticamente
            return redirect('bienvenido')
    else:
        form = UserCreationForm()
    return render(request, 'login_app/registro.html', {'form': form})

def exportar_informe(request):
    empresas = Empresa.objects.all()  # Asegúrate de importar el modelo correcto
    informe = "Informe de Empresas:\n\n"
    
    for empresa in empresas:
        informe += f"Nombre de Empresa: {empresa.nombre}\n"
        informe += f"Tipo de Sector: {empresa.tipo_sector}\n"
        informe += f"Calificador de Riesgos: {empresa.calificador_riesgos}\n"
        informe += f"Tipo de Riesgos: {empresa.tipo_riesgos}\n"
        informe += f"Ponderación de Calificación: {empresa.ponderacion_calificacion}\n"
        
        # Calcular y agregar la probabilidad (debes implementar tu lógica aquí)
        # probabilidad = calcularProbabilidad(empresa.calificador_riesgos, empresa.ponderacion_calificacion)
        # informe += f"Probabilidad de Riesgo: {probabilidad}\n"
        
        informe += "\n"
    
    response = HttpResponse(informe, content_type='text/plain')
    response['Content-Disposition'] = 'attachment; filename="informe_empresas.txt"'
    return response