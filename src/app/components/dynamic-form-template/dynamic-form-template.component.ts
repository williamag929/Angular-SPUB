import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InputBase } from '../../shared/base/input-base';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-template.component.html'
})
export class DynamicFormTemplateComponent {
  @Input() question!: InputBase<string>;
  @Input() form!: FormGroup;
  @Output() onSubmit = new EventEmitter();
  get isValid() { return this.form.controls[this.question.key].valid; }
}
