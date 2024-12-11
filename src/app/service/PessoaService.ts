
import { Injectable } from '@angular/core'; 
import { DatabaseService } from './DatabaseService'; 
import { PessoaModel} from '../model/PessoaModel';
 
const PESSOAS_KEY = "pessoas" 
 
@Injectable({providedIn: 'root'}) 
export class PessoaService {
    pessoaService: any; 
    constructor(private databaseService: DatabaseService) { } 
     
    async criar(pessoa: PessoaModel) { 
        const pessoas = await this.listar() 
        if(pessoas) { 
            pessoas.push(pessoa) 
            this.databaseService.set(PESSOAS_KEY, pessoas) 
        }else { 
            this.databaseService.set(PESSOAS_KEY, [pessoa]) 
        } 
    } 
 
    listar(): Promise<PessoaModel[] | null> { 
        return this.databaseService.get<PessoaModel[]>(PESSOAS_KEY) 
    } 
    async editar(pessoa: PessoaModel, email: string) { 
        const pessoas = await this.listar() 
        if(pessoas) { 
                    const index = pessoas.findIndex(pessoa => pessoa.email === email); 
                    if(index >= 0) { 
                        pessoas.splice(index, 1, pessoa); 
                        this.databaseService.set(PESSOAS_KEY, pessoas) 
                    } 
                } 
            }
            async get(email: string): Promise<PessoaModel | null> { 
                const pessoas = await this.listar() 
                if(pessoas) { 
                    const index = pessoas.findIndex(pessoa => pessoa.email === email) 
                    if(index >= 0) { 
                        return pessoas[index] 
                    } 
                    return null 
                }else { 
                    return null 
                } 
            } 
            async delete(email: string): Promise<boolean> { 
                const pessoas = await this.listar() 
                if(pessoas) { 
                const index = pessoas.findIndex(pessoa => pessoa.email === email) 
                if(index >= 0) { 
                pessoas.splice(index, 1); 
                this.databaseService.set(PESSOAS_KEY, pessoas) 
                return true 
                } else { 
                return false 
                } 
                }else { 
                return false 
                } 
                } 
                async deletar(pessoa: PessoaModel) { 
                    const deletado = await this.pessoaService.delete(pessoa.email) 
                    if(deletado) { 
                    this.listar() 
                    } 
                }
} 