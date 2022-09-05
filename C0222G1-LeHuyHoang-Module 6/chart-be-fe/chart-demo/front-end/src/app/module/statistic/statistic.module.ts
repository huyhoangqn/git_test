import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticComponent } from './statistic/statistic.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [StatisticComponent],
    exports: [
        StatisticComponent
    ],
    imports: [
        CommonModule,
        StatisticRoutingModule,
        ReactiveFormsModule
    ]
})
export class StatisticModule { }
