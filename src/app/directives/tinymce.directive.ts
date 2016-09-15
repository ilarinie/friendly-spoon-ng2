import {ElementRef, Directive, NgZone, Output, EventEmitter, Input} from '@angular/core';
declare var tinymce: any;

@Directive({
  inputs: ['tinyMce'],
  selector: '[tinyMce]'
})
export class TinyEditor {
  private id: string = Math.random().toString(36).substr(2, 5);
  private controlName: string;

  @Input()
  text: string;

  @Output()
  textfield = new EventEmitter()

  public constructor(private elRef: ElementRef, private zone: NgZone) {
  }

  public ngOnInit(): void {
    //    this.controlName = this.elRef.nativeElement.getAttribute('ngControl');
    //console.log(this.controlName, this.tinyMce.controls['valueHolder']);
    //    this.theControl = <Control>this.tinyMce.controls[this.controlName];
    this.elRef.nativeElement.setAttribute('tiny-id', this.id);
  }

  public ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      tinymce.init({
        valid_elements: '*[*]',
        selector: '[tiny-id=' + this.id + ']',
        schema: 'html5',
        height: 400,
        plugins: "link textcolor",
        link_assume_external_targets: true,
        setup: (editor: any): void => {
          editor.on('keyup change', () => {
            this.zone.run(() => {
              let value = editor.getContent();
              console.log(value);
              this.text = value;
              this.textfield.emit({
                value: value
              })
              //    this.theControl.updateValue(value, { emitEvent: true });
              //    this.theControl.markAsDirty();
              //    this.theControl.markAsTouched();
              //    this.theControl.updateValueAndValidity();
            });
          });
        }
      });
    });
  }

  public ngOnDestroy(): void {
    try {
      tinymce.remove('[tiny-id=' + this.id + ']');
    } catch (e) {
      console.error('Error:', e);
    }
  }
}
