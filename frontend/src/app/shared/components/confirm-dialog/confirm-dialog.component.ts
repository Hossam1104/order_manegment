import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, TranslateModule],
    template: `
    <h2 mat-dialog-title>{{ data.title || ('ITEMS.DELETE' | translate) }}</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">{{ 'CONFIRM.NO' | translate }}</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">{{ 'CONFIRM.YES' | translate }}</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {
    data = inject<{ title?: string; message: string }>(MAT_DIALOG_DATA);
}
