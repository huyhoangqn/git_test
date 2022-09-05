package com.example.chart.controller;

import com.example.chart.dto.StatisticByComputer;
import com.example.chart.dto.StatisticByMonth;
import com.example.chart.service.StatisticService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("statistic")
@CrossOrigin(origins = "http://localhost:4200")
public class StatisticController {
    @Autowired
    StatisticService statisticService;

    @GetMapping("/by-computer/{startTime}/{endTime}")
    public ResponseEntity<List<StatisticByComputer>> findStatisticByComputer(@PathVariable String startTime, @PathVariable String endTime) {
        if (LocalDate.parse(startTime).plusDays(1).isAfter(LocalDate.parse(endTime))) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<StatisticByComputer> statisticByComputerList = statisticService.getStatisticByComputer(startTime, endTime);

        if (statisticByComputerList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(statisticByComputerList, HttpStatus.OK);
    }

    @GetMapping("by-month/{startTime}/{endTime}")
    public ResponseEntity<List<StatisticByMonth>> findStatisticByMonth(@PathVariable String startTime, @PathVariable String endTime) {
        if (LocalDate.parse(startTime).plusDays(1).isAfter(LocalDate.parse(endTime))) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<StatisticByMonth> statisticByMonthList = statisticService.getStatisticByMonth(startTime, endTime);
        if (statisticByMonthList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(statisticByMonthList, HttpStatus.OK);
    }
}
