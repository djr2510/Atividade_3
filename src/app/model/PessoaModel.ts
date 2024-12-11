export class PessoaModel{
    nome: string;
    telefone: number;
    email: string;

    constructor  (nome: string, telefone:number, email:string){
        this.nome = nome
        this.telefone = telefone
        this.email = email
    }
}