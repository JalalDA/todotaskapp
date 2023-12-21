export interface Itodo {
    id : string;
    status : 'waiting' | "progress" | "done" | ""
    startDate : Date
    endDate : Date
    categoriez? : "Design" | "Content" | "Programming" | ""
    title : string
    desc : string
}


export interface ICat {
    name : string,
    isActive?:boolean,
    color?:string
}