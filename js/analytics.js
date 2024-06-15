document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('evChart').getContext('2d');
    let evData = JSON.parse(localStorage.getItem('evData')) || [];

    const data = {
        labels: evData.map(ev => ev.model),
        datasets: [{
            label: 'Battery Capacity (kWh)',
            data: evData.map(ev => ev.battery_capacity),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }, {
            label: 'Range (miles)',
            data: evData.map(ev => ev.range),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }, {
            label: 'Charging Time (hours)',
            data: evData.map(ev => ev.charging_time),
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        }, {
            label: 'Power (kW)',
            data: evData.map(ev => ev.power),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }, {
            label: 'Top Speed (mph)',
            data: evData.map(ev => ev.top_speed),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const evChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
});
