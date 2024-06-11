import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";

interface Player {
  fullName: string;
  overall: number;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent {
  constructor(private userService: UserService) {
  }
  myTeamPlayerName: string = '';
  tacticsResponse: string = '';  // Property to hold the response
  opponentTeamPlayerName: string = '';
  words = [];
  players: Player[] = [
    { fullName: 'Lionel Messi', overall: 91, pace: 81, shooting: 89, passing: 90, dribbling: 94, defending: 34, physical: 64 },
    { fullName: 'Karim Benzema', overall: 91, pace: 80, shooting: 88, passing: 83, dribbling: 87, defending: 39, physical: 78 },
    { fullName: 'Robert Lewandowski', overall: 91, pace: 75, shooting: 91, passing: 79, dribbling: 86, defending: 44, physical: 83 },
    { fullName: 'Kevin De Bruyne', overall: 91, pace: 74, shooting: 88, passing: 93, dribbling: 87, defending: 64, physical: 77 },
    { fullName: 'Kylian Mbappé', overall: 91, pace: 97, shooting: 89, passing: 80, dribbling: 92, defending: 36, physical: 76 },
    { fullName: 'Mohamed Salah', overall: 90, pace: 90, shooting: 89, passing: 82, dribbling: 90, defending: 45, physical: 75 },
    { fullName: 'Thibaut Courtois', overall: 90, pace: 84, shooting: 89, passing: 75, dribbling: 90, defending: 46, physical: 89 },
    { fullName: 'Manuel Neuer', overall: 90, pace: 87, shooting: 88, passing: 91, dribbling: 88, defending: 56, physical: 91 },
    { fullName: 'C. Ronaldo dos Santos Aveiro', overall: 90, pace: 81, shooting: 92, passing: 78, dribbling: 85, defending: 34, physical: 75 },
    { fullName: 'Virgil van Dijk', overall: 90, pace: 81, shooting: 60, passing: 71, dribbling: 72, defending: 91, physical: 86 },
    { fullName: 'Harry Kane', overall: 89, pace: 68, shooting: 91, passing: 83, dribbling: 82, defending: 47, physical: 82 },
    { fullName: 'Neymar da Silva Santos Jr.', overall: 89, pace: 87, shooting: 83, passing: 85, dribbling: 93, defending: 37, physical: 61 },
    { fullName: 'Heung Min Son', overall: 89, pace: 88, shooting: 89, passing: 82, dribbling: 86, defending: 42, physical: 69 },
    { fullName: 'Carlos Henrique Venancio Casimiro', overall: 89, pace: 63, shooting: 73, passing: 75, dribbling: 72, defending: 87, physical: 90 },
    { fullName: 'Jan Oblak', overall: 89, pace: 86, shooting: 90, passing: 78, dribbling: 89, defending: 49, physical: 87 },
    { fullName: 'Sadio Mané', overall: 89, pace: 90, shooting: 83, passing: 80, dribbling: 88, defending: 44, physical: 77 },
    { fullName: 'Ederson Santana de Moraes', overall: 89, pace: 87, shooting: 82, passing: 93, dribbling: 88, defending: 64, physical: 88 },
    { fullName: 'Joshua Kimmich', overall: 89, pace: 68, shooting: 72, passing: 87, dribbling: 84, defending: 83, physical: 79 },
    { fullName: 'Alisson Ramses Becker', overall: 89, pace: 86, shooting: 85, passing: 85, dribbling: 89, defending: 54, physical: 90 },
    { fullName: 'N\'Golo Kanté', overall: 89, pace: 72, shooting: 66, passing: 74, dribbling: 81, defending: 87, physical: 82 },
    { fullName: 'Rúben Santos Gato Alves Dias', overall: 88, pace: 63, shooting: 39, passing: 66, dribbling: 68, defending: 88, physical: 88 },
    { fullName: 'Erling Haaland', overall: 88, pace: 89, shooting: 91, passing: 65, dribbling: 80, defending: 49, physical: 87 },
    { fullName: 'Gianluigi Donnarumma', overall: 88, pace: 90, shooting: 83, passing: 79, dribbling: 89, defending: 52, physical: 85 },
    { fullName: 'Bernardo Mota Carvalho e Silva', overall: 88, pace: 77, shooting: 78, passing: 84, dribbling: 92, defending: 61, physical: 68 },
    { fullName: 'João Pedro Cavaco Cancelo', overall: 88, pace: 85, shooting: 73, passing: 85, dribbling: 85, defending: 81, physical: 73 },
    { fullName: 'Marcos Aoás Corrêa', overall: 88, pace: 79, shooting: 56, passing: 75, dribbling: 74, defending: 89, physical: 80 },
    { fullName: 'Keylor Navas', overall: 88, pace: 89, shooting: 84, passing: 75, dribbling: 89, defending: 54, physical: 87 },
    { fullName: 'Marc-André ter Stegen', overall: 88, pace: 86, shooting: 85, passing: 87, dribbling: 90, defending: 47, physical: 85 },
    { fullName: 'Toni Kroos', overall: 88, pace: 53, shooting: 81, passing: 90, dribbling: 81, defending: 71, physical: 68 },
    { fullName: 'Luka Modrić', overall: 88, pace: 73, shooting: 76, passing: 89, dribbling: 88, defending: 72, physical: 66 },
    { fullName: 'Antonio Rüdiger', overall: 87, pace: 82, shooting: 53, passing: 71, dribbling: 67, defending: 86, physical: 85 },
    { fullName: 'Rodrigo Hernández Cascante', overall: 87, pace: 58, shooting: 72, passing: 78, dribbling: 79, defending: 83, physical: 84 },
    { fullName: 'Fábio Henrique Tavares', overall: 87, pace: 66, shooting: 69, passing: 78, dribbling: 77, defending: 86, physical: 83 },
    { fullName: 'Hugo Lloris', overall: 87, pace: 88, shooting: 83, passing: 74, dribbling: 88, defending: 61, physical: 84 },
    { fullName: 'Thomas Müller', overall: 87, pace: 69, shooting: 84, passing: 83, dribbling: 80, defending: 56, physical: 71 },
    { fullName: 'David De Gea Quintana', overall: 87, pace: 88, shooting: 80, passing: 76, dribbling: 89, defending: 51, physical: 84 },
    { fullName: 'Marco Verratti', overall: 87, pace: 60, shooting: 61, passing: 87, dribbling: 91, defending: 79, physical: 66 },
    { fullName: 'Mike Maignan', overall: 87, pace: 85, shooting: 82, passing: 85, dribbling: 89, defending: 51, physical: 85 },
    { fullName: 'Trent Alexander-Arnold', overall: 87, pace: 76, shooting: 69, passing: 89, dribbling: 80, defending: 80, physical: 73 },
    { fullName: 'Andrew Robertson', overall: 87, pace: 80, shooting: 61, passing: 81, dribbling: 81, defending: 82, physical: 76 },
    { fullName: 'Kalidou Koulibaly', overall: 87, pace: 82, shooting: 33, passing: 59, dribbling: 68, defending: 88, physical: 85 },
    { fullName: 'Leon Goretzka', overall: 87, pace: 78, shooting: 82, passing: 82, dribbling: 83, defending: 81, physical: 86 },
    { fullName: 'Frenkie de Jong', overall: 87, pace: 82, shooting: 69, passing: 86, dribbling: 87, defending: 77, physical: 78 },
    { fullName: 'Thiago Alcântara', overall: 86, pace: 61, shooting: 72, passing: 87, dribbling: 90, defending: 72, physical: 69 },
    { fullName: 'Ciro Immobile', overall: 86, pace: 85, shooting: 87, passing: 68, dribbling: 80, defending: 39, physical: 75 },
    { fullName: 'Romelu Lukaku', overall: 86, pace: 80, shooting: 85, passing: 75, dribbling: 77, defending: 38, physical: 82 },
    { fullName: 'David Alaba', overall: 86, pace: 79, shooting: 71, passing: 83, dribbling: 80, defending: 85, physical: 77 },
    { fullName: 'Raheem Sterling', overall: 86, pace: 90, shooting: 80, passing: 78, dribbling: 86, defending: 45, physical: 67 },
    { fullName: 'Riyad Mahrez', overall: 86, pace: 80, shooting: 83, passing: 81, dribbling: 90, defending: 38, physical: 60 },
    { fullName: 'Paulo Dybala', overall: 86, pace: 80, shooting: 85, passing: 85, dribbling: 90, defending: 40, physical: 59 },
    { fullName: 'Thiago Emiliano da Silva', overall: 86, pace: 49, shooting: 54, passing: 73, dribbling: 72, defending: 87, physical: 76 },
    { fullName: 'Wojciech Szczęsny', overall: 86, pace: 86, shooting: 81, passing: 73, dribbling: 87, defending: 49, physical: 86 },
    { fullName: 'Kevin Trapp', overall: 86, pace: 84, shooting: 82, passing: 79, dribbling: 87, defending: 46, physical: 85 },
    { fullName: 'Bruno Miguel Borges Fernandes', overall: 86, pace: 72, shooting: 86, passing: 88, dribbling: 81, defending: 67, physical: 76 },
    { fullName: 'Daniel Parejo Muñoz', overall: 86, pace: 50, shooting: 83, passing: 90, dribbling: 80, defending: 71, physical: 68 },
    { fullName: 'Aymeric Laporte', overall: 86, pace: 61, shooting: 50, passing: 72, dribbling: 69, defending: 86, physical: 79 },
    { fullName: 'Kingsley Coman', overall: 86, pace: 92, shooting: 77, passing: 79, dribbling: 87, defending: 30, physical: 61 },
    { fullName: 'Marcelo Brozović', overall: 86, pace: 69, shooting: 74, passing: 81, dribbling: 81, defending: 81, physical: 78 },
    { fullName: 'Nicolò Barella', overall: 86, pace: 79, shooting: 76, passing: 83, dribbling: 84, defending: 77, physical: 81 },
    { fullName: 'Lautaro Martínez', overall: 86, pace: 83, shooting: 83, passing: 72, dribbling: 85, defending: 48, physical: 84 },
    { fullName: 'Milan Škriniar', overall: 86, pace: 78, shooting: 41, passing: 57, dribbling: 69, defending: 88, physical: 86 },
    { fullName: 'Christopher Nkunku', overall: 86, pace: 88, shooting: 81, passing: 83, dribbling: 88, defending: 65, physical: 66 },
    { fullName: 'Édouard Mendy', overall: 86, pace: 84, shooting: 82, passing: 81, dribbling: 88, defending: 34, physical: 85 },
    { fullName: 'Vinícius José de Oliveira Júnior', overall: 86, pace: 95, shooting: 79, passing: 74, dribbling: 90, defending: 29, physical: 67 },
    { fullName: 'Sergej Milinković-Savić', overall: 86, pace: 68, shooting: 80, passing: 82, dribbling: 82, defending: 79, physical: 86 },
    { fullName: 'Niklas Süle', overall: 85, pace: 71, shooting: 48, passing: 66, dribbling: 59, defending: 85, physical: 83 },
    { fullName: 'Nabil Fekir', overall: 85, pace: 83, shooting: 82, passing: 82, dribbling: 87, defending: 38, physical: 80 },
    { fullName: 'Serge Gnabry', overall: 85, pace: 82, shooting: 84, passing: 79, dribbling: 85, defending: 43, physical: 69 },
    { fullName: 'İlkay Gündoğan', overall: 85, pace: 64, shooting: 80, passing: 85, dribbling: 85, defending: 72, physical: 72 },
    { fullName: 'Kyle Walker', overall: 85, pace: 91, shooting: 63, passing: 77, dribbling: 78, defending: 80, physical: 82 },
    { fullName: 'Pierre-Emerick Aubameyang', overall: 85, pace: 87, shooting: 84, passing: 74, dribbling: 79, defending: 36, physical: 68 },
    { fullName: 'Jordi Alba Ramos', overall: 85, pace: 84, shooting: 70, passing: 82, dribbling: 82, defending: 77, physical: 70 },
    { fullName: 'Sergio Busquets Burgos', overall: 85, pace: 42, shooting: 62, passing: 79, dribbling: 79, defending: 82, physical: 73 },
    { fullName: 'Iago Aspas Juncal', overall: 85, pace: 82, shooting: 85, passing: 79, dribbling: 86, defending: 35, physical: 63 },
    { fullName: 'Paul Pogba', overall: 85, pace: 67, shooting: 80, passing: 85, dribbling: 85, defending: 62, physical: 80 },
    { fullName: 'Memphis Depay', overall: 85, pace: 83, shooting: 84, passing: 82, dribbling: 86, defending: 30, physical: 79 },
    { fullName: 'Luiz Frello Filho Jorge', overall: 85, pace: 54, shooting: 67, passing: 86, dribbling: 81, defending: 73, physical: 73 },
    { fullName: 'Marcos Acuña', overall: 85, pace: 76, shooting: 74, passing: 83, dribbling: 87, defending: 80, physical: 83 },
    { fullName: 'Gerard Moreno Balagueró', overall: 85, pace: 78, shooting: 86, passing: 77, dribbling: 83, defending: 46, physical: 72 },
    { fullName: 'Yannick Carrasco', overall: 85, pace: 89, shooting: 82, passing: 80, dribbling: 87, defending: 53, physical: 67 },
    { fullName: 'Filip Kostić', overall: 85, pace: 84, shooting: 78, passing: 82, dribbling: 82, defending: 68, physical: 80 },
    { fullName: 'Jamie Vardy', overall: 85, pace: 84, shooting: 84, passing: 70, dribbling: 79, defending: 52, physical: 72 },
    { fullName: 'Pedro González López', overall: 85, pace: 79, shooting: 67, passing: 81, dribbling: 87, defending: 68, physical: 73 },
    { fullName: 'Phil Foden', overall: 85, pace: 82, shooting: 78, passing: 81, dribbling: 88, defending: 56, physical: 60 },
    { fullName: 'Matthijs de Ligt', overall: 85, pace: 75, shooting: 59, passing: 61, dribbling: 69, defending: 84, physical: 87 },
    { fullName: 'Patrik Schick', overall: 85, pace: 78, shooting: 83, passing: 71, dribbling: 83, defending: 36, physical: 76 },
    { fullName: 'Theo Hernández', overall: 85, pace: 93, shooting: 72, passing: 76, dribbling: 81, defending: 78, physical: 83 },
    { fullName: 'Diogo José Teixeira da Silva', overall: 85, pace: 85, shooting: 83, passing: 75, dribbling: 85, defending: 57, physical: 77 },
    { fullName: 'Péter Gulácsi', overall: 85, pace: 85, shooting: 84, passing: 76, dribbling: 85, defending: 43, physical: 83 },
    { fullName: 'Yann Sommer', overall: 85, pace: 78, shooting: 81, passing: 82, dribbling: 90, defending: 50, physical: 86 },
    { fullName: 'Marco Reus', overall: 85, pace: 70, shooting: 84, passing: 84, dribbling: 85, defending: 53, physical: 65 },
    { fullName: 'Lucas Hernández', overall: 84, pace: 77, shooting: 54, passing: 70, dribbling: 71, defending: 84, physical: 80 },
    { fullName: 'Sergio Ramos García', overall: 84, pace: 61, shooting: 69, passing: 73, dribbling: 70, defending: 83, physical: 77 },
    { fullName: 'Alejandro Gómez', overall: 84, pace: 86, shooting: 78, passing: 83, dribbling: 85, defending: 39, physical: 54 },
    { fullName: 'Samir Handanovič', overall: 84, pace: 80, shooting: 80, passing: 65, dribbling: 85, defending: 43, physical: 90 },
    { fullName: 'Dries Mertens', overall: 84, pace: 78, shooting: 82, passing: 80, dribbling: 87, defending: 34, physical: 49 },
    { fullName: 'Luis Suárez', overall: 84, pace: 70, shooting: 86, passing: 78, dribbling: 78, defending: 46, physical: 81 },
    { fullName: 'Dušan Tadić', overall: 84, pace: 68, shooting: 81, passing: 86, dribbling: 84, defending: 43, physical: 77 },
    { fullName: 'Domenico Berardi', overall: 84, pace: 82, shooting: 81, passing: 81, dribbling: 86, defending: 36, physical: 71 },
    { fullName: 'Thomas Partey', overall: 84, pace: 65, shooting: 71, passing: 81, dribbling: 80, defending: 80, physical: 83 },
    { fullName: 'Yassine Bounou', overall: 84, pace: 84, shooting: 81, passing: 76, dribbling: 86, defending: 36, physical: 84 },
    { fullName: 'Hakan Çalhanoğlu', overall: 84, pace: 67, shooting: 80, passing: 85, dribbling: 86, defending: 68, physical: 64 },
    { fullName: 'Mateo Kovačić', overall: 84, pace: 70, shooting: 69, passing: 83, dribbling: 88, defending: 71, physical: 71 },
    { fullName: 'Jack Grealish', overall: 84, pace: 76, shooting: 76, passing: 83, dribbling: 87, defending: 46, physical: 69 },
    { fullName: 'Daniel Carvajal Ramos', overall: 84, pace: 82, shooting: 54, passing: 77, dribbling: 80, defending: 78, physical: 79 },
    { fullName: 'Stefan Savić', overall: 84, pace: 64, shooting: 35, passing: 58, dribbling: 58, defending: 87, physical: 80 },
    { fullName: 'Emiliano Martínez', overall: 84, pace: 85, shooting: 83, passing: 82, dribbling: 85, defending: 58, physical: 83 },
    { fullName: 'Raphaël Varane', overall: 84, pace: 81, shooting: 49, passing: 64, dribbling: 66, defending: 85, physical: 80 },
    { fullName: 'Wissam Ben Yedder', overall: 84, pace: 81, shooting: 84, passing: 78, dribbling: 88, defending: 39, physical: 68 },
    { fullName: 'Lorenzo Insigne', overall: 84, pace: 84, shooting: 78, passing: 84, dribbling: 89, defending: 36, physical: 45 },
    { fullName: 'Mats Hummels', overall: 84, pace: 53, shooting: 59, passing: 76, dribbling: 72, defending: 87, physical: 78 },
    { fullName: 'Stefan de Vrij', overall: 84, pace: 68, shooting: 41, passing: 65, dribbling: 69, defending: 87, physical: 79 },
    { fullName: 'Joel Matip', overall: 84, pace: 61, shooting: 46, passing: 69, dribbling: 71, defending: 87, physical: 78 },
    { fullName: 'Koen Casteels', overall: 84, pace: 84, shooting: 82, passing: 79, dribbling: 86, defending: 45, physical: 84 },
    { fullName: 'Sergio Canales Madrazo', overall: 84, pace: 83, shooting: 79, passing: 85, dribbling: 82, defending: 68, physical: 71 },
    { fullName: 'Iker Muniain Goñi', overall: 84, pace: 81, shooting: 77, passing: 82, dribbling: 87, defending: 51, physical: 61 },
    { fullName: 'Kieran Trippier', overall: 84, pace: 70, shooting: 64, passing: 82, dribbling: 77, defending: 80, physical: 72 },
    { fullName: 'Leonardo Bonucci', overall: 84, pace: 54, shooting: 59, passing: 69, dribbling: 71, defending: 85, physical: 78 },
    { fullName: 'Ángel Di María', overall: 84, pace: 79, shooting: 79, passing: 84, dribbling: 87, defending: 48, physical: 67 },
    { fullName: 'Eden Hazard', overall: 84, pace: 83, shooting: 80, passing: 82, dribbling: 87, defending: 35, physical: 63 },
    { fullName: 'Ivan Perišić', overall: 84, pace: 78, shooting: 81, passing: 79, dribbling: 82, defending: 74, physical: 78 },
    { fullName: 'Edin Džeko', overall: 84, pace: 63, shooting: 84, passing: 71, dribbling: 77, defending: 45, physical: 75 },
    { fullName: 'Giorgio Chiellini', overall: 84, pace: 65, shooting: 46, passing: 60, dribbling: 58, defending: 85, physical: 83 },
    { fullName: 'Rodrigo Javier De Paul', overall: 84, pace: 78, shooting: 77, passing: 83, dribbling: 82, defending: 75, physical: 81 },
    { fullName: 'Jude Bellingham', overall: 84, pace: 75, shooting: 75, passing: 78, dribbling: 84, defending: 77, physical: 80 },
    { fullName: 'Federico Chiesa', overall: 84, pace: 91, shooting: 81, passing: 76, dribbling: 86, defending: 48, physical: 73 },
    { fullName: 'Moussa Diaby', overall: 84, pace: 93, shooting: 73, passing: 75, dribbling: 87, defending: 42, physical: 59 },
    { fullName: 'Jamie Tartt', overall: 84, pace: 83, shooting: 87, passing: 80, dribbling: 85, defending: 29, physical: 74 },
    { fullName: 'Rafael da Conceição Leão', overall: 84, pace: 91, shooting: 77, passing: 73, dribbling: 86, defending: 27, physical: 74 },
    { fullName: 'Jules Koundé', overall: 84, pace: 84, shooting: 45, passing: 64, dribbling: 74, defending: 85, physical: 78 },
    { fullName: 'Youri Tielemans', overall: 84, pace: 56, shooting: 80, passing: 86, dribbling: 81, defending: 70, physical: 73 },
    { fullName: 'Sandro Tonali', overall: 84, pace: 81, shooting: 73, passing: 81, dribbling: 79, defending: 79, physical: 82 },
    { fullName: 'Luis Díaz', overall: 84, pace: 91, shooting: 80, passing: 75, dribbling: 87, defending: 34, physical: 73 },
    { fullName: 'Éder Gabriel Militão', overall: 84, pace: 86, shooting: 50, passing: 70, dribbling: 72, defending: 85, physical: 82 },
    { fullName: 'Federico Valverde', overall: 84, pace: 87, shooting: 74, passing: 80, dribbling: 79, defending: 78, physical: 80 },
    { fullName: 'Leroy Sané', overall: 84, pace: 88, shooting: 81, passing: 80, dribbling: 85, defending: 38, physical: 66 },
    { fullName: 'Reece James', overall: 84, pace: 81, shooting: 70, passing: 82, dribbling: 82, defending: 80, physical: 82 },
    { fullName: 'Alessandro Bastoni', overall: 84, pace: 73, shooting: 35, passing: 69, dribbling: 71, defending: 86, physical: 82 },
    { fullName: 'Kai Havertz', overall: 84, pace: 81, shooting: 79, passing: 79, dribbling: 84, defending: 45, physical: 66 },
    { fullName: 'João Félix Sequeira', overall: 84, pace: 83, shooting: 80, passing: 81, dribbling: 88, defending: 40, physical: 67 },
    { fullName: 'Achraf Hakimi', overall: 84, pace: 92, shooting: 75, passing: 79, dribbling: 80, defending: 75, physical: 78 },
    { fullName: 'Alphonso Davies', overall: 84, pace: 94, shooting: 66, passing: 77, dribbling: 85, defending: 76, physical: 77 },
    { fullName: 'Declan Rice', overall: 84, pace: 71, shooting: 64, passing: 74, dribbling: 76, defending: 82, physical: 83 },
    { fullName: 'Mason Mount', overall: 84, pace: 74, shooting: 81, passing: 85, dribbling: 82, defending: 55, physical: 67 },
    { fullName: 'Jadon Sancho', overall: 84, pace: 81, shooting: 74, passing: 81, dribbling: 89, defending: 36, physical: 59 },
    { fullName: 'Fikayo Tomori', overall: 84, pace: 86, shooting: 40, passing: 60, dribbling: 66, defending: 86, physical: 81 },
    { fullName: 'Franck Yannick Kessié', overall: 84, pace: 78, shooting: 76, passing: 74, dribbling: 79, defending: 82, physical: 87 },
    { fullName: 'Mikel Oyarzabal Ugarte', overall: 84, pace: 79, shooting: 83, passing: 80, dribbling: 83, defending: 41, physical: 62 },
    { fullName: 'Lorenzo Pellegrini', overall: 84, pace: 79, shooting: 77, passing: 83, dribbling: 84, defending: 74, physical: 78 },
    { fullName: 'Wilfred Ndidi', overall: 84, pace: 66, shooting: 62, passing: 68, dribbling: 73, defending: 85, physical: 83 },
    { fullName: 'Marcos Llorente Moreno', overall: 84, pace: 88, shooting: 79, passing: 81, dribbling: 82, defending: 78, physical: 81 },
    { fullName: 'Martin Ødegaard', overall: 84, pace: 76, shooting: 75, passing: 86, dribbling: 84, defending: 58, physical: 63 },
    { fullName: 'Dušan Vlahović', overall: 84, pace: 80, shooting: 85, passing: 66, dribbling: 78, defending: 28, physical: 79 },
    { fullName: 'Diego Carlos Santos Silva', overall: 83, pace: 76, shooting: 47, passing: 63, dribbling: 67, defending: 82, physical: 82 },
    { fullName: 'José Ángel Esmoris Tasende', overall: 83, pace: 78, shooting: 71, passing: 82, dribbling: 84, defending: 76, physical: 70 },
    { fullName: 'Ousmane Dembélé', overall: 83, pace: 93, shooting: 77, passing: 79, dribbling: 87, defending: 36, physical: 56 },
    { fullName: 'Marco Asensio Willemsen', overall: 83, pace: 82, shooting: 80, passing: 81, dribbling: 83, defending: 43, physical: 62 },
    { fullName: 'Rúben Diogo da Silva Neves', overall: 83, pace: 58, shooting: 74, passing: 86, dribbling: 77, defending: 76, physical: 73 },
    { fullName: 'Mikel Merino Zazón', overall: 83, pace: 73, shooting: 78, passing: 81, dribbling: 82, defending: 82, physical: 81 },
    { fullName: 'Konrad Laimer', overall: 83, pace: 84, shooting: 68, passing: 78, dribbling: 79, defending: 81, physical: 78 },
    { fullName: 'Presnel Kimpembe', overall: 83, pace: 80, shooting: 43, passing: 68, dribbling: 69, defending: 83, physical: 86 },
    { fullName: 'Fabián Ruiz Peña', overall: 83, pace: 61, shooting: 79, passing: 80, dribbling: 83, defending: 74, physical: 72 },
    { fullName: 'Ferland Mendy', overall: 83, pace: 92, shooting: 64, passing: 77, dribbling: 78, defending: 78, physical: 84 },
    { fullName: 'Ronaldo Jailson Cabrais Petri', overall: 83, pace: 88, shooting: 77, passing: 83, dribbling: 84, defending: 35, physical: 72 },
    { fullName: 'Gabriel Fernando de Jesus', overall: 83, pace: 84, shooting: 82, passing: 74, dribbling: 86, defending: 40, physical: 74 },
    { fullName: 'Unai Simón Mendibil', overall: 83, pace: 82, shooting: 79, passing: 77, dribbling: 85, defending: 49, physical: 85 },
    { fullName: 'Victor Osimhen', overall: 83, pace: 90, shooting: 82, passing: 65, dribbling: 78, defending: 40, physical: 81 },
    { fullName: 'Pierre-Emile Højbjerg', overall: 83, pace: 55, shooting: 73, passing: 77, dribbling: 77, defending: 80, physical: 82 },
    { fullName: 'Cristian Romero', overall: 83, pace: 73, shooting: 46, passing: 57, dribbling: 65, defending: 85, physical: 82 },
    { fullName: 'Raphael Dias Belloli', overall: 83, pace: 91, shooting: 79, passing: 77, dribbling: 85, defending: 50, physical: 73 },
    { fullName: 'James Maddison', overall: 82, pace: 73, shooting: 78, passing: 84, dribbling: 85, defending: 54, physical: 62 },
    { fullName: 'Gerónimo Rulli', overall: 82, pace: 82, shooting: 79, passing: 80, dribbling: 83, defending: 54, physical: 81 },
    { fullName: 'Andrej Kramarić', overall: 82, pace: 71, shooting: 80, passing: 79, dribbling: 85, defending: 30, physical: 72 },
    { fullName: 'Rafael A. Ferreira Silva', overall: 82, pace: 91, shooting: 73, passing: 75, dribbling: 86, defending: 50, physical: 52 },
    { fullName: 'Giovanni Di Lorenzo', overall: 82, pace: 85, shooting: 66, passing: 73, dribbling: 77, defending: 78, physical: 80 },
    { fullName: 'David Soria Solís', overall: 82, pace: 82, shooting: 81, passing: 73, dribbling: 83, defending: 43, physical: 81 },
    { fullName: 'Manuel Locatelli', overall: 82, pace: 63, shooting: 72, passing: 79, dribbling: 78, defending: 79, physical: 79 },
    { fullName: 'Robin Gosens', overall: 82, pace: 82, shooting: 75, passing: 74, dribbling: 79, defending: 77, physical: 80 },
    { fullName: 'Gonçalo Manuel Ganchinho Guedes', overall: 82, pace: 86, shooting: 83, passing: 74, dribbling: 83, defending: 38, physical: 70 },
    { fullName: 'Jonathan Tah', overall: 82, pace: 67, shooting: 37, passing: 59, dribbling: 61, defending: 83, physical: 85 },
    { fullName: 'Andreas Christensen', overall: 82, pace: 68, shooting: 32, passing: 66, dribbling: 70, defending: 84, physical: 74 },
    { fullName: 'Emre Can', overall: 82, pace: 79, shooting: 78, passing: 77, dribbling: 80, defending: 82, physical: 87 },
    { fullName: 'Anderson Souza Conceição', overall: 82, pace: 80, shooting: 82, passing: 78, dribbling: 83, defending: 52, physical: 75 },
    { fullName: 'Julian Brandt', overall: 82, pace: 67, shooting: 78, passing: 82, dribbling: 85, defending: 48, physical: 65 },
    { fullName: 'Timo Werner', overall: 82, pace: 90, shooting: 80, passing: 69, dribbling: 82, defending: 35, physical: 69 },
    { fullName: 'José Luís Gayà Peña', overall: 82, pace: 83, shooting: 61, passing: 76, dribbling: 80, defending: 78, physical: 73 },
    { fullName: 'Otávio Edmilson da Silva Monteiro', overall: 82, pace: 78, shooting: 69, passing: 80, dribbling: 85, defending: 63, physical: 71 },
    { fullName: 'Alejandro Grimaldo García', overall: 82, pace: 87, shooting: 65, passing: 81, dribbling: 83, defending: 74, physical: 71 },
    { fullName: 'Raphaël Guerreiro', overall: 82, pace: 74, shooting: 77, passing: 86, dribbling: 87, defending: 75, physical: 55 },
    { fullName: 'André Onana', overall: 82, pace: 81, shooting: 80, passing: 86, dribbling: 83, defending: 61, physical: 80 },
    { fullName: 'Matthias Ginter', overall: 82, pace: 60, shooting: 59, passing: 71, dribbling: 66, defending: 84, physical: 79 },
    { fullName: 'Sébastien Haller', overall: 82, pace: 65, shooting: 80, passing: 62, dribbling: 74, defending: 52, physical: 82 },
    { fullName: 'Aritz Elustondo', overall: 82, pace: 64, shooting: 39, passing: 65, dribbling: 62, defending: 82, physical: 78 },
    { fullName: 'Tammy Abraham', overall: 82, pace: 83, shooting: 81, passing: 66, dribbling: 78, defending: 36, physical: 80 },
    { fullName: 'Ismaël Bennacer', overall: 82, pace: 77, shooting: 68, passing: 80, dribbling: 86, defending: 77, physical: 76 },
    { fullName: 'Alejandro Remiro Gargallo', overall: 82, pace: 83, shooting: 76, passing: 79, dribbling: 84, defending: 42, physical: 85 },
    { fullName: 'Dani Rojas', overall: 82, pace: 83, shooting: 83, passing: 75, dribbling: 82, defending: 28, physical: 75 },
    { fullName: 'Florian Wirtz', overall: 82, pace: 78, shooting: 73, passing: 80, dribbling: 86, defending: 51, physical: 60 },
    { fullName: 'Antony Matheus dos Santos', overall: 82, pace: 93, shooting: 74, passing: 75, dribbling: 86, defending: 39, physical: 69 },
    { fullName: 'Darwin Núñez', overall: 82, pace: 89, shooting: 82, passing: 68, dribbling: 77, defending: 42, physical: 86 },
    { fullName: 'Nico Schlotterbeck', overall: 82, pace: 76, shooting: 56, passing: 66, dribbling: 72, defending: 84, physical: 78 },
    { fullName: 'Bukayo Saka', overall: 82, pace: 84, shooting: 74, passing: 78, dribbling: 83, defending: 65, physical: 65 },
    { fullName: 'Daniel Olmo Carvajal', overall: 82, pace: 67, shooting: 76, passing: 81, dribbling: 86, defending: 50, physical: 59 },
    { fullName: 'Aurélien Tchouaméni', overall: 82, pace: 70, shooting: 70, passing: 79, dribbling: 78, defending: 81, physical: 82 },
    { fullName: 'Ferran Torres García', overall: 82, pace: 84, shooting: 79, passing: 79, dribbling: 83, defending: 35, physical: 67 },
    { fullName: 'Noussair Mazraoui', overall: 82, pace: 84, shooting: 66, passing: 77, dribbling: 82, defending: 76, physical: 74 },
    { fullName: 'Arnaut Danjuma', overall: 82, pace: 88, shooting: 81, passing: 75, dribbling: 82, defending: 42, physical: 68 },
    { fullName: 'Aaron Ramsdale', overall: 82, pace: 83, shooting: 77, passing: 85, dribbling: 84, defending: 48, physical: 78 },
    { fullName: 'Lucas Tolentino Coelho de Lima', overall: 82, pace: 72, shooting: 78, passing: 79, dribbling: 85, defending: 69, physical: 78 },
    { fullName: 'Denzel Dumfries', overall: 82, pace: 83, shooting: 63, passing: 70, dribbling: 73, defending: 78, physical: 89 },
    { fullName: 'Ruslan Malinovskyi', overall: 82, pace: 76, shooting: 81, passing: 83, dribbling: 81, defending: 64, physical: 80 },
    { fullName: 'Raúl Jiménez', overall: 82, pace: 73, shooting: 81, passing: 76, dribbling: 80, defending: 47, physical: 82 },
    { fullName: 'Josué Durval Chiamulera Vaz', overall: 82, pace: 78, shooting: 43, passing: 56, dribbling: 64, defending: 85, physical: 79 },
    { fullName: 'Lucas Luciano Mantela Patrício', overall: 82, pace: 79, shooting: 87, passing: 85, dribbling: 81, defending: 35, physical: 77 },
    { fullName: 'Ben Chilwell', overall: 82, pace: 76, shooting: 60, passing: 78, dribbling: 78, defending: 78, physical: 75 },
    { fullName: 'André Miguel Valente da Silva', overall: 82, pace: 74, shooting: 83, passing: 70, dribbling: 82, defending: 47, physical: 78 },
    { fullName: 'Christian Pulisic', overall: 82, pace: 87, shooting: 71, passing: 73, dribbling: 86, defending: 37, physical: 59 },
    { fullName: 'Jordan Pickford', overall: 82, pace: 84, shooting: 77, passing: 87, dribbling: 87, defending: 51, physical: 80 },
    { fullName: 'Sergi Darder Moll', overall: 82, pace: 82, shooting: 74, passing: 82, dribbling: 83, defending: 74, physical: 77 },
    { fullName: 'Willi Orban', overall: 82, pace: 57, shooting: 36, passing: 53, dribbling: 56, defending: 84, physical: 81 },
    { fullName: 'Idrissa Gueye', overall: 82, pace: 67, shooting: 66, passing: 72, dribbling: 78, defending: 83, physical: 76 },
    { fullName: 'Zlatan Ibrahimović', overall: 82, pace: 58, shooting: 85, passing: 76, dribbling: 77, defending: 34, physical: 72 },
    { fullName: 'Iñigo Martínez Berridi', overall: 82, pace: 71, shooting: 56, passing: 67, dribbling: 61, defending: 82, physical: 80 },
    { fullName: 'Łukasz Fabiański', overall: 82, pace: 82, shooting: 82, passing: 71, dribbling: 82, defending: 49, physical: 83 },
    { fullName: 'Ivan Rakitić', overall: 82, pace: 53, shooting: 80, passing: 86, dribbling: 78, defending: 75, physical: 68 },
    { fullName: 'Dimitri Payet', overall: 82, pace: 70, shooting: 78, passing: 84, dribbling: 83, defending: 40, physical: 65 }



  ];
  filteredPlayers: Player[] = [];
  myTeam: Player[] = [];
  opponentTeam: Player[] = [];

  filterPlayers(team: 'myTeam' | 'opponentTeam') {
    const filterValue = team === 'myTeam' ? this.myTeamPlayerName.toLowerCase() : this.opponentTeamPlayerName.toLowerCase();
    this.filteredPlayers = this.players
      .filter(player => player.fullName.toLowerCase().includes(filterValue))
      .sort((a, b) => b.overall - a.overall)
      .slice(0, 3);
  }

  addPlayer(player: Player, team: 'myTeam' | 'opponentTeam') {
    const selectedTeam = team === 'myTeam' ? this.myTeam : this.opponentTeam;
    const playerNameControl = team === 'myTeam' ? 'myTeamPlayerName' : 'opponentTeamPlayerName';

    if (!selectedTeam.find(p => p.fullName === player.fullName)) {
      selectedTeam.push(player);
    }
    this[playerNameControl] = '';
    this.filteredPlayers = [];
  }
  recommendTactics() {
    this.userService.getTactics(this.myTeam, this.opponentTeam).subscribe({
      next: (resp: any) => {
        this.words = resp.split(';');
        console.log(this.words);

        this.tacticsResponse = resp;
      },
      error: (error) => {
        console.log(error);
        this.tacticsResponse = 'Error retrieving tactics';  // Optional: handle error case
      }
    });
  }

}
