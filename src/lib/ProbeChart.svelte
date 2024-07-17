<script lang="ts">
    import { Line } from "svelte-chartjs";
    import { Chart as ChartJS, SubTitle, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, type ChartData, type Point } from 'chart.js';

    ChartJS.register(Legend, SubTitle, LineElement, LinearScale, PointElement, CategoryScale);

    export let data: {
        readings: number[];
        timestamps: Date[];
        setTemps: number[];
    }

    export let readingColor: string;
    export let setTempColor: string;

    export let unit: string;

    export let timeFrame: string;

    $: subTitle = `Last ${timeFrame}`

    $: timestamps = data ? data.timestamps ?? [] : [];
    $: readings = data ? data.readings ?? [] : [];
    $: setTemps = data ? data.setTemps ?? [] : [];

    let chartData: ChartData<"line", (number | Point)[], unknown>;
    $: {
        if (setTemps.every(t => t === 0)) {
            chartData = {
                labels: timestamps,
                datasets: [
                    {
                        label: "Temperature",
                        data: readings,
                        borderColor: readingColor,
                        tension: 0.1,
                        pointRadius: 0,
                    },
                ],
            }
        } else {
            chartData = {
                labels: timestamps,
                datasets: [
                    {
                        label: "Temperature",
                        data: readings,
                        borderColor: readingColor,
                        tension: 0.1,
                        pointRadius: 0,
                    },
                    {
                        label: "Set Temperature",
                        data: setTemps,
                        borderColor: setTempColor,
                        tension: 0.1,
                        pointRadius: 0,
                    },
                ],
            }
        }
    }
</script>
<div class="bg-base-200 max-h-64 flex-grow">
    <Line data={chartData} options={{ 
        maintainAspectRatio: false, 
        responsive: true,
        resizeDelay: 100,
        scales: {
            y: {
                ticks: {
                    callback: (value, index, ticks) => {
                        return `${value} ${unit}`;
                    },
                },
                
                grid: {
                    display: false,
                },
            },
            x: {
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                },
            },
        },
        animation: false,
        plugins: {
            subtitle: {
                display: true,
                text: subTitle,
            },
        },
    }} />
</div>