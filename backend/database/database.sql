create database taskapi;
\c taskapi;

create table task(
  id serial primary key,
  titulo varchar(250) not null,
  descripcion varchar(250)
);

insert into task(titulo, descripcion) values('Tarea 1', 'Descripcion 1');
