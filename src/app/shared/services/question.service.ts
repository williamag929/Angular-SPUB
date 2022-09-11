import { Injectable } from '@angular/core';

import { DropdownInput } from '../base/input-dropbox';
import { InputBase } from '../base/input-base';
import { TextboxInput } from '../base/input-textbox';
import { of } from 'rxjs';

@Injectable()
export class QuestionService {

  // TODO: get from a remote source of Input metadata
  getInputs() {

    const Inputs: InputBase<string>[] = [

      new DropdownInput({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 4
      }),

      new TextboxInput({
        key: 'firstName',
        label: 'First name',
        required: true,
        order: 1
      }),

      new TextboxInput({
        key: 'lastName',
        label: 'Last name',
        required: true,
        order: 2
      }),

      new TextboxInput({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 3
      }),

      new TextboxInput({
        key: 'bornDate',
        label: 'Bird date',
        type: 'date',
        order: 5
      }),

    ];

    return of(Inputs.sort((a, b) => a.order - b.order));
  }
}