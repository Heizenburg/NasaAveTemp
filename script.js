// Data from: https://data.giss.nasa.gov/gistemp/
// Mean from: https://earthobservatory.nasa.gov/world-of-change/DecadalTemp

window.addEventListener('load', setup);

async function setup() {
  const ctx = document.getElementById('chart').getContext('2d');
  const temperatures = await getData();
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: temperatures.years,
      datasets: [
        {
          label: 'Temperature in °C',
          data: temperatures.temps,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderWidth: 1
        }
      ]
    },
    options: {}
  });
}

async function getData() {
  const response = await fetch('GLB.Ts+dSST.csv');
  const data = await response.text();
  const years = [];
  const temps = [];
  const rows = data.split('\n').slice(1);
  
  rows.forEach(row => {
    const cols = row.split(',');
    years.push(cols[0]);
    temps.push(parseFloat(cols[1]) + 14);
  });
  return { years, temps };
}