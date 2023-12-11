import React from "react";
import { Chart as ChartJS, BarController, BarElement, Title, SubTitle} from "chart.js";

class StackedBarChart extends React.Component {

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
        ChartJS.register(BarController, BarElement, Title, SubTitle);
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
            type: "bar",
            data: this.state.chartData,
            options: {
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        beginAtZero: true,
                        stacked: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Monthly Expenses',
                        font: {
                            size: 24
                        }
                    },
                    subtitle: {
                        display: true,
                        text: 'Compare how our spending breaks down over time',
                        font: {
                            size: 18
                        },
                        padding: {
                            bottom: 20
                        }
                    }
                }
            }
        })

    }

    render() {
        return (
            <canvas style={{ height:400 }} ref={this.chartRef} />
        );
    }
}

export default StackedBarChart;
