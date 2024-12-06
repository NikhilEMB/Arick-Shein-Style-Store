import { NgModule } from '@angular/core';
import { ImagePreloader } from './img-placeholder.directive';
import { DropzoneDirective } from './dropzone.directive';

@NgModule({
  imports: [
  ],
  declarations: [ 
    ImagePreloader,
    DropzoneDirective
  ],
  exports: [
    ImagePreloader,
    DropzoneDirective

  ]
})
export class ApplicationDirectivesModule {}