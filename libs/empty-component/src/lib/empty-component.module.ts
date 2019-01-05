import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './empty/empty.component';

@NgModule({
  imports: [CommonModule],
  declarations: [EmptyComponent],
  exports: [EmptyComponent]
})
export class EmptyComponentModule {}
