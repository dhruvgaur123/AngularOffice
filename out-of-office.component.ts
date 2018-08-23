import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CatsSearchUserComponent } from '../cats-search-user/cats-search-user.component';
import { CatsOTPSUserService } from '../../service/otps-user.service';
import {OtpsServiceService} from '../../service/otps-service.service';
import {CatsPreferencesComponent } from '../cats-preferences/cats-preferences.component';

@Component({
  selector: 'app-cats-out-of-office',
  templateUrl: './cats-out-of-office.component.html',
  styleUrls: ['./cats-out-of-office.component.css']
})
export class CatsOutOfOfficeComponent implements OnInit {
  delegatedUser:string = "";
  reason:string = "";
  delegatedUserDN:string = "";
  startDate:any;
  endDate:any;
  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<CatsPreferencesComponent>,
    private _otpsService: OtpsServiceService,
    public _userService: CatsOTPSUserService) { }

  ngOnInit() {
  }
  test(eventObj) {
    console.log(eventObj.value.format('DD-MM-YYYYTHH:mm:ss.S'));
    this.startDate = eventObj.value.format('DD-MM-YYYYTHH:mm:ss.S');
  }    

  test1(eventObj) {
    console.log(eventObj.value.format('DD-MM-YYYYTHH:mm:ss.S'));
    this.endDate = eventObj.value.format('DD-MM-YYYYTHH:mm:ss.S'); 
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CatsSearchUserComponent, {
      width: '1100px',
      height: '650px'
    });
    dialogRef.afterClosed().subscribe(result => {    
      if (result.length) {
        this.delegatedUser = result[0].user_name;
        this.delegatedUserDN = result[0].user_dn;
        }
     });
  }

  autoDelegate(){
    if(this.startDate == ''){
      document.getElementById("startDateValidation").innerHTML = "Please Enter Start Date";
      return;
    }
    if(this.endDate == ''){
      document.getElementById("endDateValidation").innerHTML = "Please Enter End Date";
      return;
    }
    if(this.delegatedUser == ''){
      document.getElementById("delegateUserValidation").innerHTML = "Please Enter Delegated User";
      return;
    }
    if(this.reason == ''){
      document.getElementById("reasonValidation").innerHTML = "Please Enter the reason for Delegation";
      return;
    }
    //this._otpsService.storeAutoDelegateeInfo();
    this.dialogRef.close(0);


  }
      
  
}
