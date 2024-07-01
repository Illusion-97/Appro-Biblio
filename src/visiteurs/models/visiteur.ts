import {Raison} from "../../raisons/models/raison";

export interface Visiteur {
  id: number,
  nom: string,
  prenom: string,
  badge: string,
  raison: Raison,
  arrivee: string,
  depart?: string
}
