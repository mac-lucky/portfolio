async function getConnectionInfo() {
    try {
        const locationResponse = await fetch('https://freeipapi.com/api/json/');
        const locationData = await locationResponse.json();
        
        const weatherResponse = await fetch(`https://wttr.in/${locationData.cityName}?format=%C+%t`);
        const weatherData = await weatherResponse.text();

        const platform = navigator.userAgentData?.platform || navigator.userAgent.match(/\(([^)]+)\)/)?.[1] || 'Unknown';
        
        const infoHtml = `
            Hello there! It looks like you're browsing from ${locationData.cityName || 'Unknown'}, ${locationData.regionName || 'Unknown'}, ${locationData.countryName || 'Unknown'} using<br> 
            ${browserInfo.browserName} on ${platform}<br>
            The current weather in ${locationData.cityName} is ${weatherData}.<br>
            Have a great day!
        `;
        
        document.getElementById('connection-info').innerHTML = infoHtml;
    } catch (error) {
        console.error('Connection info error:', error);
        document.getElementById('connection-info').innerHTML = 'Connection info unavailable';
    }
}

window.addEventListener('load', getConnectionInfo);
