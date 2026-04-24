export class Personnage {
  constructor(nom, niveau, pointsDeVieMax, pointsDeVie = pointsDeVieMax) {
    this.nom = nom;
    this.niveau = niveau;
    this.pointsDeVieMax = pointsDeVieMax;
    this.pointsDeVie = pointsDeVie;
  }

  calculerPourcentageSante() {
    return this.pointsDeVie / this.pointsDeVieMax * 100;
  }

  obtenirStatut() {
    if (this.pointsDeVie === 0) {
      return "inconscient";
    }

    const pourcent = this.calculerPourcentageSante();

    if (pourcent > 70) {
      return "en pleine forme";
    }

    if (pourcent >= 30) {
      return "blessé";
    }

    return "dans un état critique";
  }

  recevoirDegats(degats) {
    if (degats <= 0) {
      console.log("Valeur de dégâts incorrecte.");
      return;
    }

    this.pointsDeVie = Math.max(0, this.pointsDeVie - degats);
    console.log(`${this.nom} subit ${degats} dégâts.`);
  }

  soigner(soin) {
    if (soin <= 0) {
      console.log("Valeur de soin incorrecte.");
      return;
    }

    this.pointsDeVie = Math.min(this.pointsDeVieMax, this.pointsDeVie + soin);
    console.log(`${this.nom} récupère ${soin} PV.`);
  }

  creerResume() {
    return `${this.nom} - Niveau ${this.niveau} - ${this.pointsDeVie}/${this.pointsDeVieMax} PV - ${this.obtenirStatut()}`;
  }
}