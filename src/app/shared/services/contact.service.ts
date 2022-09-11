import { Injectable } from '@angular/core';

import { DropdownInput } from '../base/input-dropbox';
import { InputBase } from '../base/input-base';
import { TextboxInput } from '../base/input-textbox';
import { of } from 'rxjs';

@Injectable()
export class ContactService {

  // TODO: get from a remote source of Input metadata
  getInputs() {

    const Inputs: InputBase<string>[] = [


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
        key: 'address',
        label: 'Address',
        required: true,
        order: 3
      }),

      new TextboxInput({
        key: 'city',
        label: 'City',
        required: true,
        order: 4
      }),

      new TextboxInput({
        key: 'state',
        label: 'State',
        required: true,
        order: 5
      }),

      new TextboxInput({
        key: 'postalCode',
        label: 'Postal Code',
        required: true,
        order: 6
      }),      

      new TextboxInput({
        key: 'email',
        label: 'Email Address',
        type: 'email',
        required: true,
        order: 7
      }),     

      new TextboxInput({
        key: 'phoneNumber',
        label: 'Phone Number',
        type: 'phone',
        required: true,
        order: 8
      }),     

      new DropdownInput({
        key: 'status',
        label: 'Status',
        options: [
          {key: '1',  value: 'Active'},
          {key: '2',  value: 'Inactive'},
          {key: '3',   value: 'Deleted'},
          {key: '0', value: 'NA'}
        ],
        order: 9
      }),


    ];

    return of(Inputs.sort((a, b) => a.order - b.order));
  }
}