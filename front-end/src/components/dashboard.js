import React, {Component} from "react";
import {Chart, PieController, ArcElement, Tooltip, Legend} from 'chart.js';
import PlantDataService from "../services/plant.service";

Chart.register(PieController, ArcElement, Tooltip, Legend);

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trailingCount: 0,
            totalCount: 0
        };
    }

    componentDidMount() {
        this.getTrailingAndNonTrailingCount();
    }

    getTrailingAndNonTrailingCount() {
        PlantDataService.getCountTrailingPlants()
            .then(response => {
                const trailingCount = response.data.trailingCount;
                const totalCount = response.data.totalCount;
                this.setState({
                    trailingCount: trailingCount,
                    nonTrailingCount: totalCount - trailingCount,
                }, this.renderPieChart);
            })
            .catch(e => {
                console.error(e);
            });

    }

    renderPieChart() {
        const ctx = document.getElementById("pieChart").getContext("2d");
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Trailing Plants', 'Non-Trailing Plants'],
                datasets: [
                    {
                        data: [this.state.trailingCount, this.state.nonTrailingCount],
                        backgroundColor: ['#36A2EB', '#FF6384'],
                        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                },
            },
        });
    }

    render() {
        return (
            <div className="dashboard">
                <h2>Plant Dashboard</h2>
                <div className="chart-container">
                    <canvas id="pieChart"></canvas>
                </div>
            </div>
        );
    }
}
