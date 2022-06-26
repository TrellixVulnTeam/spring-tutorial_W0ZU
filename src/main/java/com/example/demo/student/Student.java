package com.example.demo.student;

import lombok.*;

/**
 * Use lombok annotations to create constructors, getter, setter
 * to avoid having a lot of boilerplate codes generated by IntelliJ
 *
 * Student Model
 */
@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private Long id;
    private String name;
    private String email;
    private Gender gender;

//Use Constructor, getter and setter to Student Model without lombok

//    public Student(Long id, String name, String email, Gender gender) {
//        this.id = id;
//        this.name = name;
//        this.email = email;
//        this.gender = gender;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public void setGender(Gender gender) {
//        this.gender = gender;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public Gender getGender() {
//        return gender;
//    }
}
