package com.xu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * @author ：admin
 * @date ：Created in 2020/10/23 11:30
 * @description：
 */
@SpringBootApplication
@EnableEurekaServer
public class EurekaSeviceApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaSeviceApplication.class,args);
    }
}
