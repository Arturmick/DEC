drop database  if exists doctrine_dwes;

create database doctrine_dwes;
use doctrine_dwes;

CREATE TABLE Equipo (
  Id INTEGER AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(50),
  Socios INTEGER,
  Fundacion INTEGER,
  Ciudad VARCHAR(10))
/*TYPE=InnoDB*/
;


CREATE TABLE Jugador (
  Id INTEGER,
  Nombre VARCHAR(50),
  Apellidos VARCHAR(50),
  Edad INTEGER,
  id_Equipo INTEGER);


/* EQUIPO */
INSERT INTO EQUIPO ( ID,Nombre,Socios,Fundacion,Ciudad)
VALUES (1,'Equipo1',1000,1901,'Ciudad1');
INSERT INTO EQUIPO ( ID,Nombre,Socios,Fundacion,Ciudad)
VALUES (2,'Equipo2',2000,1902,'Ciudad2');
INSERT INTO EQUIPO (ID,Nombre,Socios,Fundacion,Ciudad)
VALUES (3,'Equipo3',3000,1903,'Ciudad3');
INSERT INTO EQUIPO ( ID,Nombre,Socios,Fundacion,Ciudad)
VALUES (4,'Equipo4',4000,1904,'Ciudad4');




/* JUGADOR */
INSERT INTO JUGADOR (Id,Nombre,Apellidos,Edad,id_Equipo)
VALUES (1,'NombreJugador1','ApellidosJugador1',21,1);
INSERT INTO JUGADOR (Id,Nombre,Apellidos,Edad,id_Equipo)
VALUES (2,'NombreJugador2','ApellidosJugador2',22,1);
INSERT INTO JUGADOR (Id,Nombre,Apellidos,Edad,id_Equipo)
VALUES (3,'NombreJugador3','ApellidosJugador3',23,2);
INSERT INTO JUGADOR (Id,Nombre,Apellidos,Edad,id_Equipo)
VALUES (4,'NombreJugador4','ApellidosJugador4',24,3);
INSERT INTO JUGADOR (Id,Nombre,Apellidos,Edad,id_Equipo)
VALUES (5,'NombreJugador5','ApellidosJugador5',25,3);
INSERT INTO JUGADOR (Id,Nombre,Apellidos,Edad,id_Equipo)
VALUES (6,'NombreJugador6','ApellidosJugador6',26,4);