import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { startWith, map, mergeMap, filter, debounceTime, retry } from 'rxjs/operators';

// URL: `https://swapi.co/api/people/?search=${v}`

/*
Objetivos:
1. não mutar nenhum dado ou criar outras variáveis
2. exiba uma mensagem inicial para o usuário começar a busca - OK (ver startWith)
3. deve exibir o resultado de uma nova busca a cada novo valor escrito - OK (ver map e mergeMap)
4. deve esperar o usuário digitar pelo menos 2 digitos - OK (ver filter)
5. deve esperar o usuário parar de digitar por pelo menos meio segundo - OK (ver debounceTime) 
6. deve tentar fazer a requisição pelo menos 5 vezes antes de dar erro - OK (ver retry)
7. deve exibir uma mensagem de 'carregando...' toda vez q começar uma nova busca
8. um resultado de uma busca antiga nunca deve sobrepor uma nova

Definições

map: aplica uma dada função para cada valo emitido pelo Observable de origem e emite o valor como um Observable

mergeMap: projeta cada valor de origem num Observable e é mergeado como Observable final

filter: filtra itens emitidos pelo Observable de origem emitindo somente aqueles q satisfazem a regra

debounceTime: emite um valor do Observable de origem apenas após o tempo definido

retry: retorna um Observable q espelha o Observable de origem quando há erro/exception e tenta a chamada novamente quantas vezes forem definidas

*/




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  
  starWarsInput = new FormControl;
  results$ = this.starWarsInput.valueChanges.pipe(
    debounceTime(500),
    filter(val => val.length > 2),
    map(val => `https://swapi.co/api/people/?search=${val}`), 
    mergeMap(url => this.http.get(url) 
        .pipe(
          retry(5),
          map(results => results['results'])
        )),
    startWith({message: 'Não foi possível carregar a lista'})
  );

  constructor(
    private http: HttpClient
  ) { }

}
