import { Component, ChangeDetectorRef } from '@angular/core';
import { AnimalsService } from 'src/app/core/services/animals.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class ContentComponent {
  public animals: any[] = [];
  public inputArray: any[] = [];
  public id: string;
  public order: number;
  public name = '';
  public buttonText = 'Kaydet';
  public buttonProcess = 'Add';

  constructor(
    private animalsService: AnimalsService,
    private cdr: ChangeDetectorRef,
    config: NgbModalConfig,
    private modalService: NgbModal,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {

    this.animalsService.getAnimals().subscribe((res: any) => {
      this.animals = res;
      this.cdr.detectChanges();
    })

  }

  open(content) {
    this.modalService.open(content);
  }

  public processForm(process) {
    if (process === "Add")
    {
      const data = {
        order: this.order,
        name: this.name,
        create_date: new Date().getTime(),
        property: this.inputArray,
      }

      this.animalsService.addAnimals(data)
    }
    else if (process === "Update") {
      const data = {
        id: this.id,
        order: this.order,
        name: this.name,
        property: this.inputArray,
      }

      this.animalsService.updateAnimals(data)
    }

  }

  public deleteAnimal(id:string) {
    const animal = this.animals.find(animal => animal.id === id)
    this.animalsService.deleteAnimals(animal)
  }

  public fillModalAnimal(id:string, content) {
    const animal = this.animals.find(animal => animal.id === id)
    this.id = animal.id
    this.order = animal.order
    this.name = animal.name
    this.inputArray = animal.property
    this.buttonText = 'Güncelle'
    this.buttonProcess = 'Update'

    this.modalService.open(content);
  }


  public addInput() {
    this.inputArray.push('');
  }
}
