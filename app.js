// --- CONFIGURACIÓN E INICIALIZACIÓN DE DATOS ---

// Estructura de Datos Iniciales (Demo)
const DEFAULT_STUDENTS = [
    {
        id: 'student-diego',
        name: 'Diego Hernández',
        parent: 'Sra. Karla',
        phone: '+51999888777',
        subject: 'Monografía - Física',
        rate: 83.3333 // S/. 500 por paquete de 6 horas (360 min)
    }
];

const DEFAULT_SESSIONS = [
    // Paquete 1: Monografía - Física
    { id: 's1', studentId: 'student-diego', date: '2026-05-30', startTime: '18:00', endTime: '20:00', duration: 120, topic: 'Monografía - Física' },
    { id: 's2', studentId: 'student-diego', date: '2026-05-31', startTime: '08:00', endTime: '12:00', duration: 240, topic: 'Monografía - Física' },
    
    // Paquete 2: Monografía - Física
    { id: 's3', studentId: 'student-diego', date: '2026-05-31', startTime: '15:00', endTime: '18:00', duration: 180, topic: 'Monografía - Física' },
    { id: 's4', studentId: 'student-diego', date: '2026-06-01', startTime: '16:00', endTime: '19:00', duration: 180, topic: 'Monografía - Física' },
    
    // Paquete 3: Monografía - Física
    { id: 's5', studentId: 'student-diego', date: '2026-06-01', startTime: '19:00', endTime: '21:00', duration: 120, topic: 'Monografía - Física' },
    { id: 's6', studentId: 'student-diego', date: '2026-06-03', startTime: '16:00', endTime: '20:00', duration: 240, topic: 'Monografía - Física' },
    
    // Paquete 4: Monografía - Física
    { id: 's7', studentId: 'student-diego', date: '2026-06-04', startTime: '21:00', endTime: '22:10', duration: 70, topic: 'Monografía - Física' },
    { id: 's8', studentId: 'student-diego', date: '2026-06-06', startTime: '10:50', endTime: '13:00', duration: 130, topic: 'Monografía - Física' },
    { id: 's9', studentId: 'student-diego', date: '2026-06-06', startTime: '15:00', endTime: '17:40', duration: 160, topic: 'Monografía - Física' },
    
    // Paquete 5: Interno - Historia
    { id: 's10', studentId: 'student-diego', date: '2026-06-06', startTime: '17:40', endTime: '18:40', duration: 60, topic: 'Interno - Historia' },
    { id: 's11', studentId: 'student-diego', date: '2026-06-07', startTime: '09:30', endTime: '13:30', duration: 240, topic: 'Interno - Historia' },
    { id: 's12', studentId: 'student-diego', date: '2026-06-07', startTime: '19:30', endTime: '20:30', duration: 60, topic: 'Interno - Historia' },
    
    // Paquete 6: Ensayo - TdC
    { id: 's13', studentId: 'student-diego', date: '2026-06-07', startTime: '20:30', endTime: '22:00', duration: 90, topic: 'Ensayo - TdC' },
    { id: 's14', studentId: 'student-diego', date: '2026-06-08', startTime: '17:30', endTime: '20:10', duration: 160, topic: 'Ensayo - TdC' },
    { id: 's15', studentId: 'student-diego', date: '2026-06-08', startTime: '21:20', endTime: '22:10', duration: 50, topic: 'Ensayo - TdC' }
];

// Mapeo inicial de paquetes pagados (0-indexed: Paquetes del #1 al #5 pagados)
const DEFAULT_PAID_PACKAGES = {
    'student-diego': [0, 1, 2, 3, 4]
};

// Variables de Estado en memoria
let students = [];
let sessions = [];
let paidPackages = {}; // Formato: { "studentId": [indices_de_paquetes_pagados] }
let currentSelectedSessionForIa = null;
let hoursChartInstance = null;

// Cargar datos desde localStorage o usar defaults
function initData() {
    if (localStorage.getItem('student_dashboard_initialized')) {
        students = JSON.parse(localStorage.getItem('students')) || [];
        sessions = JSON.parse(localStorage.getItem('sessions')) || [];
        paidPackages = JSON.parse(localStorage.getItem('paidPackages')) || {};
        
        // CORRECCIÓN AUTOMÁTICA DE LA FECHA DE LA DEMO (si existe el typo de mayo en lugar de junio)
        let modified = false;
        sessions.forEach(s => {
            if (s.id === 's6' && s.date === '2026-05-03') {
                s.date = '2026-06-03';
                modified = true;
            }
        });
        if (modified) {
            saveData();
        }
    } else {
        resetToDemoData();
    }
}

// Guardar datos en localStorage
function saveData() {
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('sessions', JSON.stringify(sessions));
    localStorage.setItem('paidPackages', JSON.stringify(paidPackages));
    localStorage.setItem('student_dashboard_initialized', 'true');
}

// Cargar datos de demostración
function resetToDemoData() {
    students = [...DEFAULT_STUDENTS];
    sessions = [...DEFAULT_SESSIONS];
    paidPackages = { ...DEFAULT_PAID_PACKAGES };
    saveData();
    if (window.location.reload) {
        renderAll();
    }
}

// Borrar todo
function clearAllData() {
    if (confirm('¿Estás seguro de que deseas borrar TODOS los datos del sistema? Esta acción no se puede deshacer.')) {
        localStorage.clear();
        students = [];
        sessions = [];
        paidPackages = {};
        saveData();
        renderAll();
    }
}

// --- NAVEGACIÓN Y TABS ---
document.addEventListener('DOMContentLoaded', () => {
    initData();
    setupNavigation();
    renderAll();
    
    // Configurar API Key de la UI
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
        document.getElementById('gemini-key').value = savedKey;
    }
});

function setupNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = item.getAttribute('data-tab');
            
            // Cambiar clase activa en menú
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Cambiar clase activa en secciones
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Renderizar la pestaña específica al entrar
            if (tabId === 'dashboard') {
                renderDashboardTab();
            } else if (tabId === 'students') {
                renderStudentsTab();
            } else if (tabId === 'sessions') {
                renderSessionsTab();
            }
        });
    });
}

// --- LÓGICA DE NEGOCIO: PAQUETES ---

// Agrupar sesiones de un estudiante en paquetes de 360 minutos (6 horas)
function groupSessionsIntoPackages(studentId) {
    const studentSessions = sessions
        .filter(s => s.studentId === studentId)
        // Ordenar cronológicamente ascendente (antiguo a reciente) para armar paquetes secuenciales
        .sort((a, b) => new Date(`${a.date}T${a.startTime}`) - new Date(`${b.date}T${b.startTime}`));
    
    const packages = [];
    let currentPkg = { min: 0, sessions: [], completed: false };
    
    studentSessions.forEach(session => {
        // Si al añadir esta sesión superamos los 360 min, cerramos el paquete actual e iniciamos otro
        if (currentPkg.min + session.duration > 360) {
            currentPkg.completed = true;
            packages.push(currentPkg);
            currentPkg = { min: 0, sessions: [], completed: false };
        }
        currentPkg.sessions.push(session);
        currentPkg.min += session.duration;
    });
    
    // Agregar el último paquete incompleto si tiene sesiones
    if (currentPkg.sessions.length > 0) {
        currentPkg.completed = currentPkg.min >= 360;
        packages.push(currentPkg);
    }
    
    return packages;
}

// Calcular tarifas e ingresos
function getStudentFinancialStats(studentId, rate) {
    const pkgs = groupSessionsIntoPackages(studentId);
    let totalEarned = 0;
    let pendingEarned = 0;
    let totalMinutes = 0;
    
    const paidIndexes = paidPackages[studentId] || [];
    
    pkgs.forEach((pkg, index) => {
        totalMinutes += pkg.min;
        const pkgCost = (pkg.min / 60) * rate;
        
        if (paidIndexes.includes(index)) {
            totalEarned += pkgCost;
        } else {
            pendingEarned += pkgCost;
        }
    });
    
    return {
        totalEarned,
        pendingEarned,
        totalMinutes
    };
}

// --- RENDERIZADO DE VISTAS ---

function renderAll() {
    lucide.createIcons();
    renderDashboardTab();
    renderStudentsTab();
    renderSessionsTab();
    populateStudentDropdowns();
}

// 1. Renderizar Panel General (Dashboard)
function renderDashboardTab() {
    let totalEarnings = 0;
    let totalPending = 0;
    let totalMinutesAll = 0;
    
    students.forEach(st => {
        const stats = getStudentFinancialStats(st.id, st.rate);
        totalEarnings += stats.totalEarned;
        totalPending += stats.pendingEarned;
        totalMinutesAll += stats.totalMinutes;
    });
    
    // Set KPIs
    document.getElementById('kpi-earnings').innerText = `S/. ${totalEarnings.toFixed(2)}`;
    document.getElementById('kpi-pending').innerText = `S/. ${totalPending.toFixed(2)}`;
    document.getElementById('kpi-students').innerText = students.filter(s => s.rate > 0).length;
    
    const hrs = Math.floor(totalMinutesAll / 60);
    const mins = totalMinutesAll % 60;
    document.getElementById('kpi-hours').innerText = `${hrs}h ${mins}m`;
    
    // Lista de últimas sesiones (global)
    const recentList = document.getElementById('recent-sessions-list');
    recentList.innerHTML = '';
    
    const sortedAllSessions = [...sessions]
        .sort((a, b) => new Date(`${b.date}T${b.startTime}`) - new Date(`${a.date}T${a.startTime}`))
        .slice(0, 5); // top 5
        
    if (sortedAllSessions.length === 0) {
        recentList.innerHTML = '<p class="text-sm text-muted py-4 text-center">No hay sesiones registradas.</p>';
    } else {
        sortedAllSessions.forEach(s => {
            const student = students.find(st => st.id === s.studentId);
            const studentName = student ? student.name : 'Estudiante';
            const item = document.createElement('div');
            item.className = 'activity-item';
            
            // Formatear fecha para mostrar
            const dateParts = s.date.split('-');
            const displayDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            
            item.innerHTML = `
                <div class="activity-info">
                    <h4>${s.topic}</h4>
                    <p>${studentName} — ${displayDate}</p>
                </div>
                <div class="activity-meta">
                    <span class="activity-duration">${Math.floor(s.duration / 60)}h ${s.duration % 60}m</span>
                    <span class="activity-time">${s.startTime} - ${s.endTime}</span>
                </div>
            `;
            recentList.appendChild(item);
        });
    }
    
    // Dibujar Gráfico
    renderChart();
    lucide.createIcons();
}

// Renderizar Gráfico de Horas
function renderChart() {
    const ctx = document.getElementById('hoursChart').getContext('2d');
    
    if (hoursChartInstance) {
        hoursChartInstance.destroy();
    }
    
    const labels = students.map(s => s.name);
    const data = students.map(s => {
        const stats = getStudentFinancialStats(s.id, s.rate);
        return parseFloat((stats.totalMinutes / 60).toFixed(1));
    });
    
    // Evitar que falle si no hay datos
    if (labels.length === 0) {
        labels.push('Sin Estudiantes');
        data.push(0);
    }
    
    hoursChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Horas Totales Impartidas',
                data: data,
                backgroundColor: [
                    'rgba(99, 102, 241, 0.65)', // Indigo
                    'rgba(13, 148, 136, 0.65)', // Teal
                    'rgba(124, 58, 237, 0.65)', // Violet
                    'rgba(217, 119, 6, 0.65)'   // Amber
                ],
                borderColor: [
                    '#4f46e5',
                    '#0d9488',
                    '#7c3aed',
                    '#d97706'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Horas (h)', font: { weight: 'bold' } },
                    grid: { color: '#f1f5f9' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

// 2. Renderizar Pestaña de Estudiantes
function renderStudentsTab() {
    const list = document.getElementById('students-list');
    list.innerHTML = '';
    
    if (students.length === 0) {
        list.innerHTML = '<div class="card col-span-all text-center py-8"><p class="text-muted">No hay estudiantes registrados. Agrega uno arriba.</p></div>';
        return;
    }
    
    students.forEach(st => {
        const stats = getStudentFinancialStats(st.id, st.rate);
        const hrs = Math.floor(stats.totalMinutes / 60);
        const mins = stats.totalMinutes % 60;
        
        // Obtener iniciales
        const initials = st.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        
        const card = document.createElement('div');
        card.className = 'student-card';
        card.innerHTML = `
            <div class="student-card-decor"></div>
            <div class="student-card-header">
                <div class="student-card-avatar">${initials}</div>
                <div class="student-card-actions">
                    <button class="btn-icon-sm" onclick="editStudent('${st.id}')" title="Editar"><i data-lucide="edit-3"></i></button>
                    <button class="btn-icon-sm" onclick="deleteStudent('${st.id}')" title="Eliminar"><i data-lucide="trash-2"></i></button>
                </div>
            </div>
            <div class="student-card-body">
                <h3>${st.name}</h3>
                <span class="student-card-subject">${st.subject}</span>
                <p class="text-xs text-muted mt-2">Apoderado: <b>${st.parent || 'No asignado'}</b></p>
                <p class="text-xs text-muted">Teléfono: <b>${st.phone || 'No asignado'}</b></p>
            </div>
            
            <div class="student-card-details">
                <div class="student-detail-item">
                    <span class="student-detail-label">Horas Clases</span>
                    <span class="student-detail-value">${hrs}h ${mins}m</span>
                </div>
                <div class="student-detail-item">
                    <span class="student-detail-label">Tarifa / Hora</span>
                    <span class="student-detail-value">S/. ${st.rate.toFixed(1)}</span>
                </div>
                <div class="student-detail-item">
                    <span class="student-detail-label">Cobrado</span>
                    <span class="student-detail-value text-emerald">S/. ${stats.totalEarned.toFixed(1)}</span>
                </div>
                <div class="student-detail-item">
                    <span class="student-detail-label">Por Cobrar</span>
                    <span class="student-detail-value text-amber">S/. ${stats.pendingEarned.toFixed(1)}</span>
                </div>
            </div>
            
            <div class="student-card-footer">
                <button class="btn btn-secondary w-full" onclick="showStudentPackages('${st.id}')">
                    <i data-lucide="book-open"></i> Ver Paquetes
                </button>
            </div>
        `;
        list.appendChild(card);
    });
    
    lucide.createIcons();
}

// Ir a paquetes de estudiante específico
function showStudentPackages(studentId) {
    document.getElementById('filter-student-select').value = studentId;
    
    // Simular click en la pestaña de Sesiones
    const menuItems = document.querySelectorAll('.menu-item');
    const targetItem = Array.from(menuItems).find(i => i.getAttribute('data-tab') === 'sessions');
    if (targetItem) {
        targetItem.click();
    }
}

// 3. Renderizar Pestaña de Sesiones y Paquetes
function renderSessionsTab() {
    const filterVal = document.getElementById('filter-student-select').value;
    const container = document.getElementById('packages-container');
    container.innerHTML = '';
    
    let targetStudents = [];
    if (filterVal === 'all') {
        targetStudents = [...students];
    } else {
        const match = students.find(s => s.id === filterVal);
        if (match) targetStudents.push(match);
    }
    
    if (targetStudents.length === 0) {
        container.innerHTML = '<div class="card text-center py-8"><p class="text-muted">Selecciona o registra un estudiante para ver sus paquetes de horas.</p></div>';
        return;
    }
    
    // Por cada estudiante renderizar sus paquetes (en orden cronológico descendente de paquetes)
    targetStudents.forEach(st => {
        const studentPackages = groupSessionsIntoPackages(st.id);
        const paidIndexes = paidPackages[st.id] || [];
        
        if (studentPackages.length === 0) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'card mb-4';
            emptyDiv.innerHTML = `<p class="text-sm text-muted text-center py-4">No hay sesiones registradas para <b>${st.name}</b>.</p>`;
            container.appendChild(emptyDiv);
            return;
        }
        
        // Renderizar paquetes invertidos (los más nuevos primero)
        studentPackages.slice().reverse().forEach((pkg, indexInverted) => {
            // El índice original en el array (de más viejo a más nuevo)
            const originalIndex = studentPackages.length - 1 - indexInverted;
            const packageNumber = originalIndex + 1;
            const cost = (pkg.min / 60) * st.rate;
            const isPaid = paidIndexes.includes(originalIndex);
            
            const card = document.createElement('div');
            card.className = 'package-card mb-6';
            card.style.borderLeftColor = isPaid ? 'var(--emerald)' : 'var(--amber)';
            
            // Ordenar las sesiones del paquete para mostrarlas de más nuevas a más viejas
            const sortedSessions = [...pkg.sessions].sort((a, b) => new Date(`${b.date}T${b.startTime}`) - new Date(`${a.date}T${a.startTime}`));
            
            card.innerHTML = `
                <div class="package-header">
                    <div class="package-title">
                        <h2>Paquete #${packageNumber}</h2>
                        <span class="package-student-name">(${st.name})</span>
                        <span class="package-cost">S/. ${cost.toFixed(1)}</span>
                    </div>
                    <div class="package-meta">
                        <div class="package-indicators">
                            <span class="badge ${isPaid ? 'badge-emerald' : 'badge-amber'} flex items-center gap-1">
                                <input type="checkbox" ${isPaid ? 'checked' : ''} onchange="togglePackagePayment('${st.id}', ${originalIndex}, this.checked)" style="margin-right: 4px; cursor: pointer;">
                                ${isPaid ? 'Pagado' : 'Pendiente'}
                            </span>
                            <span class="badge ${pkg.completed ? 'badge-violet' : 'badge-rose'}">
                                ${pkg.completed ? '🟣 Completo (6h)' : '⚪ Incompleto'}
                            </span>
                            <span class="package-badge-hours">${Math.floor(pkg.min / 60)}h ${pkg.min % 60}m</span>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="session-table">
                        <thead>
                            <tr>
                                <th style="width: 40%;">Actividad / Tema</th>
                                <th style="text-align: center; width: 10%;">Reporte IA</th>
                                <th style="width: 15%;">Fecha</th>
                                <th style="width: 20%;">Horario</th>
                                <th style="text-align: right; width: 15%;">Duración</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sortedSessions.map(s => {
                                const dateParts = s.date.split('-');
                                const displayDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
                                
                                return `
                                    <tr>
                                        <td>
                                            <span class="session-topic">${s.topic}</span>
                                        </td>
                                        <td style="text-align: center;">
                                            <button class="btn-ia-report" onclick="openIaReportModal('${s.id}')" title="Generar reporte WhatsApp para esta sesión">
                                                🤖
                                            </button>
                                        </td>
                                        <td><span class="session-date">${displayDate}</span></td>
                                        <td><span class="session-time">${s.startTime} - ${s.endTime}</span></td>
                                        <td style="text-align: right;"><span class="session-duration">${Math.floor(s.duration / 60)}h ${s.duration % 60}m</span></td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            container.appendChild(card);
        });
    });
    
    lucide.createIcons();
}

// Cambiar estado de pago de un paquete
function togglePackagePayment(studentId, packageIndex, isChecked) {
    if (!paidPackages[studentId]) {
        paidPackages[studentId] = [];
    }
    
    if (isChecked) {
        if (!paidPackages[studentId].includes(packageIndex)) {
            paidPackages[studentId].push(packageIndex);
        }
    } else {
        paidPackages[studentId] = paidPackages[studentId].filter(idx => idx !== packageIndex);
    }
    
    saveData();
    renderDashboardTab();
    renderStudentsTab();
}

// Alimentar selectores dinámicos de estudiantes
function populateStudentDropdowns() {
    const filterSelect = document.getElementById('filter-student-select');
    const sessionStudentSelect = document.getElementById('session-student-id');
    
    // Conservar valor seleccionado si existe
    const filterVal = filterSelect.value;
    
    // Resetear
    filterSelect.innerHTML = '<option value="all">Todos los Estudiantes</option>';
    sessionStudentSelect.innerHTML = '<option value="" disabled selected>Selecciona un estudiante</option>';
    
    students.forEach(st => {
        filterSelect.innerHTML += `<option value="${st.id}">${st.name}</option>`;
        sessionStudentSelect.innerHTML += `<option value="${st.id}">${st.name}</option>`;
    });
    
    // Restaurar valor
    filterSelect.value = filterVal;
}

// --- FORMULARIOS Y MODALES ---

// 1. Modales de Estudiantes
function openStudentModal() {
    document.getElementById('student-modal-title').innerText = 'Agregar Estudiante';
    document.getElementById('student-id').value = '';
    document.getElementById('student-form').reset();
    document.getElementById('student-modal').classList.remove('hidden');
}

function closeStudentModal() {
    document.getElementById('student-modal').classList.add('hidden');
}

function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;
    
    document.getElementById('student-modal-title').innerText = 'Editar Estudiante';
    document.getElementById('student-id').value = student.id;
    document.getElementById('student-name').value = student.name;
    document.getElementById('student-parent').value = student.parent || '';
    document.getElementById('student-phone').value = student.phone || '';
    document.getElementById('student-subject').value = student.subject || '';
    document.getElementById('student-rate').value = student.rate || 83.3;
    
    document.getElementById('student-modal').classList.remove('hidden');
}

function deleteStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;
    
    if (confirm(`¿Estás seguro de que deseas eliminar a ${student.name}? Esto también borrará todas sus sesiones registradas.`)) {
        students = students.filter(s => s.id !== id);
        sessions = sessions.filter(s => s.studentId !== id);
        delete paidPackages[id];
        
        saveData();
        renderAll();
    }
}

function saveStudentForm(event) {
    event.preventDefault();
    const id = document.getElementById('student-id').value;
    const name = document.getElementById('student-name').value.trim();
    const parent = document.getElementById('student-parent').value.trim();
    const phone = document.getElementById('student-phone').value.trim();
    const subject = document.getElementById('student-subject').value.trim();
    const rate = parseFloat(document.getElementById('student-rate').value);
    
    if (id) {
        // Editar
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
            students[index] = { id, name, parent, phone, subject, rate };
        }
    } else {
        // Crear nuevo
        const newId = 'student-' + Date.now();
        students.push({ id: newId, name, parent, phone, subject, rate });
    }
    
    saveData();
    closeStudentModal();
    renderAll();
}

// 2. Modales de Sesiones
function openNewSessionModal() {
    document.getElementById('session-form').reset();
    document.getElementById('session-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('session-duration').value = '';
    document.getElementById('session-minutes').value = '0';
    document.getElementById('session-modal').classList.remove('hidden');
}

function closeNewSessionModal() {
    document.getElementById('session-modal').classList.add('hidden');
}

function calculateSessionMinutes() {
    const start = document.getElementById('session-start-time').value;
    const end = document.getElementById('session-end-time').value;
    
    if (!start || !end) return;
    
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    
    let diffMins = (endH * 60 + endM) - (startH * 60 + startM);
    
    if (diffMins < 0) {
        diffMins += 24 * 60; // cruce de medianoche
    }
    
    document.getElementById('session-minutes').value = diffMins;
    
    const hrs = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    document.getElementById('session-duration').value = `${hrs} horas y ${mins} minutos`;
}

function saveSessionForm(event) {
    event.preventDefault();
    const studentId = document.getElementById('session-student-id').value;
    const date = document.getElementById('session-date').value;
    const startTime = document.getElementById('session-start-time').value;
    const endTime = document.getElementById('session-end-time').value;
    const duration = parseInt(document.getElementById('session-minutes').value);
    const topic = document.getElementById('session-topic').value.trim();
    
    if (!studentId || !date || !startTime || !endTime || duration <= 0 || !topic) {
        alert('Por favor, ingresa todos los campos obligatorios correctamente.');
        return;
    }
    
    const newSession = {
        id: 'session-' + Date.now(),
        studentId,
        date,
        startTime,
        endTime,
        duration,
        topic
    };
    
    sessions.push(newSession);
    saveData();
    closeNewSessionModal();
    renderAll();
}

// 3. Modal de Reporte IA (WhatsApp)
function openIaReportModal(sessionId) {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;
    
    const student = students.find(s => s.id === session.studentId);
    if (!student) return;
    
    currentSelectedSessionForIa = { session, student };
    
    // Formatear Fecha
    const dateParts = session.date.split('-');
    const displayDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    
    document.getElementById('ia-modal-subtitle').innerText = `${student.subject} — ${displayDate} (${session.startTime} - ${session.endTime})`;
    document.getElementById('ia-input-progress').value = '';
    document.getElementById('ia-input-agreements').value = '';
    document.getElementById('ia-modal-alert').classList.add('hidden');
    document.getElementById('ia-result-section').classList.add('hidden');
    
    document.getElementById('ia-report-modal').classList.remove('hidden');
    lucide.createIcons();
}

function closeIaReportModal() {
    document.getElementById('ia-report-modal').classList.add('hidden');
    currentSelectedSessionForIa = null;
}

// --- CONECTIVIDAD CON GEMINI API Y REPORTES ---

// Exponencial backoff para llamar a Gemini
async function fetchGeminiWithBackoff(prompt, apiKey, retries = 3, delay = 1000) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: {
            parts: [{ text: "Eres un tutor académico de bachillerato internacional altamente profesional, cordial, transparente y organizado. Escribes reportes de progreso muy pulidos, formales e informativos para los padres." }]
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`Gemini API Error (status: ${response.status})`);
        }
        
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (error) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchGeminiWithBackoff(prompt, apiKey, retries - 1, delay * 2);
        } else {
            throw error;
        }
    }
}

// Generar Reporte
async function generateIaReport() {
    if (!currentSelectedSessionForIa) return;
    
    const progress = document.getElementById('ia-input-progress').value.trim();
    const agreements = document.getElementById('ia-input-agreements').value.trim();
    const alertBox = document.getElementById('ia-modal-alert');
    
    if (!progress || !agreements) {
        alertBox.innerText = 'Por favor, llena los dos campos de texto para generar el reporte.';
        alertBox.classList.remove('hidden');
        return;
    }
    alertBox.classList.add('hidden');
    
    const resultSection = document.getElementById('ia-result-section');
    const resultText = document.getElementById('ia-result-text');
    const btnGenerate = document.getElementById('ia-btn-generate');
    
    resultSection.classList.remove('hidden');
    resultText.value = 'Redactando el reporte académico perfecto con Inteligencia Artificial... 🤖⏳';
    btnGenerate.disabled = true;
    btnGenerate.innerText = 'Redactando...';
    
    const session = currentSelectedSessionForIa.session;
    const student = currentSelectedSessionForIa.student;
    
    // Formatear Fecha
    const dateParts = session.date.split('-');
    const displayDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    const schedule = `${session.startTime} a ${session.endTime}`;
    const durationText = `${Math.floor(session.duration / 60)}h ${session.duration % 60}m`;
    const parentName = student.parent || 'Karla';
    
    const apiKey = localStorage.getItem('gemini_api_key');
    
    const prompt = `Escribe un mensaje de WhatsApp sumamente formal, profesional, estructurado y alegre dirigido a la Sra. o Sr. ${parentName} (apoderado de ${student.name}).
    Reporta el trabajo realizado en la siguiente sesión académica:
    - Estudiante: ${student.name}
    - Actividad/Tema: ${session.topic}
    - Fecha de la clase: ${displayDate}
    - Horario de la clase: ${schedule}
    - Duración: ${durationText}

    Información provista por el tutor:
    - Avance realizado: "${progress}"
    - Acuerdos establecidos para la siguiente clase: "${agreements}"

    Pautas clave:
    1. Saluda formalmente (ej. "Estimada Sra. ${parentName}, muy buenas tardes...").
    2. Desarrolla el avance con un tono de orgullo académico, motivando y destacando el buen ritmo de trabajo.
    3. Indica de forma ordenada los compromisos y acuerdos para la siguiente sesión.
    4. Asegúrate de mencionar los trabajos y entregas de manera formal.
    5. Añade emojis profesionales (ej. 📚, ✍️, ✅, 📈, 🧠) de forma sutil y pulida.
    6. Finaliza agradeciendo su confianza en tu labor de tutoría.
    7. Devuelve EXCLUSIVAMENTE el mensaje redactado para copiar directamente, sin introducciones tuyas de ningún tipo.`;
    
    const localTemplate = `Estimada Sra. ${parentName}, muy buenas tardes. Espero que se encuentre excelente. 🌟

Le escribo para reportarle de manera formal y detallada el gran progreso de ${student.name} en la sesión de hoy (${displayDate}) de ${session.topic} de ${schedule} (${durationText}):

📚 Avances logrados:
${progress}

📈 Acuerdos y compromisos para la siguiente sesión:
${agreements}

${student.name} continúa mostrando una excelente disposición hacia el trabajo y un ritmo muy constante, lo cual se ve directamente reflejado en la calidad de sus entregas. Seguiremos aprovechando el tiempo de la mejor manera.

Muchas gracias como siempre por su confianza. ¡Que tenga una excelente noche! 🎓✅`;

    if (apiKey) {
        try {
            const result = await fetchGeminiWithBackoff(prompt, apiKey);
            if (result && result.trim()) {
                resultText.value = result.trim();
            } else {
                resultText.value = localTemplate;
            }
        } catch (error) {
            console.error('Gemini error, usando fallback local:', error);
            resultText.value = localTemplate;
        } finally {
            btnGenerate.disabled = false;
            btnGenerate.innerText = 'Volver a Generar';
        }
    } else {
        // Fallback local instantáneo si no hay clave de API guardada
        setTimeout(() => {
            resultText.value = localTemplate;
            btnGenerate.disabled = false;
            btnGenerate.innerText = 'Generar con Gemini';
        }, 800);
    }
}

// Copiar Reporte
function copyIaReport() {
    const text = document.getElementById('ia-result-text');
    text.select();
    document.execCommand('copy');
    
    const btn = document.getElementById('ia-btn-copy');
    btn.innerHTML = '<i data-lucide="check"></i> ¡Copiado con éxito!';
    lucide.createIcons();
    
    setTimeout(() => {
        btn.innerHTML = '<i data-lucide="copy"></i> Copiar Mensaje';
        lucide.createIcons();
    }, 2000);
}

// Enviar a WhatsApp
function sendViaWhatsapp() {
    if (!currentSelectedSessionForIa) return;
    
    const text = document.getElementById('ia-result-text').value;
    const phone = currentSelectedSessionForIa.student.phone || '';
    
    // Limpiar caracteres del número
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    const encodedText = encodeURIComponent(text);
    
    let url = '';
    if (cleanPhone) {
        url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
    } else {
        url = `https://api.whatsapp.com/send?text=${encodedText}`;
    }
    
    window.open(url, '_blank');
}

// --- CONFIGURACIÓN DE API KEY ---

function saveApiKey() {
    const key = document.getElementById('gemini-key').value.trim();
    if (key) {
        localStorage.setItem('gemini_api_key', key);
        alert('API Key de Gemini guardada correctamente localmente.');
    } else {
        alert('Por favor, ingresa una clave de API válida.');
    }
}

function clearApiKey() {
    localStorage.removeItem('gemini_api_key');
    document.getElementById('gemini-key').value = '';
    alert('API Key de Gemini eliminada.');
}
