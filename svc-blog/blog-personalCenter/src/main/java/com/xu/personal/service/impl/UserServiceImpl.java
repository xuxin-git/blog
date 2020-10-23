package com.xu.personal.service.impl;

import com.xu.personal.entity.User;
import com.xu.personal.mapper.UserMapper;
import com.xu.personal.service.UserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author piao
 * @since 2020-10-23
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

}
