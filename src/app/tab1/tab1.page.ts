import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatabaseService } from '../service/DatabaseService';
import { AlertController } from '@ionic/angular';
import { PessoaService } from '../service/PessoaService';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, ReactiveFormsModule],
})
export class Tab1Page {

  formGroup: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    telefone: [''],
    email: ['', Validators.email],
    hobie: [''],
  })
  emailToEdit: string | null = null;
  constructor(private fb: FormBuilder,
    private pessoaService: PessoaService,
    private alertController: AlertController,
    private activedRouter: ActivatedRoute) { }

  async salvar() {
    if (this.formGroup.valid) {
      const alert = await this.alertController.create({
        header: 'Item salvo',
        message: 'Item salvo com sucesso',
        buttons: ['OK'],
      })
      if (this.emailToEdit) {
        this.pessoaService.editar(this.formGroup.value, this.emailToEdit)
      } else {
        this.pessoaService.criar(this.formGroup.value)
      }

      await alert.present()
    } else {
      const alert = await this.alertController.create({
        header: 'Formulário inválido',
        message: 'Formulário inválido',
        buttons: ['OK'],
      })
      await alert.present()
    }
    
  }
  ionViewDidEnter(): void {
    this.emailToEdit = null
    const email = this.activedRouter.snapshot.paramMap.get("email");
    if (email) {
      console.log(email)
      this.pessoaService.get(email).then(Pessoa => {
        if (Pessoa) {
          this.formGroup.patchValue(Pessoa)
          this.emailToEdit = email
        } if (this.emailToEdit) {
          this.pessoaService.editar(this.formGroup.value, this.emailToEdit)
        } else {
          this.pessoaService.criar(this.formGroup.value)
        }
      })
    }
  }
} 