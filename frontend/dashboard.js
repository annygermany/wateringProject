/* global Chart */

const API_URL = "http://localhost:3000/api/measurements";


let moistureChart;


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


setInterval(() => {

    loadMeasurements()
        .catch(console.error);

}, 20000);