import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InputBase } from '../base/input-base';

@Injectable()
export class ControlService {
  constructor() { }

  toFormGroup(controls: InputBase<string>[] ) {
    const group: any = {};

    controls.forEach(control => {
      group[control.key] = control.required ? new FormControl(control.value || '', Validators.required)
                                              : new FormControl(control.value || '');
    });
    return new FormGroup(group);
  }
}