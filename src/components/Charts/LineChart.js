import React from "react";
import { CategoryScale, Chart as ChartJS, LineController, LineElement, LinearScale, PointElement, SubTitle, Title} from "chart.js";

class LineChart extends React.Component {

    constructor() {
        super();
        this.chartRef = React.createRef();
        this.state = {
            chartData: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        fill: false,
                        borderColor: '#3cba9f',
                        label: 'Money Spent'
                    },
                    {
                        data: [],
                        fill: false,
                        borderColor: '#3bd3e',
                        label: 'Budget Goal'
                    }
                ]
            }
        }
    }

    componentDidMount() {
        ChartJS.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Title, SubTitle);
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
            type: 'line',
            data: this.state.chartData,
            options: {
                layout: {
                    padding: 0
                },
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Budget vs Actual Spending',
                        font: {
                            size: 24
                        }
                    },
                    subtitle: {
                        display: true,
                        text: 'See how your spending over time relates to your stated budget',
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
            <canvas style= {{ height:400 }} ref={this.chartRef} />
        );
    }
}

export default LineChart;
