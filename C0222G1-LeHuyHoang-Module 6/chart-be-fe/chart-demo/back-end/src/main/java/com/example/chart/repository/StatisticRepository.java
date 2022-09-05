package com.example.chart.repository;

import com.example.chart.dto.StatisticByComputer;
import com.example.chart.dto.StatisticByMonth;
import com.example.chart.model.Task_1;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatisticRepository extends JpaRepository<Task_1, Integer> {
    @Query(nativeQuery = true, value = "select sum(hour((timediff(start_time, end_time)))) as hour," +
            "computer_id as computer from task_1" +
            " where (start_time > date(:startTime)) and (end_time < date(:endTime))" +
            " group by computer_id")
    List<StatisticByComputer> getStatisticByComputer(String startTime, String endTime);

    @Query(nativeQuery = true,
            value = "select concat(month(start_time),'/', year(start_time)) as month," +
                    " sum(total_prices) as service," +
                    " sum(fee) as computer," +
                    " (sum(total_prices) + sum(fee)) as total \n" +
                    "from task_1 join task_2 on task_1.id = task_2.id_task_1" +
                    " where (start_time > date(:startDate)) and (end_time < date(:endDate))" +
                    " group by month;")
    List<StatisticByMonth> getStatisticByMonth(String startDate, String endDate);
}
