export type dataFromJson = schoolData[];

export type schoolData = {
    school: string;
    sex: string;
    age: number;
    address: string;
    famsize: string;
    Pstatus: string;
    Medu: number;
    Fedu: number;
    Mjob: string;
    Fjob: string;
    reason: string;
    guardian: string;
    traveltime: number;
    studytime: number;
    failures: number;
    schoolsup: string;
    famsup: string;
    paid: string;
    activities: string;
    nursery: string;
    higher: string;
    internet: string;
    romantic: string;
    famrel: number;
    freetime: number;
    goout: number;
    Dalc: number;
    Walc: number;
    health: number;
    absences: number;
    G1: number;
    G2: number;
    G3: number;
};
export type SingleData = {
    value: number;
    name: string;
}[];


export type MultipleData = {
    name: string;
    series: SingleData;
}[];

export type StudentRange = {
    name: string;
    list: schoolData[];
}

export interface SeriesItem {
    name: string;  // Nom de la catégorie (ex: 'total', 'education faible')
    value: number; // Valeur numérique associée
}
/** 
 * Représente un groupe de séries pour une catégorie donnée (ex: '<5', '5-10').
 */
export interface DatasetItem {
    name: string;       // Nom de la tranche de notes (ex: '<5', '5-10')
    series: SeriesItem[]; // Liste des séries pour cette tranche
}

/** 
 * Représente un tableau complet de datasets.
 */
export type Dataset = DatasetItem[];
