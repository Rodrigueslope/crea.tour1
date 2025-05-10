const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=-10.9472&longitude=-37.0731&current=temperature_2m,relative_humidity_2m";

async function atualizarDadosClimaticos() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const temperatura = data.current.temperature_2m;
    const umidade = data.current.relative_humidity_2m;

    document.getElementById("temp-value").innerText = temperatura + " °C";
    document.getElementById("hum-value").innerText = umidade + " %";

    const iframe = document.getElementById("speckle-container");
    const viewer = iframe?.contentWindow?.document;

    const telhado = viewer?.querySelector('[data-object-id="cc4f5c1c944da13c6909f46edcefc422"]');
    if (telhado) {
      if (temperatura > 25) {
        telhado.classList.add("blinking");
      } else {
        telhado.classList.remove("blinking");
      }
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

atualizarDadosClimaticos();
setInterval(atualizarDadosClimaticos, 30000);
