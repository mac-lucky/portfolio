async function getConnectionInfo() {
    try {
        const locationResponse = await fetch('https://freeipapi.com/api/json/');
        const locationData = await locationResponse.json();
        
        const weatherResponse = await fetch(`https://wttr.in/${locationData.cityName}?format=%C+%t`);
        const weatherData = await weatherResponse.text();

        // Get browser name from user agent
        const getBrowserName = () => {
            const userAgent = navigator.userAgent;
            if (userAgent.match(/chrome|chromium|crios/i)) return "Chrome";
            if (userAgent.match(/firefox|fxios/i)) return "Firefox";
            if (userAgent.match(/safari/i)) return "Safari";
            if (userAgent.match(/opr\//i)) return "Opera";
            if (userAgent.match(/edg/i)) return "Edge";
            return "Unknown";
        };

        const browserInfo = {
            browserName: getBrowserName(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        
        const platform = navigator.userAgentData?.platform || navigator.userAgent.match(/\(([^)]+)\)/)?.[1] || 'Unknown';
        
        const infoHtml = `
            Hello there! It looks like you're browsing from ${locationData.cityName || 'Unknown'}, ${locationData.regionName || 'Unknown'}, ${locationData.countryName || 'Unknown'} using ${browserInfo.browserName}.<br>
            Time zone: ${locationData.timeZone || browserInfo.timeZone}<br>
            Platform: ${platform}<br>
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
