package com.xu.personal;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author ：admin
 * @date ：Created in 2020/10/23 14:17
 * @description：
 */
@SpringBootApplication
@MapperScan("com.xu.personal.mapper")
public class PersonalCenterApplication {
    public static void main(String[] args) {
        SpringApplication.run(PersonalCenterApplication.class,args);
    }
}
