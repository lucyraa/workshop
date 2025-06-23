        const cityInput = document.getElementById("city");
        const getWeatherButton = document.getElementById("getWeather");
        const weatherDisplay = document.getElementById("weather");
        const locationDisplay = document.getElementById("location");
        const temperatureDisplay = document.getElementById("temperature");
        const descriptionDisplay = document.getElementById("description");
        const iconDisplay = document.getElementById("icon");

        const API_KEY = "ad193d2b03adab9e78c35d8996296ab3"; 

        async function getWeather(city) {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=id` // Menambahkan lang=id untuk deskripsi bahasa Indonesia
                );

                if (response.status === 404) {
                    throw new Error("Kota tidak ditemukan. Periksa kembali nama kota.");
                }
                if (response.status === 401) {
                    throw new Error("API Key tidak valid. Mohon ganti dengan API Key Anda.");
                }
                if (!response.ok) {
                    throw new Error("Terjadi kesalahan saat mengambil data.");
                }

                const data = await response.json();

              
                locationDisplay.textContent = `${data.name}, ${data.sys.country}`;
                temperatureDisplay.textContent = `Suhu: ${Math.round(data.main.temp)}°C`;
                descriptionDisplay.textContent = `Kondisi: ${data.weather[0].description}`;
                iconDisplay.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                weatherDisplay.classList.remove("hidden");
            } catch (error) {
 
                alert(error.message); 
            }
        }


        getWeatherButton.addEventListener("click", () => {
            const city = cityInput.value.trim();
            if (city) {
                getWeather(city);
            } else {
                alert("Harap masukkan nama kota!");
            }
        });

  
        cityInput.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                getWeatherButton.click();
            }
        });

