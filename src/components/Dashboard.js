import template from '../pages/Dashboard.html';

let DashboardComponent = {}

DashboardComponent.template = template

DashboardComponent.init = () => {
    DashboardComponent.getSummaryWorld();
    DashboardComponent.getSummaryIndo();
    DashboardComponent.getDetailCountry();
}

DashboardComponent.getSummaryWorld = () => {
    axios.get("https://covid19.mathdro.id/api").then(result => {
        window.localStorage.setItem("worldData", JSON.stringify(result))
        const confirmed = result.data.confirmed.value.toString()
        const recovered = result.data.recovered.value.toString()
        const deaths = result.data.deaths.value.toString()

        getById("confirmed").innerText = UniversalFunction.addComma(confirmed)
        getById("recovered").innerText = UniversalFunction.addComma(recovered)
        getById("deaths").innerText = UniversalFunction.addComma(deaths)

        DashboardComponent.generateChart({confirmed, recovered, deaths})
    }).catch(err => {
        if(err.message == "Network Error") {
            const data = JSON.parse(window.localStorage.getItem("worldData")).data
            const confirmed = data.confirmed.value.toString()
            const recovered = data.recovered.value.toString()
            const deaths = data.deaths.value.toString()

            getById("confirmed").innerText = UniversalFunction.addComma(confirmed)
            getById("recovered").innerText = UniversalFunction.addComma(recovered)
            getById("deaths").innerText = UniversalFunction.addComma(deaths)

            DashboardComponent.generateChart({confirmed, recovered, deaths})
        }
    })
}

DashboardComponent.generateChart = ({confirmed, recovered, deaths}) => {
    Highcharts.chart('chart', {
        chart: {
            backgroundColor: "#232429",
            borderColor: "#000",
            type: 'pie'
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        textOutline: 0,
                        color: "#fff"
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Confirmed',
                y: parseFloat(confirmed),
                color: "#FFC107"
            },{
                name: 'Recovered',
                y: parseFloat(recovered),
                color: "#388E3C"
            },{
                name: 'Deaths',
                y: parseFloat(deaths),
                color: "#FF5252"
            },]
        }]
    });
}

DashboardComponent.getSummaryIndo = () => {
    axios.get("https://covid19.mathdro.id/api/countries/Indonesia").then(result => {
        window.localStorage.setItem("indoData", JSON.stringify(result))
        const confirmed = result.data.confirmed.value.toString()
        const recovered = result.data.recovered.value.toString()
        const deaths = result.data.deaths.value.toString()
        const lastUpdate = result.data.lastUpdate

        getById("confirmedIndo").innerText = UniversalFunction.addComma(confirmed)
        getById("recoveredIndo").innerText = UniversalFunction.addComma(recovered)
        getById("deathsIndo").innerText = UniversalFunction.addComma(deaths)
        getById("lastUpdate").innerText = moment(lastUpdate).format("DD MMMM YYYY HH:mm")
    }).catch(err => {
        if(err.message == "Network Error") {
            const data = JSON.parse(window.localStorage.getItem("indoData")).data
            const confirmed = data.confirmed.value.toString()
            const recovered = data.recovered.value.toString()
            const deaths = data.deaths.value.toString()
            const lastUpdate = data.lastUpdate

            getById("confirmedIndo").innerText = UniversalFunction.addComma(confirmed)
            getById("recoveredIndo").innerText = UniversalFunction.addComma(recovered)
            getById("deathsIndo").innerText = UniversalFunction.addComma(deaths)
            getById("lastUpdate").innerText = moment(lastUpdate).format("DD MMMM YYYY HH:mm")
        }
    })
}

DashboardComponent.getDetailCountry = () => {
    const api = [
        axios.get("https://covid19.mathdro.id/api/countries/Indonesia"),
        axios.get("https://covid19.mathdro.id/api/countries/USA"),
        axios.get("https://covid19.mathdro.id/api/countries/China"),
        axios.get("https://covid19.mathdro.id/api/countries/Italy"),
        axios.get("https://covid19.mathdro.id/api/countries/Spain"),
        axios.get("https://covid19.mathdro.id/api/countries/Iran"),
        axios.get("https://covid19.mathdro.id/api/countries/France"),
        axios.get("https://covid19.mathdro.id/api/countries/Switzerland"),
        axios.get("https://covid19.mathdro.id/api/countries/United Kingdom"),
        axios.get("https://covid19.mathdro.id/api/countries/Korea, South"),
        axios.get("https://covid19.mathdro.id/api/countries/Netherlands"),
        axios.get("https://covid19.mathdro.id/api/countries/Austria"),
        axios.get("https://covid19.mathdro.id/api/countries/Belgium"),
        axios.get("https://covid19.mathdro.id/api/countries/Canada"),
        axios.get("https://covid19.mathdro.id/api/countries/Turkey"),
        axios.get("https://covid19.mathdro.id/api/countries/Portugal"),
        axios.get("https://covid19.mathdro.id/api/countries/Norway"),
        axios.get("https://covid19.mathdro.id/api/countries/Australia"),
        axios.get("https://covid19.mathdro.id/api/countries/Israel"),
        axios.get("https://covid19.mathdro.id/api/countries/Brazil"),
        axios.get("https://covid19.mathdro.id/api/countries/Sweden"),
        axios.get("https://covid19.mathdro.id/api/countries/Norway"),
        axios.get("https://covid19.mathdro.id/api/countries/Malaysia"),
        axios.get("https://covid19.mathdro.id/api/countries/Germany")
    ]

    Promise.all(api).then(function(values) {
        let data = values.map(x => {
            const country = x.request.responseURL.split('/')[x.request.responseURL.split('/').length-1].replace("%20", " ");
            const confirmed = UniversalFunction.addComma(x.data.confirmed.value.toString())
            const recovered = UniversalFunction.addComma(x.data.recovered.value.toString())
            const deaths = UniversalFunction.addComma(x.data.deaths.value.toString())
            const deathRatio = (parseFloat(x.data.deaths.value) / parseFloat(x.data.confirmed.value) * 100).toFixed(2)
            const recoveredRatio = (parseFloat(x.data.recovered.value) / parseFloat(x.data.confirmed.value) * 100).toFixed(2)

            return {
                country, confirmed, recovered, deaths, deathRatio, recoveredRatio
            }
        })

        window.localStorage.setItem("detailCountry", JSON.stringify(data))

        data = data.map(x => {
            return `
                <tr>
                    <td>${x.country}</td>
                    <td>${x.confirmed}</td>
                    <td>${x.recovered}</td>
                    <td>${x.deaths}</td>
                    <td>${x.deathRatio}%</td>
                    <td>${x.recoveredRatio}%</td>
                </tr>
            `
        })

        getById("data").innerHTML = data.join("")
    }).catch(err => {
        if(err.message == "Network Error") {
            const dataLocalStorage = JSON.parse(window.localStorage.getItem("detailCountry"))
            const data = dataLocalStorage.map(x => {

            return `
                <tr>
                    <td>${x.country}</td>
                    <td>${x.confirmed}</td>
                    <td>${x.recovered}</td>
                    <td>${x.deaths}</td>
                    <td>${x.deathRatio}%</td>
                    <td>${x.recoveredRatio}%</td>
                </tr>
            `
            })

            getById("data").innerHTML = data.join("")
        }
    })
}

export default DashboardComponent;