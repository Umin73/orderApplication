package com.study.orderApplication.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "item_name")
    private String itemName;
    @Column(name = "item_code")
    private String itemCode;
    @Column(name = "item_category")
    private String itemCategory;
    @Column(name = "item_price")
    private Integer itemPrice;
    @Column(name = "item_recommend")
    private Integer itemRecommend;
    @Column(name = "item_new")
    private Integer itemNew;
    @Column(name = "item_image_url")
    private String itemImageUrl;
    @Column(name = "item_description")
    private String itemDescription;
    @Column(name = "item_update_datetime")
    private Timestamp itemUpdateDateTime;
}
