export interface Visiteur {
  id: number,
  nom: string,
  prenom: string,
  badge: string,
  raison: number,
  arrivee: string,
  depart?: string
}
