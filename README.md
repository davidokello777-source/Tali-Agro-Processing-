# Tali Agro - Farm Management System

A comprehensive web-based farm management system built with HTML, CSS, and JavaScript. This system helps farmers manage their crops, livestock, fields, expenses, harvest records, weather information, and generate reports.

## Features

### 🌾 Core Modules

1. **Dashboard**
   - Quick overview of farm statistics
   - Visual charts for crop distribution and monthly expenses
   - Recent activity tracking

2. **Crop Management**
   - Add and manage crop plantings
   - Track planting dates and expected harvest dates
   - Monitor crop status (Growing, Harvested, etc.)
   - Estimated yield tracking

3. **Livestock Management**
   - Record animal information (type, breed, age)
   - Track health status
   - Automatic age calculation
   - Support for multiple animal types (Cattle, Sheep, Goat, Pig, Poultry)

4. **Field Management**
   - Create and manage farm fields
   - Track field size and soil type
   - Monitor irrigation availability
   - Link crops to specific fields

5. **Expense Tracking**
   - Record farm expenses with categories
   - Track costs for seeds, fertilizer, labor, equipment, pesticides, feed, veterinary, utilities
   - Monthly expense visualization
   - Total expense calculation

6. **Harvest Records**
   - Log harvest data (quantity, unit, date)
   - Track storage locations
   - Link harvests to specific crops and fields
   - Harvest history tracking

7. **Weather & Climate**
   - Real-time weather information (powered by Open-Meteo API)
   - 7-day weather forecast
   - Location-based weather data
   - No API key required

8. **Reports & Analytics**
   - Yield reports with charts
   - Profitability analysis (Revenue vs Expenses)
   - Data export to CSV format
   - PDF report generation ready

9. **Settings & Data Management**
   - Customize farm information
   - Export data to JSON format
   - Import previously exported data
   - Clear all data option

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charting**: Chart.js library
- **Icons**: Font Awesome 6.4.0
- **Storage**: Browser LocalStorage
- **Weather API**: Open-Meteo (free, no key required)
- **Responsive Design**: Mobile-friendly interface

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/davidokello777-source/Tali-Agro-Processing-.git
   ```

2. Navigate to the project directory
   ```bash
   cd Tali-Agro-Processing-
   ```

3. Open `index.html` in a web browser
   ```bash
   # On macOS
   open index.html
   
   # On Windows
   start index.html
   
   # On Linux
   xdg-open index.html
   ```

## Usage

### Adding Data

1. **Navigate** to the desired section using the sidebar menu
2. **Click** the "Add" button for that section
3. **Fill** in the required information in the modal form
4. **Submit** the form to save the data

### Viewing Data

- Dashboard provides an overview of all farm activities
- Each section displays data in easy-to-read tables
- Charts visualize trends and distributions

### Data Management

- **Export**: Settings → Export Data (saves as JSON file)
- **Import**: Settings → Import Data (restore from JSON file)
- **Clear**: Settings → Clear All Data (deletes everything)

## File Structure

```
Tali-Agro-Processing-/
├── index.html           # Main HTML file
├── css/
│   ├── styles.css      # Main stylesheet
│   └── dashboard.css   # Dashboard-specific styles
├── js/
│   └── app.js         # Main application logic
└── README.md          # This file
```

## Key Features Explained

### Dashboard
- Displays 4 main statistics: Active Crops, Livestock, Fields, Total Expenses
- Interactive charts show crop distribution and expense trends
- Recent activities feed for quick updates

### Expense Tracking
Track all farm expenses with categories:
- Seeds & Plants
- Fertilizer
- Labor
- Equipment
- Pesticides
- Animal Feed
- Veterinary Services
- Utilities
- Other

### Weather Integration
- Uses Open-Meteo free weather API
- No authentication required
- Real-time weather data
- 7-day forecast capability

### Data Persistence
- All data stored in browser's LocalStorage
- Data survives browser refresh
- Export/Import for backup and restore

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Coming Soon

- Mobile app version
- Database backend integration
- Multi-user support with login
- Advanced analytics and AI predictions
- SMS/Email notifications
- Pest detection using image recognition
- Market price tracking
- Integration with weather APIs for irrigation scheduling

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub.

## Author

David Okello
Tali Agro Technologies

---

**Happy Farming! 🚜**
