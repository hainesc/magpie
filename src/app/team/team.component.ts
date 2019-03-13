import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {
  MatPaginator,
  MatTableDataSource,
  MatDialog,
  MatDialogRef,
  MatSnackBar,
  MAT_DIALOG_DATA
} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { CookieService } from 'ngx-cookie-service';

import { Team, TeamService } from '../services/team.service'

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  role = (() => {
    let groups = (JSON.parse(atob(this.cookie.get('BID').split('.')[1]))).groups as Array<string>
    if (groups.indexOf('hr') > -1) {
      return 'hr'

    }
    if (groups.indexOf('manager') > -1) {
      return 'manager'
    }
    return 'staff'
  })();

  displayedColumns = ['select', 'name', 'describe'];
  dataSource: MatTableDataSource<Team>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Team>(true, []);

  constructor(
    private cookie: CookieService,
    private team: TeamService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetchTeams();
  }

  fetchTeams(): void {
    this.team.getTeams()
      .subscribe(result => {
        if (result) {
          this.dataSource = new MatTableDataSource<Team>(result);
        } else {
          this.dataSource = new MatTableDataSource<Team>([]);
        }
        this.dataSource.paginator = this.paginator;
      })
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(AddTeamDialog, {
      width: '250px',
      data: {
        t: Team
      }
    });

    dialogRef.afterClosed().subscribe(t => {
      if (!t) {
        console.log("something wrong")
        return;
      }
      if (t['name'] && t['describe']) {
        this.team.addTeam(t)
          .subscribe(
            (resp: Response) => {
              if (resp instanceof HttpErrorResponse) {
                this.snackBar.open('Add team failed', '', { duration: 2000 });
              } else {
                this.snackBar.open('Add team success', '', { duration: 2000 });
                this.fetchTeams()
              }
            },
            err => {
              this.snackBar.open('Add team failed', '', { duration: 2000 });
            }
          )
      } else {
        console.log("Error")
      }
    });
  }

  onDelete(): void {
    if (this.selection && !this.selection.isEmpty()) {
      this.team.deleteTeams(this.selection.selected)
        .subscribe(
          (resp: Response) => {
            if (resp instanceof HttpErrorResponse) {
              this.snackBar.open('Delete team failed', '', { duration: 2000 });
            } else {
              this.snackBar.open('Delete team success', '', { duration: 2000 });
              this.fetchTeams()
            }
          },
          err => {
            this.snackBar.open('Delete team failed', '', { duration: 2000 });
          }
        )
    }

  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}

@Component({
  // selector: 'add-gateway-dialog',
  template: `
<h1 mat-dialog-title>Add Team</h1>

<div mat-dialog-content>
<p>Name</p>
<mat-form-field>
<input matInput [(ngModel)]="data.name">
</mat-form-field>
</div>

<div mat-dialog-content>
<p>Describe</p>
<mat-form-field>
<input matInput [(ngModel)]="data.describe">
</mat-form-field>
</div>

<div mat-dialog-actions>
<button mat-button (click)="onNoClick()">Cancel</button>
<button mat-button [mat-dialog-close]="data" cdkFocusInitial>OK</button>
</div>
`
})
export class AddTeamDialog {
  constructor(
    public dialogRef: MatDialogRef<AddTeamDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Team) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

