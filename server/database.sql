create database todo_db;

--\c into todo_db

create table todo(
    id serial primary key,
    description varchar(255) 
);

create table users(
    id uuid primary key default uuid_generate_v4(),
    uname varchar(255) not null,
    uemail varchar(255) not null,
    upassword varchar(255) not null
);

insert into users(uname, uemail, upassword) values ("qui","chauqui97@gmail.com", "123123");