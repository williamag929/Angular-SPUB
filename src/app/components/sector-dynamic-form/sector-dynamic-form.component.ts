import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InputBase } from '../../shared/base/input-base';
import { ControlService } from '../../shared/services/control.service';

@Component({
  selector: 'app-sector-dynamic-form',
  templateUrl: './sector-dynamic-form.component.html',
  styleUrls: ['./sector-dynamic-form.component.css'],
  providers: [ ControlService ]
})
export class SectorDynamicFormComponent implements OnInit {

  @Input() inputControls: InputBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: ControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.inputControls as InputBase<string>[]);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    console.log('sector',this.payLoad);

    
  }
}

