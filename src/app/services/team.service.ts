import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private url = 'api/teams'
  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.url)
  }

  addTeam(team: Team): Observable<Object> {
    const options = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }
    return this.http.post(this.url, team, options)
  }

  deleteTeams(teams: Team[]): Observable<Object> {
    const options = {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
      body: teams
    }
    return this.http.delete(this.url, options)
  }
}

export class Team {
  name: string;
  describe: string;
}
