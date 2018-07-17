import { NgModule } from '@angular/core';
import { SanitisePipe } from './pipes/sanitise/sanitise.pipe';
import { ValueTextPipe } from './pipes/value-text/value-text.pipe';

@NgModule({
  imports: [
  ],
  declarations: [SanitisePipe, ValueTextPipe],
  exports: [SanitisePipe, ValueTextPipe]
})
export class ToolkitModule { }
