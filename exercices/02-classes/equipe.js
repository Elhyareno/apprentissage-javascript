import { Personnage } from "./Personnage.js";

export class Equipe {
  constructor(nom) {
    this.nom = nom;
    this.membres = [];
  }

  creerPersonnage(nom, niveau, pointsDeVieMax, pointsDeVie = pointsDeVieMax) {
    const personnage = new Personnage(nom, niveau, pointsDeVieMax, pointsDeVie);
    this.membres.push(personnage);
    return personnage;
  }

  trouverParNom(nom) {
    const nomRecherche = nom.toLowerCase();

    return this.membres.find(personnage => {
      return personnage.nom.toLowerCase() === nomRecherche;
    }) ?? null;
  }

  attaquer(nom, degats) {
    const cible = this.trouverParNom(nom);

    if (!cible) {
      console.log("Cible introuvable.");
      return;
    }

    cible.recevoirDegats(degats);
  }

  soigner(nom, soin) {
    const cible = this.trouverParNom(nom);

    if (!cible) {
      console.log("Cible introuvable.");
      return;
    }

    cible.soigner(soin);
  }

  trouverBlesses() {
    return this.membres.filter(personnage => {
      const pourcent = personnage.calculerPourcentageSante();
      return personnage.pointsDeVie > 0 && pourcent < 70;
    });
  }

  calculerPvTotaux() {
    return this.membres.reduce((total, personnage) => {
      return total + personnage.pointsDeVie;
    }, 0);
  }

  calculerPvMaxTotaux() {
    return this.membres.reduce((total, personnage) => {
      return total + personnage.pointsDeVieMax;
    }, 0);
  }

  calculerSanteGlobale() {
    return this.calculerPvTotaux() / this.calculerPvMaxTotaux() * 100;
  }

  calculerSanteMoyenne() {
    const totalPourcent = this.membres.reduce((total, personnage) => {
      return total + personnage.calculerPourcentageSante();
    }, 0);

    return totalPourcent / this.membres.length;
  }

  afficherEquipe() {
    console.log(`===== Équipe : ${this.nom} =====`);

    for (const personnage of this.membres) {
      console.log(personnage.creerResume());
    }
  }

  genererRapport(){
    const blesses = this.trouverBlesses();

    return {
      nom: this.nom,
      nombreMembres: this.membres.length,
      pvTotaux: this.calculerPvTotaux(),
      pvMaxTotaux: this.calculerPvMaxTotaux(),
      santeGlobale: this.calculerSanteGlobale(),
      santeMoyenne: this.calculerSanteMoyenne(),
      blesses: blesses.map(personnage => personnage.nom)
    };
  }

  afficherRapport() {
    const rapport = this.genererRapport();
    const nomsBlesses = rapport.blesses.length > 0
    ? rapport.blesses.join(", ")
    : "aucun";
    console.log(`===== Rapport de l'équipe : ${rapport.nom} =====`);
    console.log(`Membres : ${rapport.nombreMembres}`);
    console.log(`PV totaux : ${rapport.pvTotaux}/${rapport.pvMaxTotaux}`);
    console.log(`Santé globale : ${rapport.santeGlobale}%`);
    console.log(`Santé moyenne : ${rapport.santeMoyenne}%`);
    console.log(`Personnages blessés : ${nomsBlesses}`);
  }
}