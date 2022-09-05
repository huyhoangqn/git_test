package com.example.chart.model;

import javax.persistence.*;

@Entity
public class Task_2 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Double totalPrices;
    private Double fee;
    @OneToOne
    @JoinColumn(name = "id_task_1", referencedColumnName = "id")
    private Task_1 task_1;
}
