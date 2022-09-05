package com.example.chart.service;

import com.example.chart.dto.StatisticByComputer;
import com.example.chart.dto.StatisticByMonth;

import java.util.List;

public interface StatisticService {
    List<StatisticByComputer> getStatisticByComputer(String startDate, String endDate);

    List<StatisticByMonth> getStatisticByMonth(String startDate, String endDate);
}
