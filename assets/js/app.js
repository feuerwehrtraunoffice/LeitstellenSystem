// Uhrzeit
setInterval(() => {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
}, 1000);

// Wetter (Beispiel mit Open-Meteo API)
fetch("https://api.open-meteo.com/v1/forecast?latitude=47.9&longitude=14.7&current_weather=true")
  .then(res => res.json())
  .then(data => {
    const temp = data.current_weather.temperature;
    document.getElementById("weather").textContent = `🌡️ ${temp}°C in Weyer`;
  });
