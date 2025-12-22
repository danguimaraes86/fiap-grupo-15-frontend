import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  imports: [MatIcon, MatButton, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  templateUrl: './snack-bar.html',
  styleUrl: './snack-bar.css',
})
export class SnackBar {
  readonly snackBarRef = inject(MatSnackBarRef)
  readonly message = inject<string>(MAT_SNACK_BAR_DATA)
}
