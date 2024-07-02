import {Visiteur} from "../../visiteurs/models/visiteur";
import {Raison} from "../../raisons/models/raison";
import {Badge} from "../../badges/models/badge";

export interface Entree {
  id: number
  visiteur?: Visiteur
  badge: Badge
  arrivee: Date
  sortie?: Date
  raison: Raison
}
