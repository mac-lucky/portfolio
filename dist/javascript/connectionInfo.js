async function getConnectionInfo() {
  try {
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
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    const platform = navigator.userAgentData?.platform || navigator.userAgent.match(/\(([^)]+)\)/)?.[1] || "Unknown";

    // Start with basic info that doesn't require external APIs
    let locationData = { cityName: null, regionName: null, countryName: null };
    let weatherData = "a great day";

    // Try multiple location APIs with timeout
    const locationAPIs = [
      "https://ipapi.co/json/",
      "https://freeipapi.com/api/json/",
      "https://ipinfo.io/json"
    ];

    for (let apiUrl of locationAPIs) {
      try {
        console.log(`Trying location API: ${apiUrl}`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const locationResponse = await fetch(apiUrl, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (locationResponse.ok) {
          const data = await locationResponse.json();
          console.log('API Response:', data);
          
          // Handle different API response formats
          let city = data.city || data.cityName || null;
          let region = data.region || data.regionName || data.region_name || null;
          let country = data.country || data.countryName || data.country_name || null;
          
          if (city && city !== "Unknown City" && city !== "Unknown" && city.trim() !== "") {
            locationData = {
              cityName: city,
              regionName: region,
              countryName: country
            };
            console.log('Successfully got location data:', locationData);
            break; // Success, exit the loop
          }
        }
      } catch (apiError) {
        console.log(`API ${apiUrl} failed:`, apiError.message);
        continue; // Try next API
      }
    }

    // Only try weather if we have a valid city
    if (locationData.cityName) {
      // Try to get weather data
      try {
        const weatherController = new AbortController();
        const weatherTimeoutId = setTimeout(() => weatherController.abort(), 5000);
        
        const weatherResponse = await fetch(`https://wttr.in/${locationData.cityName}?format=%C+%t`, {
          signal: weatherController.signal
        });
        clearTimeout(weatherTimeoutId);
        
        if (weatherResponse.ok) {
          const weather = await weatherResponse.text();
          console.log('Weather response:', weather);
          if (weather && weather.trim() && !weather.includes("Unknown") && weather.trim() !== "") {
            weatherData = weather.trim();
          }
        }
      } catch (weatherError) {
        console.log("Weather API unavailable, using fallback");
      }
    }

    // Build location string
    let locationString = "";
    if (locationData.cityName && locationData.cityName !== "Unknown City" && locationData.cityName !== "Unknown") {
      locationString = locationData.cityName;
      if (locationData.regionName && locationData.regionName !== "Unknown Region" && locationData.regionName !== "Unknown") {
        locationString += `, ${locationData.regionName}`;
      }
      if (locationData.countryName && locationData.countryName !== "Unknown Country" && locationData.countryName !== "Unknown") {
        locationString += `, ${locationData.countryName}`;
      }
    }

    const infoHtml = `
            Hello there! It looks like you're browsing ${locationString ? `from ${locationString} ` : ""}using<br> 
            ${browserInfo.browserName} on ${platform}<br>
            ${locationString && weatherData !== "a great day" ? `The current weather in ${locationData.cityName} is ${weatherData}.<br>` : ""}
            Have a great day!
        `;

    document.getElementById("connection-info").innerHTML = infoHtml;
  } catch (error) {
    console.error("Connection info error:", error);
    
    // Fallback to basic browser info
    const getBrowserName = () => {
      const userAgent = navigator.userAgent;
      if (userAgent.match(/chrome|chromium|crios/i)) return "Chrome";
      if (userAgent.match(/firefox|fxios/i)) return "Firefox";
      if (userAgent.match(/safari/i)) return "Safari";
      if (userAgent.match(/opr\//i)) return "Opera";
      if (userAgent.match(/edg/i)) return "Edge";
      return "Unknown";
    };

    const platform = navigator.userAgentData?.platform || navigator.userAgent.match(/\(([^)]+)\)/)?.[1] || "Unknown";
    
    document.getElementById("connection-info").innerHTML = `
      Hello there! It looks like you're using ${getBrowserName()} on ${platform}.<br>
      Have a great day!
    `;
  }
}

window.addEventListener("load", getConnectionInfo);
