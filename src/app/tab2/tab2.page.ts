import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { IonicModule, ViewDidEnter} from '@ionic/angular'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { ExploreContainerComponent } from "../explore-container/explore-container.component";
import { PessoaModel } from "../model/PessoaModel";
import { PessoaService } from "../service/PessoaService";
import { Router } from "@angular/router";
@Component({ 
  selector: 'app-tab2', 
  templateUrl: 'tab2.page.html', 
  styleUrls: ['tab2.page.scss'], 
  standalone: true, 
  imports: [IonicModule, ExploreContainerComponent, ReactiveFormsModule, CommonModule], 
}) 
export class Tab2Page implements ViewDidEnter{ 
  formGroup = this.fb.group({ 
   nome: []
  }) 
  pessoas: PessoaModel[]=[]
  constructor(private pessoaService: PessoaService, private router: Router, private fb: FormBuilder) {} 
  ionViewDidEnter(): void {
    this.listar()
  }
  listar() {
    this.pessoaService.listar().then((data) => {
      if(data){
        this.pessoas=data
      }
  }).catch(error => {
    console.error(error)
  })
 }
editar(pessoa: PessoaModel) { 
    this.router.navigate(['tabs/tab1', pessoa.email]) 
  }
}
