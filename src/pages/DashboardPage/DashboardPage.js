import React from "react";
import axios from "axios";
import PieChart from "../../components/Charts/PieChart";
import LineChart from "../../components/Charts/LineChart";
import StackedBarChart from "../../components/Charts/StackedBarChart";

class DashboardPage extends React.Component {
  constructor() {
    super();
    this.state = {
        pieChartData: {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: []
                }
            ]
        },
        lineChartData: {
            labels: [],
            datasets: [
                {
                    data: [],
                    fill: false,
                    borderColor: '#3cba9f',
                    label: 'Budget'
                }
            ]
        },
        barChartData: {
            labels: [],
            datasets: []
        }
    }
}

getBudget = async () => {

    const token = localStorage.getItem('jwt');

    await axios.post('https://monkfish-app-3ps63.ondigitalocean.app/api/budget/fetch', { token })
    .then(response => {
        this.setState({ pieChartData: response.data.pieData });
        this.setState({ lineChartData: response.data.lineData })
        this.setState({ barChartData: response.data.barData})
        console.log(response.data);
    })
};

componentDidMount() {
    this.getBudget();
}

render() {
    return (
        <main className="center charts" id="main" >
            <div itemScope itemType="http://schema.org/article" className="page-area" id="center" role="feed">
                    <article className="h-entry">
                        <PieChart budget = {this.state.pieChartData}/>
                    </article>
                    <article className="h-entry">
                        <LineChart budget = {this.state.lineChartData}/>
                    </article>
                    <article className="h-entry">
                        <StackedBarChart budget = {this.state.barChartData}/>
                    </article>
            </div>
        </main>
  );    

}
}

export default DashboardPage;
