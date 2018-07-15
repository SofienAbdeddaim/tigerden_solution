import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Client } from './clients.model';

@Injectable()
export class ClientsService implements Resolve<any>
{
    _fireUrl = 'https://tigerden-a99eb.firebaseio.com';
    _fireEnd = '.json';
    onClientsChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    onSelectedClientsChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    onUserDataChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    onSearchTextChanged: Subject<any> = new Subject();
    onFilterChanged: Subject<any> = new Subject();

    clients: Client[];
    user: any;
    selectedClients: string[] = [];

    searchText: string;
    filterBy: string;

    constructor(private http: HttpClient)
    {
    }

    /**
     * The Contacts App Main Resolver
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
          Promise.all([this.getClients()])
            .then(
              ([filtes]) => {
                this.onSearchTextChanged.subscribe( searchText => {
                  this.searchText = searchText;
                  this.getClients();
                });
                resolve();
              }, reject)
        });
    }

  //  get & post section
  getClients(): Promise<any> {
      return new Promise(
        (resolve, reject) => {
          this.http.get(this._fireUrl + '/clients' + this._fireEnd, { observe: 'response'})
            .subscribe(
              (data: any) => {
                this.clients = [];
                let dataClients = data.body;
                if(dataClients) {
                  Object.keys(dataClients).forEach( client => {
                    let clientItem = dataClients[client];
                    clientItem.id = client;
                    this.clients.push(clientItem);
                  });
                }
                if ( this.searchText && this.searchText !== '' )
                {
                  this.clients = FuseUtils.filterArrayByString(this.clients, this.searchText);
                }
                this.onClientsChanged.next(this.clients);
                resolve(this.clients);
              }, reject);
        }
      );
    }

  saveClient(client) {
      return new Promise(
        (resolve, reject) => {
          this.http.post('https://tigerden-a99eb.firebaseio.com/clients.json', client, { observe: 'response'})
            .subscribe(
              data => {
                this.clients.push(client);
                this.onClientsChanged.next(this.clients);
                resolve(data);
              },
              error => reject(error)
            )
        }
      );
    }

  //  selection section
  toggleSelectedClient(id)
  {
    // First, check if we already have that contact as selected...
    if ( this.selectedClients.length > 0 )
    {
      const index = this.selectedClients.indexOf(id);

      if ( index !== -1 )
      {
        this.selectedClients.splice(index, 1);

        // Trigger the next event
        this.onSelectedClientsChanged.next(this.selectedClients);

        // Return
        return;
      }
    }

    // If we don't have it, push as selected
    this.selectedClients.push(id);

    // Trigger the next event
    this.onSelectedClientsChanged.next(this.selectedClients);
  }

  deselectClients()
  {
    this.selectedClients = [];

    // Trigger the next event
    this.onSelectedClientsChanged.next(this.selectedClients);
  }

  selectClients(filterParameter?, filterValue?)
  {
    this.selectedClients = [];

    // If there is no filter, select all todos
    if ( filterParameter === undefined || filterValue === undefined )
    {
      this.selectedClients = [];
      this.clients.map(client => {
        this.selectedClients.push(client.id);
      });
    }
    else
    {
      /* this.selectedContacts.push(...
           this.contacts.filter(todo => {
               return todo[filterParameter] === filterValue;
           })
       );*/
    }

    // Trigger the next event
    this.onSelectedClientsChanged.next(this.selectedClients);
  }

  // delete section
  toDeleteClient(id) {
    return new Promise(
      (resolve, reject) => {
        this.http.delete(this._fireUrl + '/clients/'+ id + this._fireEnd, { observe: 'response'})
          .subscribe(
            (response: any) => {
              console.log(response);
              if(response.status = 200) {
                resolve(true);
              }
            }, reject
          );
        resolve(true);
      }
    );
  }

  deleteClient(client)
  {
    const clientIndex = this.clients.indexOf(client);
    // console.log(this.clients[clientIndex].id);
    this.toDeleteClient(this.clients[clientIndex].id)
      .then(
        data => {
          this.clients.splice(clientIndex, 1);
          this.onClientsChanged.next(this.clients);
        }
      )
  }

  deleteSelectedClients()
  {
    for ( const clientId of this.selectedClients )
    {
      this.toDeleteClient(clientId)
        .then(
          data => {
              const client = this.clients.find(_client => {
                return _client.id === clientId;
              });
              const clientIndex = this.clients.indexOf(client);
            console.log(client);
            console.log(clientIndex);
            this.clients.splice(clientIndex, 1);
            this.onClientsChanged.next(this.clients);
          }
        );
    }
    this.deselectClients();
  }
}
