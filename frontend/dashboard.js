/* global Chart */

const API_URL = "http://localhost:3000/api/measurements";

let moistureChart;
const waterButton =
    document.getElementById("waterButton");

async function loadMeasurements() {
    const response =
        await fetch(API_URL);

    const data =
        await response.json();


    console.log(data);


    const weekData =
        filterLastSevenDays(data);


    updateCurrentValue(weekData);

    updateChart(weekData);
}



function filterLastSevenDays(data) {

    const date =
        new Date();

    date.setDate(
        date.getDate() - 7
    );


    return data
        .filter(m =>
            new Date(m.created_at) >= date
        )
        .reverse();
}



function updateCurrentValue(data) {

    if(data.length === 0)
        return;


    const latest =
        data[data.length - 1];


    document
        .getElementById("currentMoisture")
        .innerHTML =
        latest.moisture + " %";


}



function updateChart(data) {


    const labels =
        data.map(m =>
            new Date(m.created_at)
        );


    const values =
        data.map(m =>
            m.moisture
        );


    if(moistureChart)
        moistureChart.destroy();


    moistureChart =
        new Chart(
            document.getElementById(
                "moistureChart"
            ),
            {

                type: "line",

                data: {

                    labels,

                    datasets: [
                        {
                            label:
                                "Feuchtigkeit %",

                            data: values,

                            tension:0.3
                        }
                    ]
                },


                options: {

                    responsive:true,

                    scales: {

                        y:{
                            min:0,
                            max:100
                        },

                        x:{
                            type:"time",
                            time:{
                                unit:"day"
                            }
                        }
                    }
                }

            });

}



loadMeasurements();





waterButton.addEventListener(
    "click",
    async () => {

        try {
            waterButton.disabled = true;


            document.getElementById(
                "wateringStatus"
            ).textContent =
                "💧 Pumpe läuft...";


            const response =
                await fetch(
                    "http://localhost:3000/api/watering",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            plant_id: 1,
                            duration_seconds: 5

                        })
                    }
                );


            if(!response.ok) {

                throw new Error(
                    "Bewässerung fehlgeschlagen"
                );

            }


            document.getElementById(
                "wateringStatus"
            ).textContent =
                "✅ Bewässerung beendet";


        }


        catch(error) {

            console.error(error);


            document.getElementById(
                "wateringStatus"
            ).textContent =
                "❌ Fehler";

        }


        finally {

            waterButton.disabled = false;

        }

    }
);

setInterval(() => {

    loadMeasurements()
        .catch(console.error);

}, 20000);
