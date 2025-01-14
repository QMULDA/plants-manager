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
        this.getFloweringAndNonFloweringCount();
    }

    getTrailingAndNonTrailingCount() {
        PlantDataService.getCountTrailingPlants()
            .then(response => {
                const trailingCount = response.data.trailingCount;
                const totalCount = response.data.totalCount;
                this.setState({
                    trailingCount: trailingCount,
                    nonTrailingCount: totalCount - trailingCount,
                }, this.renderTrailingPieChart);
            })
            .catch(e => {
                console.error(e);
            });

    }

    getFloweringAndNonFloweringCount() {
        PlantDataService.getCountFloweringPlants()
            .then(response => {
                const floweringCount = response.data.floweringCount;
                const totalCount = response.data.totalCount;
                this.setState({
                    floweringCount: floweringCount,
                    nonFloweringCount: totalCount - floweringCount,
                }, this.renderFloweringPieChart);
            })
            .catch(e => {
                console.error(e);
            });

    }

    renderTrailingPieChart() {
        const ctx = document.getElementById("trailingChart").getContext("2d");
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

    renderFloweringPieChart() {
        const ctx = document.getElementById("floweringChart").getContext("2d");
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Flowering Plants', 'Non-Flowering Plants'],
                datasets: [
                    {
                        data: [this.state.floweringCount, this.state.nonFloweringCount],
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
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <div className="chart-container" style={{width: '400px'}}>
                    <canvas id="trailingChart"></canvas>
                </div>
                <div className="chart-container" style={{width: '400px'}}>
                    <canvas id="floweringChart"></canvas>
                </div>
            </div>
        );
    }
}
