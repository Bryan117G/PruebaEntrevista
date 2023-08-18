var registerContainer = document.getElementById("register-container");
var loginContainer = document.getElementById("login-container");
var dashboardContainer = document.getElementById("dashboard-container");
var loginLink = document.getElementById("login-link");
var registerLink = document.getElementById("register-link");
var loginForm = document.getElementById("login-form");
var registerForm = document.getElementById("register-form");
var loginMessage = document.getElementById("login-message");
var dashboardTable = document.getElementById("dashboard-table");
var riesgosasList = document.getElementById("riesgosas-list");
var probabilidadLink = document.getElementById("probabilidad-link");
var dashboardLink = document.getElementById("dashboard-link");
var chartCanvas = document.getElementById("barChart");

var users = [];

var empresas = [
  { nombre: "Empresa A", sector: "Sector 1", calificador: "Alto", riesgo: "Riesgo Financiero", ponderacion: "0.85" },
  { nombre: "Empresa B", sector: "Sector 2", calificador: "Medio", riesgo: "Riesgo Operacional", ponderacion: "0.65" },
  { nombre: "Empresa C", sector: "Sector 1", calificador: "Bajo", riesgo: "Riesgo Estratégico", ponderacion: "0.40" },
  { nombre: "Empresa D", sector: "Sector 3", calificador: "Alto", riesgo: "Riesgo Financiero", ponderacion: "0.78" },
  { nombre: "Empresa E", sector: "Sector 2", calificador: "Medio", riesgo: "Riesgo Operacional", ponderacion: "0.62" }
];

registerContainer.style.display = "block";
loginContainer.style.display = "none";
dashboardContainer.style.display = "none";

loginLink.addEventListener("click", function(event) {
  event.preventDefault();
  registerContainer.style.display = "none";
  loginContainer.style.display = "block";
  dashboardContainer.style.display = "none";
});

registerLink.addEventListener("click", function(event) {
  event.preventDefault();
  loginContainer.style.display = "none";
  registerContainer.style.display = "block";
  dashboardContainer.style.display = "none";
});

registerForm.addEventListener("submit", function(event) {
  event.preventDefault();
  var newUsername = document.getElementById("new-username").value;
  var newPassword = document.getElementById("new-password").value;
  users.push({ username: newUsername, password: newPassword });
  alert("Usuario registrado:\nUsuario: " + newUsername + "\nContraseña: " + newPassword);
  registerForm.reset();
});

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var user = users.find(function(user) {
    return user.username === username && user.password === password;
  });
  
  if (user) {
    loginMessage.textContent = "Inicio de sesión exitoso";
    loginMessage.style.color = "green";
    loginForm.reset();
    showDashboard();
  } else {
    loginMessage.textContent = "Usuario o contraseña incorrectos";
    loginMessage.style.color = "red";
  }
});

function showDashboard() {
  registerContainer.style.display = "none";
  loginContainer.style.display = "none";
  dashboardContainer.style.display = "block";
  generateDashboardTableContent();
  generateBarChart();
}

function calcularProbabilidad(ponderacion) {
  if (ponderacion >= 0.7) {
    return "Alta";
  } else if (ponderacion >= 0.5) {
    return "Moderada";
  } else {
    return "Baja";
  }
}

function generateDashboardTableContent() {
  var tableContent = "";
  var riesgosasListContent = "";

  for (var i = 0; i < empresas.length; i++) {
    var probabilidad = calcularProbabilidad(parseFloat(empresas[i].ponderacion));

    tableContent += `
      <tr>
        <td>${empresas[i].nombre}</td>
        <td>${empresas[i].sector}</td>
        <td>${empresas[i].calificador}</td>
        <td>${empresas[i].riesgo}</td>
        <td>${empresas[i].ponderacion}</td>
        <td>${probabilidad}</td>
      </tr>
    `;

    if (empresas[i].calificador === "Alto") {
      var color = getColorForCalificador(empresas[i].calificador);
      riesgosasListContent += `
        <li style="color: ${color}">${empresas[i].nombre} - ${empresas[i].calificador}</li>
      `;
    }
  }

  dashboardTable.innerHTML = tableContent;
  riesgosasList.innerHTML = riesgosasListContent;
}

function getColorForCalificador(calificador) {
  switch (calificador) {
    case "Alto":
      return 'rgba(255, 0, 0, 0.7)'; // Rojo
    case "Medio":
      return 'rgba(255, 165, 0, 0.7)'; // Naranja
    case "Bajo":
      return 'rgba(0, 128, 0, 0.7)'; // Verde
    default:
      return 'rgba(0, 0, 0, 0.7)';
  }
}

function generateBarChart() {
  var ctx = chartCanvas.getContext('2d');

  var labels = empresas.map(function(empresa) {
    return empresa.nombre;
  });

  var data = empresas.map(function(empresa) {
    return parseFloat(empresa.ponderacion);
  });

  var backgroundColors = empresas.map(function(empresa) {
    return getColorForCalificador(empresa.calificador);
  });

  var barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Ponderación de Calificación',
        data: data,
        backgroundColor: backgroundColors,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true, // Asegurar que el eje Y comience en cero
          ticks: {
            stepSize: 0.1 // Ajustar el tamaño del paso de las etiquetas
          }
        }
      }
    }
  });
}

// Evento para abrir el modelo de probabilidad en una nueva pestaña dentro del dashboard
probabilidadLink.addEventListener("click", function(event) {
  event.preventDefault();
  openContentInDashboard("Modelo de Probabilidad", generateProbabilidadContent);
});

function openContentInDashboard(title, contentGenerator) {
  var dashboardWindow = window.open("", "Dashboard");
  var dashboardDocument = dashboardWindow.document;
  dashboardDocument.write("<html><head><title>" + title + "</title></head><body>");
  contentGenerator(dashboardDocument);
  dashboardDocument.write("</body></html>");
  dashboardDocument.close();
}
 
function generateProbabilidadContent(doc) {
  doc.write("<h1>Modelo de Probabilidad</h1>");
  doc.write('<div style="margin-top: 20px;">');
  doc.write('<table style="width: 100%; text-align: center; border-collapse: collapse; border: 1px solid #ddd;">');
  doc.write('<tr style="background-color: #f2f2f2; font-weight: bold;"><th>Nombre de Empresa</th><th>Ponderación</th><th>Probabilidad</th></tr>');
  for (var i = 0; i < empresas.length; i++) {
    var ponderacion = parseFloat(empresas[i].ponderacion);
    var probabilidad = calcularProbabilidad(ponderacion);
    
    doc.write('<tr>');
    doc.write(`<td style="padding: 8px; border-bottom: 1px solid #ddd;">${empresas[i].nombre}</td>`);
    doc.write(`<td style="padding: 8px; border-bottom: 1px solid #ddd;">${ponderacion.toFixed(2)}</td>`);
    doc.write(`<td style="padding: 8px; border-bottom: 1px solid #ddd; color: ${getColorForProbabilidad(probabilidad)};">${probabilidad}</td>`);
    doc.write('</tr>');
  }
  doc.write("</table>");
  doc.write('</div>');
}

function getColorForProbabilidad(probabilidad) {
  switch (probabilidad) {
    case "Alta":
      return 'red';
    case "Moderada":
      return 'orange';
    case "Baja":
      return 'green';
    default:
      return 'black';
  }
}

document.getElementById("modelo-probabilidad-link").addEventListener("click", function() {
  generateAndDownloadTextFile(empresas);
});

function generateAndDownloadTextFile(empresas) {
  var content = "Informe de Empresas\n\n";
  for (var i = 0; i < empresas.length; i++) {
    content += "Nombre: " + empresas[i].nombre + "\n";
    content += "Ponderación: " + empresas[i].ponderacion + "\n\n";
  }

  var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  var url = URL.createObjectURL(blob);

  var link = document.createElement("a");
  link.href = url;
  link.download = "InformeEmpresas.txt";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
