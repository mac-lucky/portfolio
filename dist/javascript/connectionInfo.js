async function getConnectionInfo() {
    try {
        const locationResponse = await fetch('http://ip-api.com/json/');
        const locationData = await locationResponse.json();
        
        const weatherResponse = await fetch(`https://wttr.in/${locationData.city}?format=%C+%t`);
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

        // Additional legitimate browser information
        const browserInfo = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            cookiesEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            browserName: getBrowserName()
        };
        
        const platform = navigator.userAgentData?.platform || navigator.userAgent.match(/\(([^)]+)\)/)?.[1] || 'Unknown';
        
        const infoHtml = `
            Hello there! It looks like you're browsing from ${locationData.city || 'Unknown'}, ${locationData.country || 'Unknown'} using ${browserInfo.browserName}.<br>
            Your ISP is ${locationData.isp || 'Unknown'}.<br>
            Fun fact: Your current time zone is ${browserInfo.timeZone}.<br>
            Platform: ${platform}<br>
            The current weather in ${locationData.city} is ${weatherData}.<br>
            Have a great day!
        `;
        
        document.getElementById('connection-info').innerHTML = infoHtml;
    } catch (error) {
        console.error('Connection info error:', error);
        document.getElementById('connection-info').innerHTML = 'Connection info unavailable';
    }
}

window.addEventListener('load', getConnectionInfo);
