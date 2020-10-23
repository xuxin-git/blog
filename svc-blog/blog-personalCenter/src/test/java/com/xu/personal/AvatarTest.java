package com.xu.personal;

import com.xu.personal.entity.User;
import com.xu.personal.mapper.UserMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.swing.*;
import javax.swing.filechooser.FileSystemView;
import java.io.*;
import java.sql.Blob;
import java.util.List;

/**
 * @author ：admin
 * @date ：Created in 2020/10/23 14:08
 * @description：
 */
@SpringBootTest
public class AvatarTest {
    @Autowired
    UserMapper userMapper;

    @Test
    void Tets01() throws IOException {

        List<User> users = userMapper.selectList(null);
        System.out.println(users);
        User user = users.get(0);

        //从本地选取文件
//        int result = 0;
//        String path = null;
//        JFileChooser fileChooser = new JFileChooser();
//        FileSystemView fsv = FileSystemView.getFileSystemView();
//        System.out.println(fsv.getHomeDirectory());                //得到桌面路径
//        fileChooser.setCurrentDirectory(fsv.getHomeDirectory());
//        fileChooser.setDialogTitle("请选择要上传的文件...");
//        fileChooser.setApproveButtonText("确定");
//        fileChooser.setFileSelectionMode(JFileChooser.FILES_ONLY);
//        result = fileChooser.showOpenDialog(null);
//        if (JFileChooser.APPROVE_OPTION == result) {
//            path=fileChooser.getSelectedFile().getPath();
//            System.out.println("path: "+path);
//        }

        String path = "C:\\Users\\admin\\Pictures\\u=2582562300,804642415&fm=11&gp=0.jpg";
        File file = new File(path);
        FileInputStream fileInputStream = new FileInputStream(file);
        FileOutputStream outputStream = new FileOutputStream(".\\src\\main\\resources\\3.jpg",false);

        byte[] buf = new byte[1024];
        byte[] bytes =  new byte[fileInputStream.available()];
        int read = fileInputStream.read(bytes);
        System.out.println(read);
        fileInputStream.read(bytes,0,fileInputStream.available());
//        outputStream.write(bytes);


//        System.out.println(buf);
//        user.setAvatar(buf);
        user.setAvatar(bytes);
        user.setName("mm22m");
        userMapper.update(user,null);




    }
    @Test
    void Test02() throws IOException {
        List<User> users = userMapper.selectList(null);
        User user = users.get(0);
        System.out.println(user.getAvatar());
        byte[] bytes = user.getAvatar();

        FileOutputStream outputStream = new FileOutputStream(".\\src\\main\\resources\\4.jpg",false);
        outputStream.write(bytes);
    }
    @Test
    void Test03() throws IOException {

        String path = "C:\\Users\\admin\\Pictures\\u=2582562300,804642415&fm=11&gp=0.jpg";
        File file = new File(path);
        FileInputStream fileInputStream = new FileInputStream(file);
        FileOutputStream outputStream = new FileOutputStream(".\\src\\main\\resources\\3.jpg",false);

        byte[] buf = new byte[1024];
        byte[] bytes =  new byte[fileInputStream.available()];
        int read = fileInputStream.read(bytes);
        System.out.println(read);
        fileInputStream.read(bytes,0,fileInputStream.available());
        outputStream.write(bytes);
    }

    @Test
    void Test04() throws IOException {

        String path = "C:\\Users\\admin\\Pictures\\u=2582562300,804642415&fm=11&gp=0.jpg";
        File file = new File(path);
        FileInputStream fileInputStream = new FileInputStream(file);
        FileOutputStream outputStream = new FileOutputStream(".\\src\\main\\resources\\4.jpg",false);

//        byte[] buf = new byte[1024];
        byte[] bytes =  new byte[fileInputStream.available()];
//        int read = fileInputStream.read(bytes);
//        System.out.println(read);
//        fileInputStream.read(bytes,0,fileInputStream.available());
//        outputStream.write(bytes);
        int i = 0;
        int l = 1024;
        while(fileInputStream.read(bytes,i,l)!=-1){
            i=i+l;
            if(i+l>bytes.length)
                break;
        }
        outputStream.write(bytes);
    }


    @Test
    void Test05() throws IOException {

        String path = "C:\\Users\\admin\\Desktop\\ttt.txt";
        File file = new File(path);
        FileInputStream fileInputStream = new FileInputStream(file);
        FileOutputStream outputStream = new FileOutputStream(".\\src\\main\\resources\\ttt.txt",false);

        byte[] bytes =  new byte[fileInputStream.available()];

        int i = 0;
        int l = 2;
        while(fileInputStream.read(bytes,i,l)!=-1){
            i=i+l;
            if(i+l>bytes.length){
                fileInputStream.read(bytes,i,l-i);
            }

        }
        outputStream.write(bytes);
    }
}
