import { Injectable } from '@angular/core';

import { DropdownInput } from '../base/input-dropbox';
import { InputBase } from '../base/input-base';
import { TextboxInput } from '../base/input-textbox';
import { of } from 'rxjs';

@Injectable()
export class SectorService {

  // TODO: get from a remote source of Input metadata
  getInputs() {

    const Inputs: InputBase<string>[] = [


      new TextboxInput({
        key: 'companyid',
        label: 'Company',
        required: true,
        order: 1
      }),

      new TextboxInput({
        key: 'name',
        label: 'Name',
        required: true,
        order: 2
      })
    ];

    return of(Inputs.sort((a, b) => a.order - b.order));
  }
}