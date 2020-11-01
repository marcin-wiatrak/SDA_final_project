import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(''),
    });
  }
  onSubmit() {
    console.log(this.searchForm.getRawValue());
    this.searchService.setSearchPhrase(this.searchForm.get('searchInput').value);
    this.router.navigate(['search-result']);
  }

}
