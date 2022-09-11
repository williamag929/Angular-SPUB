import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InputBase } from '../../shared/base/input-base';
import { ControlService } from '../../shared/services/control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ ControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() inputControls: InputBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: ControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.inputControls as InputBase<string>[]);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
