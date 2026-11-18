async function obtenerPreciosCripto() {
  try {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd,cop&include_24hr_change=true';
    const respuesta = await fetch(url);
    
    if (!respuesta.ok) {
      throw new Error(`Error HTTP ${respuesta.status}`);
    }
    
    const datos = await respuesta.json();

    const formatearUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    const formatearCOP = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' });

    const btc = datos.bitcoin;
    const eth = datos.ethereum;

    console.log(`Bitcoin (USD): ${formatearUSD.format(btc.usd)} | Bitcoin (COP): ${formatearCOP.format(btc.cop)} | Cambio 24h: ${btc.usd_24h_change.toFixed(2)}%`);
    console.log(`Ethereum (USD): ${formatearUSD.format(eth.usd)} | Ethereum (COP): ${formatearCOP.format(eth.cop)} | Cambio 24h: ${eth.usd_24h_change.toFixed(2)}%`);

    if (btc.usd_24h_change > eth.usd_24h_change) {
      console.log('Bitcoin subió más en las últimas 24 horas.');
    } else if (eth.usd_24h_change > btc.usd_24h_change) {
      console.log('Ethereum subió más en las últimas 24 horas.');
    } else {
      console.log('Ambas criptomonedas tuvieron el mismo rendimiento en 24 horas.');
    }

  } catch (error) {
    console.error('Error al consultar los precios:', error.message);
  }
}

obtenerPreciosCripto();