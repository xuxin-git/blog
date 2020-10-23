package com.xu.personal.entity;

import java.time.LocalDateTime;
import java.sql.Blob;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 
 * </p>
 *
 * @author piao
 * @since 2020-10-23
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    private String name;

    private String password;

    /**
     * 用户头像
     */
    private byte[] avatar;

    /**
     * 用户类型
     */
    private Integer type;

    /**
     * 用户注册时间
     */
    private LocalDateTime createTime;

    private String email;


}
