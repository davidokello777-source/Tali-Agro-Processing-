// Data Storage
let farmData = {
    crops: [],
    livestock: [],
    fields: [],
    expenses: [],
    harvest: [],
    settings: {
        farmName: 'Tali Agro Farm',
        farmLocation: 'Your Location',
        farmArea: 0
    }
};

// Chart instances
let cropChartInstance = null;
let expenseChartInstance = null;
let yieldChartInstance = null;
let profitChartInstance = null;

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    loadDataFromStorage();
    initializeEventListeners();
    updateDashboard();
});

// Initialize Event Listeners
function initializeEventListeners() {
    // Page navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToPage(this.dataset.page);
        });
    });

    // Sidebar toggle
    const toggleBtn = document.getElementById('toggleSidebar');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('active');
        });
    }

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            clearAllData();
            alert('Logged out successfully!');
        }
    });

    // Settings form
    const farmSettingsForm = document.getElementById('farmSettingsForm');
    if (farmSettingsForm) {
        farmSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveFarmSettings();
        });
    }
}

// Navigate to Page
function navigateToPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Remove active class from nav items
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    // Show selected page
    const pageElement = document.getElementById(`${page}-page`);
    if (pageElement) {
        pageElement.classList.add('active');
    }
    
    // Update active nav item
    document.querySelector(`[data-page="${page}"]`).classList.add('active');
    
    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        crops: 'Crop Management',
        livestock: 'Livestock Management',
        fields: 'Field Management',
        expenses: 'Expense Tracking',
        harvest: 'Harvest Records',
        weather: 'Weather & Climate',
        reports: 'Reports & Analytics',
        settings: 'Settings'
    };
    
    document.getElementById('pageTitle').textContent = titles[page];
    
    // Load page-specific data
    if (page === 'dashboard') {
        updateDashboard();
    } else if (page === 'crops') {
        displayCrops();
    } else if (page === 'livestock') {
        displayLivestock();
    } else if (page === 'fields') {
        displayFields();
    } else if (page === 'expenses') {
        displayExpenses();
    } else if (page === 'harvest') {
        displayHarvest();
    } else if (page === 'reports') {
        displayReports();
    } else if (page === 'settings') {
        displaySettings();
    }
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        document.querySelector('.sidebar').classList.remove('active');
    }
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});

// CROP MANAGEMENT
function addCrop(event) {
    event.preventDefault();
    
    const crop = {
        id: Date.now(),
        name: document.getElementById('cropName').value,
        field: document.getElementById('cropField').value,
        variety: document.getElementById('cropVariety').value,
        plantingDate: document.getElementById('plantingDate').value,
        expectedHarvest: document.getElementById('harvestDate').value,
        estimatedYield: document.getElementById('estimatedYield').value,
        status: 'Growing'
    };
    
    farmData.crops.push(crop);
    saveDataToStorage();
    
    document.getElementById('cropForm').reset();
    closeModal('addCropModal');
    displayCrops();
    updateDashboard();
    addActivity(`Added new crop: ${crop.name}`);
}

function displayCrops() {
    const tbody = document.getElementById('cropsTable');
    
    if (farmData.crops.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No crops added yet</td></tr>';
        updateCropSelects();
        return;
    }
    
    tbody.innerHTML = farmData.crops.map(crop => `
        <tr>
            <td><strong>${crop.name}</strong></td>
            <td>${crop.field}</td>
            <td>${crop.plantingDate}</td>
            <td>${crop.expectedHarvest}</td>
            <td><span style="background-color: #d4edda; padding: 4px 8px; border-radius: 4px; color: #155724;">${crop.status}</span></td>
            <td>
                <button class="btn btn-secondary" onclick="editCrop(${crop.id})" style="padding: 5px 10px; font-size: 12px;">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger" onclick="deleteCrop(${crop.id})" style="padding: 5px 10px; font-size: 12px;">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        </tr>
    `).join('');
    
    updateCropSelects();
}

function deleteCrop(id) {
    if (confirm('Are you sure you want to delete this crop?')) {
        farmData.crops = farmData.crops.filter(crop => crop.id !== id);
        saveDataToStorage();
        displayCrops();
        updateDashboard();
        addActivity('Deleted a crop');
    }
}

function updateCropSelects() {
    const select = document.getElementById('harvestCrop');
    if (select) {
        select.innerHTML = '<option value="">Select Crop</option>' + 
            farmData.crops.map(crop => `<option value="${crop.id}">${crop.name}</option>`).join('');
    }
}

// LIVESTOCK MANAGEMENT
function addLivestock(event) {
    event.preventDefault();
    
    const animal = {
        id: Date.now(),
        animalId: document.getElementById('animalId').value,
        type: document.getElementById('animalType').value,
        breed: document.getElementById('breed').value,
        dob: document.getElementById('dob').value,
        healthStatus: document.getElementById('healthStatus').value,
        dateAdded: new Date().toISOString().split('T')[0]
    };
    
    farmData.livestock.push(animal);
    saveDataToStorage();
    
    document.getElementById('livestockForm').reset();
    closeModal('addLivestockModal');
    displayLivestock();
    updateDashboard();
    addActivity(`Added new animal: ${animal.type} - ${animal.animalId}`);
}

function displayLivestock() {
    const tbody = document.getElementById('livestockTable');
    
    if (farmData.livestock.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No animals added yet</td></tr>';
        return;
    }
    
    tbody.innerHTML = farmData.livestock.map(animal => {
        const age = calculateAge(animal.dob);
        return `
            <tr>
                <td><strong>${animal.animalId}</strong></td>
                <td>${animal.type}</td>
                <td>${animal.breed}</td>
                <td>${age} years</td>
                <td><span style="background-color: ${animal.healthStatus === 'Healthy' ? '#d4edda' : '#fff3cd'}; padding: 4px 8px; border-radius: 4px;">${animal.healthStatus}</span></td>
                <td>
                    <button class="btn btn-danger" onclick="deleteLivestock(${animal.id})" style="padding: 5px 10px; font-size: 12px;">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function deleteLivestock(id) {
    if (confirm('Are you sure you want to delete this animal record?')) {
        farmData.livestock = farmData.livestock.filter(animal => animal.id !== id);
        saveDataToStorage();
        displayLivestock();
        updateDashboard();
        addActivity('Deleted an animal record');
    }
}

function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age < 0 ? 0 : age;
}

// FIELD MANAGEMENT
function addField(event) {
    event.preventDefault();
    
    const field = {
        id: Date.now(),
        name: document.getElementById('fieldName').value,
        size: document.getElementById('fieldSize').value,
        soilType: document.getElementById('soilType').value,
        irrigation: document.getElementById('irrigation').value,
        status: 'Available'
    };
    
    farmData.fields.push(field);
    saveDataToStorage();
    
    document.getElementById('fieldForm').reset();
    closeModal('addFieldModal');
    displayFields();
    updateDashboard();
    updateFieldSelects();
    addActivity(`Added new field: ${field.name}`);
}

function displayFields() {
    const tbody = document.getElementById('fieldsTable');
    
    if (farmData.fields.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No fields added yet</td></tr>';
        updateFieldSelects();
        return;
    }
    
    tbody.innerHTML = farmData.fields.map(field => {
        const currentCrop = farmData.crops.filter(crop => crop.field === field.name).map(c => c.name).join(', ') || 'None';
        return `
            <tr>
                <td><strong>${field.name}</strong></td>
                <td>${field.size} acres</td>
                <td>${field.soilType}</td>
                <td>${currentCrop}</td>
                <td><span style="background-color: #d4edda; padding: 4px 8px; border-radius: 4px; color: #155724;">${field.status}</span></td>
                <td>
                    <button class="btn btn-danger" onclick="deleteField(${field.id})" style="padding: 5px 10px; font-size: 12px;">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    
    updateFieldSelects();
}

function deleteField(id) {
    if (confirm('Are you sure you want to delete this field?')) {
        farmData.fields = farmData.fields.filter(field => field.id !== id);
        saveDataToStorage();
        displayFields();
        updateDashboard();
        addActivity('Deleted a field');
    }
}

function updateFieldSelects() {
    const select = document.getElementById('cropField');
    if (select) {
        select.innerHTML = '<option value="">Select Field</option>' + 
            farmData.fields.map(field => `<option value="${field.name}">${field.name}</option>`).join('');
    }
}

// EXPENSE TRACKING
function addExpense(event) {
    event.preventDefault();
    
    const expense = {
        id: Date.now(),
        date: document.getElementById('expenseDate').value,
        category: document.getElementById('expenseCategory').value,
        description: document.getElementById('expenseDescription').value,
        amount: parseFloat(document.getElementById('expenseAmount').value),
        status: 'Recorded'
    };
    
    farmData.expenses.push(expense);
    saveDataToStorage();
    
    document.getElementById('expenseForm').reset();
    closeModal('addExpenseModal');
    displayExpenses();
    updateDashboard();
    addActivity(`Recorded expense: $${expense.amount}`);
}

function displayExpenses() {
    const tbody = document.getElementById('expensesTable');
    
    if (farmData.expenses.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No expenses recorded</td></tr>';
        return;
    }
    
    tbody.innerHTML = farmData.expenses.map(expense => `
        <tr>
            <td>${expense.date}</td>
            <td>${expense.category}</td>
            <td>${expense.description}</td>
            <td><strong>$${expense.amount.toFixed(2)}</strong></td>
            <td><span style="background-color: #d4edda; padding: 4px 8px; border-radius: 4px; color: #155724;">${expense.status}</span></td>
            <td>
                <button class="btn btn-danger" onclick="deleteExpense(${expense.id})" style="padding: 5px 10px; font-size: 12px;">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        </tr>
    `).join('');
}

function deleteExpense(id) {
    if (confirm('Are you sure you want to delete this expense?')) {
        farmData.expenses = farmData.expenses.filter(expense => expense.id !== id);
        saveDataToStorage();
        displayExpenses();
        updateDashboard();
        addActivity('Deleted an expense record');
    }
}

// HARVEST MANAGEMENT
function addHarvest(event) {
    event.preventDefault();
    
    const cropId = document.getElementById('harvestCrop').value;
    const crop = farmData.crops.find(c => c.id == cropId);
    
    const harvest = {
        id: Date.now(),
        cropId: cropId,
        cropName: crop ? crop.name : 'Unknown',
        field: crop ? crop.field : 'Unknown',
        date: document.getElementById('harvestRecordDate').value,
        quantity: parseFloat(document.getElementById('harvestQuantity').value),
        unit: document.getElementById('harvestUnit').value,
        storageLocation: document.getElementById('storageLocation').value
    };
    
    farmData.harvest.push(harvest);
    
    // Update crop status
    if (crop) {
        crop.status = 'Harvested';
    }
    
    saveDataToStorage();
    
    document.getElementById('harvestForm').reset();
    closeModal('addHarvestModal');
    displayHarvest();
    updateDashboard();
    addActivity(`Recorded harvest: ${harvest.quantity} ${harvest.unit} of ${harvest.cropName}`);
}

function displayHarvest() {
    const tbody = document.getElementById('harvestTable');
    
    if (farmData.harvest.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No harvest records</td></tr>';
        return;
    }
    
    tbody.innerHTML = farmData.harvest.map(harvest => `
        <tr>
            <td>${harvest.cropName}</td>
            <td>${harvest.field}</td>
            <td>${harvest.date}</td>
            <td>${harvest.quantity}</td>
            <td>${harvest.unit}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteHarvest(${harvest.id})" style="padding: 5px 10px; font-size: 12px;">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        </tr>
    `).join('');
}

function deleteHarvest(id) {
    if (confirm('Are you sure you want to delete this harvest record?')) {
        farmData.harvest = farmData.harvest.filter(harvest => harvest.id !== id);
        saveDataToStorage();
        displayHarvest();
        updateDashboard();
        addActivity('Deleted a harvest record');
    }
}

// WEATHER
function getWeather() {
    const location = document.getElementById('locationInput').value;
    if (!location) {
        alert('Please enter a location');
        return;
    }
    
    // Using Open-Meteo free weather API (no key required)
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const result = data.results[0];
                const latitude = result.latitude;
                const longitude = result.longitude;
                
                return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
            } else {
                throw new Error('Location not found');
            }
        })
        .then(response => response.json())
        .then(data => {
            displayWeather(data, location);
        })
        .catch(error => {
            alert('Error fetching weather data: ' + error.message);
        });
}

function displayWeather(data, location) {
    const current = data.current;
    const daily = data.daily;
    
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <div style="text-align: center;">
            <h4>${location}</h4>
            <p style="font-size: 24px; font-weight: bold;">${current.temperature_2m}°C</p>
            <p>Humidity: ${current.relative_humidity_2m}%</p>
            <p>${getWeatherDescription(current.weather_code)}</p>
        </div>
    `;
    
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';
    
    for (let i = 0; i < Math.min(7, daily.time.length); i++) {
        const item = document.createElement('div');
        item.className = 'forecast-item';
        item.innerHTML = `
            <div>
                <strong>${new Date(daily.time[i]).toLocaleDateString()}</strong>
                <p>${getWeatherDescription(daily.weather_code[i])}</p>
            </div>
            <div>
                <span>${daily.temperature_2m_max[i]}°C / ${daily.temperature_2m_min[i]}°C</span>
            </div>
        `;
        forecastContainer.appendChild(item);
    }
}

function getWeatherDescription(code) {
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        95: 'Thunderstorm'
    };
    return descriptions[code] || 'Unknown';
}

// REPORTS
function displayReports() {
    // Yield Report Chart
    updateYieldChart();
    // Profit Report Chart
    updateProfitChart();
}

function generateReport() {
    const report = {
        date: new Date().toLocaleDateString(),
        totalCrops: farmData.crops.length,
        totalLivestock: farmData.livestock.length,
        totalFields: farmData.fields.length,
        totalExpenses: farmData.expenses.reduce((sum, e) => sum + e.amount, 0),
        totalHarvest: farmData.harvest.reduce((sum, h) => sum + h.quantity, 0),
        harvestByUnit: getHarvestByUnit()
    };
    
    const csv = generateCSV(report);
    downloadCSV(csv, 'farm_report.csv');
}

function getHarvestByUnit() {
    const units = {};
    farmData.harvest.forEach(h => {
        units[h.unit] = (units[h.unit] || 0) + h.quantity;
    });
    return units;
}

function generateCSV(report) {
    let csv = 'Farm Management Report\n';
    csv += `Generated: ${report.date}\n\n`;
    csv += `Total Crops: ${report.totalCrops}\n`;
    csv += `Total Livestock: ${report.totalLivestock}\n`;
    csv += `Total Fields: ${report.totalFields}\n`;
    csv += `Total Expenses: $${report.totalExpenses.toFixed(2)}\n`;
    csv += `Total Harvest: ${report.totalHarvest}\n`;
    return csv;
}

function downloadCSV(csv, filename) {
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    link.download = filename;
    link.click();
}

// SETTINGS
function displaySettings() {
    document.getElementById('farmName').value = farmData.settings.farmName;
    document.getElementById('farmLocation').value = farmData.settings.farmLocation;
    document.getElementById('farmArea').value = farmData.settings.farmArea;
}

function saveFarmSettings() {
    farmData.settings.farmName = document.getElementById('farmName').value;
    farmData.settings.farmLocation = document.getElementById('farmLocation').value;
    farmData.settings.farmArea = document.getElementById('farmArea').value;
    
    saveDataToStorage();
    alert('Settings saved successfully!');
    document.getElementById('userName').textContent = farmData.settings.farmName;
}

// DATA MANAGEMENT
function exportData() {
    const json = JSON.stringify(farmData, null, 2);
    const link = document.createElement('a');
    link.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(json);
    link.download = 'farm_data_' + new Date().toISOString().split('T')[0] + '.json';
    link.click();
    alert('Data exported successfully!');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const importedData = JSON.parse(event.target.result);
                farmData = importedData;
                saveDataToStorage();
                alert('Data imported successfully!');
                window.location.reload();
            } catch (error) {
                alert('Error importing data: ' + error.message);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function clearAllData() {
    if (confirm('Are you sure? This will delete all farm data permanently!')) {
        farmData = {
            crops: [],
            livestock: [],
            fields: [],
            expenses: [],
            harvest: [],
            settings: {
                farmName: 'Tali Agro Farm',
                farmLocation: 'Your Location',
                farmArea: 0
            }
        };
        localStorage.removeItem('farmData');
        window.location.reload();
    }
}

// DASHBOARD
function updateDashboard() {
    document.getElementById('cropCount').textContent = farmData.crops.length;
    document.getElementById('livestockCount').textContent = farmData.livestock.length;
    document.getElementById('fieldCount').textContent = farmData.fields.length;
    
    const totalExpenses = farmData.expenses.reduce((sum, e) => sum + e.amount, 0);
    document.getElementById('totalExpenses').textContent = '$' + totalExpenses.toFixed(2);
    
    updateCropChart();
    updateExpenseChart();
    updateActivities();
}

function updateCropChart() {
    const ctx = document.getElementById('cropChart');
    if (!ctx) return;
    
    const cropNames = farmData.crops.map(c => c.name);
    const cropCounts = {};
    farmData.crops.forEach(c => {
        cropCounts[c.name] = (cropCounts[c.name] || 0) + 1;
    });
    
    if (cropChartInstance) {
        cropChartInstance.destroy();
    }
    
    cropChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(cropCounts),
            datasets: [{
                data: Object.values(cropCounts),
                backgroundColor: [
                    '#2ecc71', '#3498db', '#f39c12', '#e74c3c',
                    '#9b59b6', '#1abc9c', '#34495e', '#16a085'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function updateExpenseChart() {
    const ctx = document.getElementById('expenseChart');
    if (!ctx) return;
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyExpenses = new Array(12).fill(0);
    
    farmData.expenses.forEach(e => {
        const date = new Date(e.date);
        monthlyExpenses[date.getMonth()] += e.amount;
    });
    
    if (expenseChartInstance) {
        expenseChartInstance.destroy();
    }
    
    expenseChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Monthly Expenses',
                data: monthlyExpenses,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateYieldChart() {
    const ctx = document.getElementById('yieldChart');
    if (!ctx) return;
    
    const cropNames = [...new Set(farmData.harvest.map(h => h.cropName))];
    const yieldData = cropNames.map(name => {
        return farmData.harvest
            .filter(h => h.cropName === name)
            .reduce((sum, h) => sum + h.quantity, 0);
    });
    
    if (yieldChartInstance) {
        yieldChartInstance.destroy();
    }
    
    yieldChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: cropNames.length > 0 ? cropNames : ['No data'],
            datasets: [{
                label: 'Yield',
                data: yieldData,
                backgroundColor: '#2ecc71'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateProfitChart() {
    const ctx = document.getElementById('profitChart');
    if (!ctx) return;
    
    const totalExpenses = farmData.expenses.reduce((sum, e) => sum + e.amount, 0);
    const profit = 5000 - totalExpenses; // Assuming $5000 revenue
    
    if (profitChartInstance) {
        profitChartInstance.destroy();
    }
    
    profitChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Revenue', 'Expenses'],
            datasets: [{
                data: [5000, totalExpenses],
                backgroundColor: ['#2ecc71', '#e74c3c']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function updateActivities() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    const activities = JSON.parse(localStorage.getItem('activities')) || [];
    
    if (activities.length === 0) {
        activityList.innerHTML = '<p class="no-data">No recent activities</p>';
        return;
    }
    
    activityList.innerHTML = activities.slice(-5).reverse().map((activity, index) => `
        <div class="activity-item">
            <div class="activity-icon ${index % 2 === 0 ? 'success' : 'info'}">
                <i class="fas ${index % 2 === 0 ? 'fa-check' : 'fa-info'}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.text}</p>
            </div>
        </div>
    `).join('');
}

function addActivity(text) {
    const activities = JSON.parse(localStorage.getItem('activities')) || [];
    activities.push({
        text: text,
        date: new Date().toISOString()
    });
    localStorage.setItem('activities', JSON.stringify(activities));
}

// LOCAL STORAGE
function saveDataToStorage() {
    localStorage.setItem('farmData', JSON.stringify(farmData));
}

function loadDataFromStorage() {
    const stored = localStorage.getItem('farmData');
    if (stored) {
        farmData = JSON.parse(stored);
        document.getElementById('userName').textContent = farmData.settings.farmName;
    }
}