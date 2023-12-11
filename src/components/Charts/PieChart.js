import React from "react";
import { Chart as ChartJS, PieController, ArcElement, Tooltip, Legend, Title, SubTitle} from "chart.js";

class PieChart extends React.Component {

    constructor() {
        super();
        this.chartRef = React.createRef();
        this.state = {
            chartData: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        backgroundColor: []
                    }
                ]
            }
        }
    }

    componentDidMount() {
        ChartJS.register(PieController, ArcElement, Tooltip, Legend, Title, SubTitle);
    }

    componentDidUpdate() {
        if (this.state.chartData.labels.length === 0) {
            this.setState({ chartData: this.props.budget });
        }
        
        const chartInstance = this.chartInstance;
        if (chartInstance) {
            chartInstance.destroy();
        }

        this.chartInstance = new ChartJS(this.chartRef.current, {
            type: "pie",
            data: this.state.chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 18
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Budget Overview',
                        font: {
                            size: 24
                        }
                    },
                    subtitle: {
                        display: true,
                        text: 'Here is how your budget is distributed',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        })

    }

    render() {
        return (
            <canvas style={{ height: 500 }} ref={this.chartRef} aria-label={"Budget Overview Pie Chart"} aria-required="true" />
        );
    }
}

export default PieChart;
