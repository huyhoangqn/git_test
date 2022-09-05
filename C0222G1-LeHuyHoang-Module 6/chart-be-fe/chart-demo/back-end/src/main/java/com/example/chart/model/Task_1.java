package com.example.chart.model;

import javax.persistence.*;

@Entity
public class Task_1 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String computerId;
    private String startTime;
    private String endTime;
    @OneToOne(mappedBy = "task_1")
    private Task_2 task_2;
}
