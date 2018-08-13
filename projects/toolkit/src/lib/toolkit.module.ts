import { NgModule } from '@angular/core';
import { SanitisePipe } from './pipes/sanitise/sanitise.pipe';
import { TimePipe } from './pipes/time/time.pipe';
import { ValueTextPipe } from './pipes/value-text/value-text.pipe';

const pipes = [
  SanitisePipe,
  TimePipe,
  ValueTextPipe
];

@NgModule({
  imports: [],
  declarations: pipes,
  exports: pipes,
  providers: pipes
})
export class ToolkitModule { }
