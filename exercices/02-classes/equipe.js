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

  afficherRapport() {
    const blesses = this.trouverBlesses();
    const nomsBlesses = blesses.length > 0
      ? blesses.map(personnage => personnage.nom).join(", ")
      : "aucun";

    console.log(`===== Rapport de l'équipe : ${this.nom} =====`);
    console.log(`Membres : ${this.membres.length}`);
    console.log(`PV totaux : ${this.calculerPvTotaux()}/${this.calculerPvMaxTotaux()}`);
    console.log(`Santé globale : ${this.calculerSanteGlobale().toFixed(1)}%`);
    console.log(`Santé moyenne : ${this.calculerSanteMoyenne().toFixed(1)}%`);
    console.log(`Personnages blessés : ${nomsBlesses}`);
  }
}