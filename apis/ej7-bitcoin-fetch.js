async function consultarBitcoin() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,cop');
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    console.log('Bitcoin USD:', data.bitcoin.usd);
    console.log('Bitcoin COP:', data.bitcoin.cop);
  } catch (err) {
    console.log('Error:', err.message);
  }
}
consultarBitcoin();