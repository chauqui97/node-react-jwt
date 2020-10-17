create database todo_db;

--\c into todo_db

create table todo(
    id serial primary key,
    description varchar(255) 
);