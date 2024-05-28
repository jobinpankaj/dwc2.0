import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class RadialChartPro extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
          series: [44, 55, 41, 17],
        labels: ['Total Invoices', 'Paid Invoices', 'UnPaid Invoices', 'Pending invoices']
      },
      series: [44, 55, 41, 17],
    //  labels: ['Total Customers', 'Total Products', 'Paid Amount', 'Unpaid Amount']
    }
  }

  render() {

    return (
      <div className="donut">
        <Chart options={this.state.options} series={this.state.series} type="donut" width="480" />
      </div>
    );
  }
}

export default RadialChartPro;
