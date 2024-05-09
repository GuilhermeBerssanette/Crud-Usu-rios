export interface User {
    name: string,
    email: string,
    confirmEmail: string,
    sector: string,
    role: string,


    //a "?" Diz que é opcional colocar ou não
    //Pode adicionar ao lado da string "| number" ou qualquer outro tipo para falar que aceita string ou number
    firebaseId?: string,
    healthPlan?: string,
    dentalPlan?: string,
}
