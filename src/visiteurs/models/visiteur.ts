import { Badge } from "../../badges/models/badge";
import {Raison} from "../../raisons/models/raison";

export interface Visiteur {
  id: number,
  nom: string,
  prenom: string,
  badge: Badge,
  raison: Raison,
  arrivee: string,
  depart?: string
}
