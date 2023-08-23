import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss'],
})
export class DropdownSelectComponent implements OnInit {
  @Input() options: SelectOption[] = [];
  @Output() optionSelected: EventEmitter<string> = new EventEmitter();
  public optionUpdated(option: any) {
    this.optionSelected.emit(option.target.value);
  }

  ngOnInit() {}
}

type SelectOption = {
  value: string;
  label: string;
};
