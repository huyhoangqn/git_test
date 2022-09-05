package com.example.chart.service;

import com.example.chart.dto.StatisticByComputer;
import com.example.chart.dto.StatisticByMonth;
import com.example.chart.repository.StatisticRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StatisticServiceImpl implements StatisticService {
    @Autowired
    StatisticRepository statisticRepository;

    @Override
    public List<StatisticByComputer> getStatisticByComputer(String startDate, String endDate) {
        return statisticRepository.getStatisticByComputer(startDate, endDate);
    }
    @Override
    public List<StatisticByMonth> getStatisticByMonth(String startDate, String endDate) {
        return statisticRepository.getStatisticByMonth(startDate, endDate);
    }
}
