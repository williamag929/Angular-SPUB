import { Injectable } from '@angular/core';
import { InputBase } from '../base/input-base';
import { TextboxInput } from '../base/input-textbox';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
// TODO: get from a remote source of Input metadata
getInputs() {

  const Inputs: InputBase<string>[] = [


    new TextboxInput({
      key: 'suscriptorid',
      label: 'Suscriptor',
      required: true,
      order: 1
    }),

    new TextboxInput({
      key: 'readDate',
      label: 'Date',
      required: true,
      order: 2
    }),

    new TextboxInput({
      key: 'readValue',
      label: 'Value',
      required: true,
      order: 3
    }),

  ];

  return of(Inputs.sort((a, b) => a.order - b.order));

}
}