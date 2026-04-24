import { Equipe } from "./Equipe.js";

const equipe = new Equipe("Les Marcheurs du Code");

equipe.creerPersonnage("Jeanmi", 1, 120, 90);
equipe.creerPersonnage("Sarah", 2, 200, 100);
equipe.creerPersonnage("Bobby", 5, 500, 200);

equipe.afficherEquipe();

console.log("----- Actions -----");

equipe.attaquer("bobby", 80);
equipe.soigner("sarah", 50);
equipe.attaquer("gobelin", 30);

console.log("----- Après actions -----");

equipe.afficherEquipe();
equipe.afficherRapport();