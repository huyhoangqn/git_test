import {Component, OnInit} from '@angular/core';
import {InputStatistic} from '../../../model/statistic/input-statistic';
import {StatisticService} from '../../../service/statistic/statistic.service';
import {Title} from '@angular/platform-browser';
import {DatePipe} from '@angular/common';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  constructor(private statisticService: StatisticService,
              private datePipe: DatePipe,
              private title: Title) {
    this.title.setTitle('Statistic');
  }

  listStatisticByComputer: any;
  listStatisticByMonth: any;
  listStatisticByAccount: any;
  statisticInput: InputStatistic;
  pastDay = this.datePipe.transform(new Date().setDate(new Date().getDate() - 30), 'yyyy-MM-dd');
  today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  statisticForm = new FormGroup({
    startDate: new FormControl(this.pastDay),
    endDate: new FormControl(this.today, this.dateInFuture),
    sort: new FormControl('none'),
    type: new FormControl('computer')
  }, this.invalidDate);
  private myChart: Chart;
  error = true;
  errorServer = true;

  ngOnInit(): void {
  }

  invalidDate(abstractControl: AbstractControl) {
    const v = abstractControl.value;
    const start = new Date(v.startDate);
    const end = new Date(v.endDate);
    end.setDate(end.getDate() - 1);
    if (start > end) {
      return {dateNotValid: true};
    } else {
      return null;
    }
  }

  dateInFuture(abstractControl: AbstractControl) {
    const v = abstractControl.value;
    const end = new Date(v);
    if (end > new Date()) {
      return {futureDate: true};
    } else {
      return null;
    }
  }

  onSubmit() {
    this.statisticInput = this.statisticForm.value;
    if (this.statisticInput.type === 'computer') {
      this.statisticService.getStatisticByComputer(this.statisticInput.startDate, this.statisticInput.endDate)
        .subscribe(value => {
            this.listStatisticByComputer = value;
            console.log(value);
            this.error = false;
            this.errorServer = true;
          },
          error => this.errorServer = false,
          () => {
            if (this.statisticInput.sort === 'ascending') {
              this.listStatisticByComputer.sort((a, b) => (a.hour > b.hour) ? 1 : -1);
            }
            if (this.statisticInput.sort === 'decrease') {
              this.listStatisticByComputer.sort((a, b) => (a.hour < b.hour) ? 1 : -1);
            }
            this.destroyChart();
            this.createChartComputer();
          });
    }
    if (this.statisticInput.type === 'month') {
      this.statisticService.getStatisticByMonth(this.statisticInput.startDate, this.statisticInput.endDate)
        .subscribe(value => {
            this.listStatisticByMonth = value;
            this.error = false;
            this.errorServer = true;
          },
          error => this.errorServer = false,
          () => {
            if (this.statisticInput.sort === 'ascending') {
              this.listStatisticByMonth.sort((a, b) => (a.total > b.total) ? 1 : -1);
            }
            if (this.statisticInput.sort === 'decrease') {
              this.listStatisticByMonth.sort((a, b) => (a.total < b.total) ? 1 : -1);
            }
            this.destroyChart();
            this.createChartMonth();
          });
    }
  }

  onChange(value: any) {
    switch (value) {
      case '1 week':
        this.statisticForm.patchValue({
          startDate: this.datePipe.transform(new Date().setDate(new Date().getDate() - 7), 'yyyy-MM-dd'),
          endDate: this.today
        });
        break;
      case '2 week':
        this.statisticForm.patchValue({
          startDate: this.datePipe.transform(new Date().setDate(new Date().getDate() - 14), 'yyyy-MM-dd'),
          endDate: this.today
        });
        break;
      case '1 month':
        this.statisticForm.patchValue({
          startDate: this.datePipe.transform(new Date().setDate(new Date().getDate() - 30), 'yyyy-MM-dd'),
          endDate: this.today
        });
        break;
      case '2 month':
        this.statisticForm.patchValue({
          startDate: this.datePipe.transform(new Date().setDate(new Date().getDate() - 60), 'yyyy-MM-dd'),
          endDate: this.today
        });
        break;
      case '1 quarter':
        this.statisticForm.patchValue({
          startDate: this.datePipe.transform(new Date().setDate(new Date().getDate() - 120), 'yyyy-MM-dd'),
          endDate: this.today
        });
        break;
      case '2 quarter':
        this.statisticForm.patchValue({
          startDate: this.datePipe.transform(new Date().setDate(new Date().getDate() - 240), 'yyyy-MM-dd'),
          endDate: this.today
        });
        break;
      case '1 year':
        this.statisticForm.patchValue({
          startDate: this.datePipe.transform(new Date().setDate(new Date().getDate() - 365), 'yyyy-MM-dd'),
          endDate: this.today
        });
        break;
      default:
        console.log('default');
    }
  }

  createChartComputer() {
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Giờ',
          data: this.listStatisticByComputer,
          parsing: {
            xAxisKey: 'computer',
            yAxisKey: 'hour'
          },
          backgroundColor: [
            '#FFF448'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Giờ',
              color: '#3EB595',
              font: {
                family: 'roboto',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 20, bottom: 0}
            }
          },
          x: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Mã máy',
              color: '#3EB595',
              font: {
                family: 'roboto',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 0, bottom: 10}
            },
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'THỐNG KÊ THEO MÁY',
            position: 'top',
            color: '#3EB595',
            font: {
              family: 'roboto',
              size: 30,
              style: 'normal',
              lineHeight: 1.0
            },
            padding: {top: 20, bottom: 0},
          },
        }
      }
    });
  }

  createChartMonth() {
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Tiền dịch vụ',
          data: this.listStatisticByMonth,
          parsing: {
            xAxisKey: 'month',
            yAxisKey: 'service'
          },
          backgroundColor: [
            '#FFF447'
          ],
          borderWidth: 1
        },
          {
            label: 'Tiền máy tính',
            data: this.listStatisticByMonth,
            parsing: {
              xAxisKey: 'month',
              yAxisKey: 'computer'
            },
            backgroundColor: [
              '#3EB595'
            ],
            borderWidth: 1
          },
          {
            label: 'Tổng',
            data: this.listStatisticByMonth,
            parsing: {
              xAxisKey: 'month',
              yAxisKey: 'total'
            },
            backgroundColor: [
              '#696969'
            ],
            borderWidth: 1
          }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Tiền (VND)',
              color: '#3EB595',
              font: {
                family: 'roboto',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 20, bottom: 0}
            }
          },
          x: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Month',
              color: '#3EB595',
              font: {
                family: 'roboto',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 0, bottom: 10}
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'THỐNG KÊ THEO THÁNG',
            position: 'top',
            color: '#3EB595',
            font: {
              family: 'roboto',
              size: 30,
              style: 'normal',
              lineHeight: 1.0
            },
            padding: {top: 20, bottom: 0}
          }
        }
      }
    });
  }

  destroyChart() {
    if (this.myChart != null) {
      this.myChart.destroy();
    }
  }
}
