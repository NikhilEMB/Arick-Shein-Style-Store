import { DateAgoPipe } from './date-ago.pipe';
import { NgModule } from '@angular/core';
import { SafeItemPipe } from './safe-item.pipe';

@NgModule({
  imports: [
  ],
  declarations: [ 
    DateAgoPipe, 
    SafeItemPipe
  ],
  exports: [
    DateAgoPipe,
    SafeItemPipe
  ]
})
export class ApplicationPipesModule {}