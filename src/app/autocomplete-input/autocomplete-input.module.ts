import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { AutocompleteInputComponent } from './autocomplete-input.component';

@NgModule({
  declarations: [AutocompleteInputComponent],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [AutocompleteInputComponent],
  providers: [ApiService],
})
export class AutocompleteInputModule {}
